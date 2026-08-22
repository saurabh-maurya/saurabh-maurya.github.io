/* ============================================================
   INTERACTIVE BUBBLES — full-page floating physics layer
   • bounce off the screen edges
   • collide elastically with each other
   • get pushed away by the cursor / touch, kicked on tap
   Pointer-transparent (page stays scrollable & clickable).
============================================================ */
(function () {
  "use strict";
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (REDUCED) return;

  var canvas = document.createElement("canvas");
  canvas.id = "bubble-canvas";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");

  var W = 0, H = 0, dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  var COLORS = [
    [79, 70, 229],   // indigo
    [124, 58, 237],  // violet
    [13, 148, 136],  // teal
    [236, 72, 153],  // pink
    [217, 119, 6],   // amber
    [59, 130, 246]   // blue
  ];
  var bubbles = [];
  var cracks = [];
  var CRACK_TTL = 4.5;
  var pointer = { x: -9999, y: -9999, active: false };

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function makeBubbles() {
    var count = Math.max(8, Math.min(22, Math.round(W / 90)));
    bubbles = [];
    for (var i = 0; i < count; i++) {
      var r = rnd(16, 44);
      var c = COLORS[(Math.random() * COLORS.length) | 0];
      bubbles.push({
        x: rnd(r, W - r), y: rnd(r, H - r),
        vx: rnd(-55, 55), vy: rnd(-55, 55),
        r: r, c: c
      });
    }
  }

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!bubbles.length) makeBubbles();
    else bubbles.forEach(function (b) { b.x = Math.min(W - b.r, Math.max(b.r, b.x)); b.y = Math.min(H - b.r, Math.max(b.r, b.y)); });
    calcHero();
  }
  resize();
  window.addEventListener("resize", resize);

  /* ---------- keep bubbles OFF the hero section ---------- */
  var hero = document.getElementById("hero");
  var heroBottom = 0, inView = false;
  function calcHero() { heroBottom = hero ? (hero.offsetTop + hero.offsetHeight) : 0; }
  function updateVis() {
    // show only once the hero is mostly scrolled away
    var show = !hero || (window.scrollY + window.innerHeight * 0.5 > heroBottom);
    if (show !== inView) { inView = show; canvas.style.opacity = show ? "0.2" : "0"; }
  }
  window.addEventListener("scroll", updateVis, { passive: true });
  calcHero(); updateVis();

  /* ---------- pointer (read-only; never blocks page) ---------- */
  function setPointer(x, y) { pointer.x = x; pointer.y = y; pointer.active = true; }
  window.addEventListener("mousemove", function (e) { setPointer(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener("mouseout", function () { pointer.active = false; }, { passive: true });
  window.addEventListener("touchmove", function (e) { if (e.touches[0]) setPointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
  window.addEventListener("touchend", function () { pointer.active = false; }, { passive: true });
  function kick(x, y) {
    for (var i = 0; i < bubbles.length; i++) {
      var b = bubbles[i], dx = b.x - x, dy = b.y - y, d = Math.hypot(dx, dy) || 1;
      if (d < 160) { var f = (1 - d / 160) * 900; b.vx += (dx / d) * f; b.vy += (dy / d) * f; }
    }
  }
  window.addEventListener("mousedown", function (e) { kick(e.clientX, e.clientY); }, { passive: true });
  var lastTap = 0;
  window.addEventListener("touchstart", function (e) {
    if (e.touches[0]) {
      kick(e.touches[0].clientX, e.touches[0].clientY);
      var now = Date.now();
      if (now - lastTap < 320) makeCrack(e.touches[0].clientX, e.touches[0].clientY);
      lastTap = now;
    }
  }, { passive: true });

  // Double-click anywhere → cracked-glass effect
  window.addEventListener("dblclick", function (e) { makeCrack(e.clientX, e.clientY); });

  function makeCrack(x, y) {
    if (!inView) return;   // no cracks while bubbles are hidden over the hero
    var n = 7 + (Math.random() * 4 | 0);
    var branches = [], a0 = Math.random() * 6.283;
    for (var i = 0; i < n; i++) {
      var ang = a0 + (i / n) * 6.283 + rnd(-0.22, 0.22);
      var segs = 3 + (Math.random() * 3 | 0), len = rnd(40, 150);
      var pts = [[x, y]], px = x, py = y, cang = ang;
      for (var s = 0; s < segs; s++) {
        cang += rnd(-0.35, 0.35);
        var step = len / segs * rnd(0.7, 1.2);
        px += Math.cos(cang) * step; py += Math.sin(cang) * step;
        pts.push([px, py]);
      }
      branches.push({ pts: pts, ang: ang, reach: len });
    }
    // concentric jagged connectors between neighbouring branches
    var rings = [];
    var rr = [rnd(18, 34), rnd(46, 78)];
    for (var k = 0; k < rr.length; k++) {
      var ringPts = [];
      for (var b = 0; b <= n; b++) {
        var ba = a0 + (b % n / n) * 6.283, rad = rr[k] * rnd(0.82, 1.18);
        ringPts.push([x + Math.cos(ba) * rad, y + Math.sin(ba) * rad]);
      }
      rings.push(ringPts);
    }
    cracks.push({ x: x, y: y, branches: branches, rings: rings, life: 1, flash: 1 });
    kick(x, y); // shatter nearby bubbles
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { running = false; cancelAnimationFrame(raf); }
    else if (!running) { running = true; lastT = performance.now(); raf = requestAnimationFrame(loop); }
  });

  var MAX_V = 520, REST = 0.92;
  function clampV(b) {
    var s = Math.hypot(b.vx, b.vy);
    if (s > MAX_V) { b.vx = b.vx / s * MAX_V; b.vy = b.vy / s * MAX_V; }
  }

  function step(dt) {
    var i, b;
    // pointer repulsion (the "bounce when touched")
    if (pointer.active) {
      for (i = 0; i < bubbles.length; i++) {
        b = bubbles[i];
        var dx = b.x - pointer.x, dy = b.y - pointer.y, d = Math.hypot(dx, dy) || 1;
        var R = 130 + b.r;
        if (d < R) { var f = (1 - d / R) * 620 * dt; b.vx += (dx / d) * f; b.vy += (dy / d) * f; }
      }
    }

    // integrate + wall bounce
    for (i = 0; i < bubbles.length; i++) {
      b = bubbles[i];
      b.vx *= 0.995; b.vy *= 0.995;               // gentle drag
      // keep a little life so they never fully stop
      var sp = Math.hypot(b.vx, b.vy);
      if (sp < 12) { b.vx += rnd(-8, 8); b.vy += rnd(-8, 8); }
      clampV(b);
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * REST; }
      else if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * REST; }
      if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy) * REST; }
      else if (b.y + b.r > H) { b.y = H - b.r; b.vy = -Math.abs(b.vy) * REST; }
    }

    // bubble-bubble elastic collisions (equal mass)
    for (i = 0; i < bubbles.length; i++) {
      for (var j = i + 1; j < bubbles.length; j++) {
        var a = bubbles[i], c = bubbles[j];
        var nx = c.x - a.x, ny = c.y - a.y, dist = Math.hypot(nx, ny), min = a.r + c.r;
        if (dist > 0 && dist < min) {
          nx /= dist; ny /= dist;
          var overlap = (min - dist) / 2;
          a.x -= nx * overlap; a.y -= ny * overlap;
          c.x += nx * overlap; c.y += ny * overlap;
          var dvx = c.vx - a.vx, dvy = c.vy - a.vy, p = dvx * nx + dvy * ny;
          if (p < 0) {
            a.vx += p * nx; a.vy += p * ny;
            c.vx -= p * nx; c.vy -= p * ny;
          }
        }
      }
    }

    // age cracks
    for (var q = cracks.length - 1; q >= 0; q--) {
      cracks[q].life -= dt / CRACK_TTL;
      if (cracks[q].flash > 0) cracks[q].flash -= dt * 3;
      if (cracks[q].life <= 0) cracks.splice(q, 1);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var i;

    // ---- liquid-glass bubbles ----
    for (i = 0; i < bubbles.length; i++) {
      var b = bubbles[i], c = b.c, rgb = c[0] + "," + c[1] + "," + c[2];

      // soft cast shadow (depth)
      ctx.beginPath(); ctx.arc(b.x + b.r * 0.12, b.y + b.r * 0.18, b.r, 0, 6.283);
      ctx.fillStyle = "rgba(20,22,40,0.06)"; ctx.fill();

      // refractive body — light rim, translucent middle, saturated edge
      var g = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.35, b.r * 0.05, b.x, b.y, b.r);
      g.addColorStop(0, "rgba(255,255,255,0.62)");
      g.addColorStop(0.30, "rgba(" + rgb + ",0.16)");
      g.addColorStop(0.72, "rgba(" + rgb + ",0.10)");
      g.addColorStop(0.93, "rgba(" + rgb + ",0.42)");
      g.addColorStop(1, "rgba(255,255,255,0.30)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283); ctx.fill();

      // inner shadow ring for glassy thickness
      ctx.lineWidth = Math.max(1.5, b.r * 0.10);
      ctx.strokeStyle = "rgba(" + rgb + ",0.30)";
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r - ctx.lineWidth * 0.5, 0, 6.283); ctx.stroke();

      // crisp outer rim
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(255,255,255,0.65)";
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283); ctx.stroke();

      // big specular highlight
      var hx = b.x - b.r * 0.34, hy = b.y - b.r * 0.38;
      var hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, b.r * 0.5);
      hg.addColorStop(0, "rgba(255,255,255,0.9)"); hg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.ellipse(hx, hy, b.r * 0.30, b.r * 0.20, -0.6, 0, 6.283); ctx.fill();

      // tiny sparkle + lower-rim light bounce
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath(); ctx.arc(b.x - b.r * 0.5, b.y - b.r * 0.5, b.r * 0.06, 0, 6.283); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 0.82, 0.7, 1.8); ctx.stroke();
    }

    // ---- cracked-glass overlays ----
    for (i = 0; i < cracks.length; i++) drawCrack(cracks[i]);
  }

  function polyline(pts) {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (var k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1]);
  }
  function drawCrack(cr) {
    var a = Math.max(0, cr.life);
    // impact flash
    if (cr.flash > 0) {
      var fg = ctx.createRadialGradient(cr.x, cr.y, 0, cr.x, cr.y, 90);
      fg.addColorStop(0, "rgba(255,255,255," + (cr.flash * 0.5).toFixed(3) + ")");
      fg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(cr.x, cr.y, 90, 0, 6.283); ctx.fill();
    }
    ctx.lineJoin = "round"; ctx.lineCap = "round";
    // dark fracture then white highlight (glass look)
    for (var pass = 0; pass < 2; pass++) {
      ctx.strokeStyle = pass === 0 ? "rgba(20,22,45," + (0.5 * a).toFixed(3) + ")" : "rgba(255,255,255," + (0.85 * a).toFixed(3) + ")";
      ctx.lineWidth = pass === 0 ? 2 : 0.8;
      for (var i = 0; i < cr.branches.length; i++) { polyline(cr.branches[i].pts); ctx.stroke(); }
      for (var r = 0; r < cr.rings.length; r++) { polyline(cr.rings[r]); ctx.stroke(); }
    }
    // shard glints near center
    ctx.fillStyle = "rgba(255,255,255," + (0.5 * a).toFixed(3) + ")";
    ctx.beginPath(); ctx.arc(cr.x, cr.y, 2.5, 0, 6.283); ctx.fill();
  }

  var running = true, raf = null, lastT = performance.now();
  function loop(t) {
    if (!running) return;
    var dt = Math.min(0.04, (t - lastT) / 1000 || 0); lastT = t;
    if (inView) { step(dt); draw(); }   // idle while over the hero
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
})();
