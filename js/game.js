/* ============================================================
   CATCH THE STACK — a small, dependency-free arcade mini-game
   Catch falling tech icons, dodge bugs. Score + lives + best.
============================================================ */
(function () {
  "use strict";
  var canvas = document.getElementById("game-canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var W = 640, H = 440;                 // logical size
  var dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  // HUD + overlay
  var scoreEl = document.getElementById("game-score");
  var livesEl = document.getElementById("game-lives");
  var bestEl  = document.getElementById("game-best");
  var overlay = document.getElementById("game-overlay");

  var BEST_KEY = "cts_best";
  var best = parseInt(localStorage.getItem(BEST_KEY) || "0", 10) || 0;
  if (bestEl) bestEl.textContent = best;

  // Game state
  var GOOD = ["🧠", "🎨", "📱", "⚡", "🚀", "💡"];
  var running = false, raf = null, lastT = 0, spawnT = 0;
  var score = 0, lives = 3, elapsed = 0;
  var items = [], pops = [];
  var catcher = { x: W / 2, w: 96, h: 20, y: H - 34 };
  var targetX = W / 2;
  var keyLeft = false, keyRight = false;

  /* ---------- Canvas sizing (crisp on retina) ---------- */
  function resize() {
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.aspectRatio = W + " / " + H;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  /* ---------- Input ---------- */
  function pointerX(clientX) {
    var r = canvas.getBoundingClientRect();
    return (clientX - r.left) / r.width * W;
  }
  canvas.addEventListener("pointermove", function (e) { targetX = pointerX(e.clientX); });
  canvas.addEventListener("touchmove", function (e) {
    if (e.touches[0]) { targetX = pointerX(e.touches[0].clientX); e.preventDefault(); }
  }, { passive: false });
  document.addEventListener("keydown", function (e) {
    if (!running) return;
    if (e.key === "ArrowLeft") { keyLeft = true; e.preventDefault(); }
    if (e.key === "ArrowRight") { keyRight = true; e.preventDefault(); }
  });
  document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowLeft") keyLeft = false;
    if (e.key === "ArrowRight") keyRight = false;
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && running) stop();
  });

  /* ---------- Spawning ---------- */
  function spawn() {
    var isBug = Math.random() < 0.22;
    var isStar = !isBug && Math.random() < 0.12;
    items.push({
      x: 30 + Math.random() * (W - 60),
      y: -24,
      vy: 120 + Math.random() * 60 + elapsed * 7,   // ramps up over time
      type: isBug ? "bug" : (isStar ? "star" : "good"),
      icon: isBug ? "🐛" : (isStar ? "⭐" : GOOD[(Math.random() * GOOD.length) | 0]),
      r: 16
    });
  }

  /* ---------- Loop ---------- */
  function tick(t) {
    if (!running) return;
    var dt = Math.min(0.05, (t - lastT) / 1000 || 0);
    lastT = t; elapsed += dt; spawnT += dt;

    var interval = Math.max(0.42, 0.85 - elapsed * 0.012);
    if (spawnT >= interval) { spawnT = 0; spawn(); }

    // catcher movement
    if (keyLeft)  targetX -= 380 * dt;
    if (keyRight) targetX += 380 * dt;
    targetX = Math.max(catcher.w / 2, Math.min(W - catcher.w / 2, targetX));
    catcher.x += (targetX - catcher.x) * Math.min(1, dt * 14);

    // update items
    for (var i = items.length - 1; i >= 0; i--) {
      var it = items[i];
      it.y += it.vy * dt;

      var caught = it.y + it.r >= catcher.y &&
                   it.y - it.r <= catcher.y + catcher.h &&
                   Math.abs(it.x - catcher.x) <= catcher.w / 2 + it.r * 0.6;

      if (caught) {
        if (it.type === "bug") { lives--; flash("#ef4444"); spawnPop(it.x, it.y, "−1 ❤"); updateLives(); if (lives <= 0) return gameOver(); }
        else if (it.type === "star") { score += 3; spawnPop(it.x, it.y, "+3 ⭐"); addScore(); }
        else { score += 1; spawnPop(it.x, it.y, "+1"); addScore(); }
        items.splice(i, 1);
        continue;
      }
      if (it.y - it.r > H) { items.splice(i, 1); }   // missed = no penalty
    }

    // update pops
    for (var p = pops.length - 1; p >= 0; p--) {
      pops[p].y -= 40 * dt; pops[p].life -= dt;
      if (pops[p].life <= 0) pops.splice(p, 1);
    }

    draw();
    raf = requestAnimationFrame(tick);
  }

  var flashColor = null, flashT = 0;
  function flash(c) { flashColor = c; flashT = 0.25; }
  function spawnPop(x, y, text) { pops.push({ x: x, y: y, text: text, life: 0.7 }); }

  /* ---------- Draw ---------- */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // soft grid dots
    ctx.fillStyle = "rgba(79,70,229,0.06)";
    for (var gx = 20; gx < W; gx += 34) for (var gy = 20; gy < H; gy += 34) { ctx.beginPath(); ctx.arc(gx, gy, 1.4, 0, 7); ctx.fill(); }

    // items — solid dark fill so glyphs never look faded; shadow for contrast
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = "600 30px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "#12172b";
    ctx.shadowColor = "rgba(15,22,41,0.35)"; ctx.shadowBlur = 4; ctx.shadowOffsetY = 1;
    for (var i = 0; i < items.length; i++) ctx.fillText(items[i].icon, items[i].x, items[i].y);
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

    // catcher (rounded gradient bar with a basket lip)
    var g = ctx.createLinearGradient(catcher.x - catcher.w / 2, 0, catcher.x + catcher.w / 2, 0);
    g.addColorStop(0, "#4f46e5"); g.addColorStop(1, "#7c3aed");
    ctx.fillStyle = g;
    roundRect(catcher.x - catcher.w / 2, catcher.y, catcher.w, catcher.h, 10); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.35)";
    roundRect(catcher.x - catcher.w / 2 + 4, catcher.y + 3, catcher.w - 8, 5, 4); ctx.fill();

    // pops
    ctx.font = "600 15px 'Space Grotesk', sans-serif";
    for (var p = 0; p < pops.length; p++) {
      ctx.globalAlpha = Math.max(0, pops[p].life / 0.7);
      ctx.fillStyle = "#1c2233";
      ctx.fillText(pops[p].text, pops[p].x, pops[p].y);
      ctx.globalAlpha = 1;
    }

    // hit flash
    if (flashT > 0) {
      ctx.fillStyle = flashColor;
      ctx.globalAlpha = flashT * 0.5;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      flashT -= 0.016;
    }
  }
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ---------- HUD ---------- */
  function addScore() { if (scoreEl) scoreEl.textContent = score; }
  function updateLives() { if (livesEl) livesEl.textContent = lives > 0 ? "♥".repeat(lives) : "—"; }

  /* ---------- Flow ---------- */
  function start() {
    score = 0; lives = 3; elapsed = 0; spawnT = 0.6; items = []; pops = [];
    catcher.x = targetX = W / 2;
    addScore(); updateLives();
    hideOverlay();
    running = true; lastT = performance.now();
    cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  function gameOver() {
    stop();
    var isBest = score > best;
    if (isBest) { best = score; localStorage.setItem(BEST_KEY, String(best)); if (bestEl) bestEl.textContent = best; }
    if (typeof window.fireConfetti === "function" && score >= 12) window.fireConfetti(90);

    var praise = score >= 20 ? "🔥 You ship fast!" :
                 score >= 12 ? "🚀 Nice run!" :
                 score >= 5  ? "👍 Not bad!" : "🌱 Warm-up round!";
    showOverlay(
      '<h3>' + praise + '</h3>' +
      '<p>You scored <strong>' + score + '</strong>' + (isBest ? ' — a new best!' : ' · best ' + best) + '.<br>' +
      'Like building things that work? Let\'s make yours real.</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">' +
        '<button class="btn btn-primary" id="game-restart"><i class="fas fa-rotate-right"></i> Play again</button>' +
        '<button class="btn" id="game-book"><i class="far fa-calendar-check"></i> Book a call</button>' +
      '</div>'
    );
    wireOverlayButtons();
  }

  function intro() {
    showOverlay(
      '<h3>Catch the Stack</h3>' +
      '<p>Catch the falling tech — 🧠 🎨 📱 ⚡ 🚀 — and dodge the 🐛 bugs. You\'ve got 3 lives!</p>' +
      '<button class="btn btn-primary" id="game-start"><i class="fas fa-play"></i> Play</button>' +
      '<span style="font-size:.78rem;color:var(--text-faint)">Mouse · touch · or ← → keys</span>'
    );
    wireOverlayButtons();
  }

  function showOverlay(html) { if (overlay) { overlay.innerHTML = html; overlay.classList.remove("hidden"); } }
  function hideOverlay() { if (overlay) overlay.classList.add("hidden"); }

  function wireOverlayButtons() {
    var s = document.getElementById("game-start");
    var r = document.getElementById("game-restart");
    var b = document.getElementById("game-book");
    if (s) s.addEventListener("click", start);
    if (r) r.addEventListener("click", start);
    if (b) b.addEventListener("click", function () {
      var trig = document.getElementById("nav-book");
      if (trig) trig.click();
    });
  }

  // Draw a static frame + intro so it looks alive before playing
  draw();
  intro();
})();
