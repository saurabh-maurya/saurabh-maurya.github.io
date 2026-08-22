/* ============================================================
   SCROLL-DRIVEN WEATHER  — full-page ambient canvas
   As you scroll the page cycles through every weather, one by one:
   Clear → Cloudy → Rain → Storm → Snow → Windy → Fog.
   Pointer-transparent, crossfaded, toggleable, reduced-motion aware.
============================================================ */
(function () {
  "use strict";
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var STORE_KEY = "weather_on";

  var TYPES = [
    { id: "clear",  icon: "☀️", name: "Clear" },
    { id: "clouds", icon: "☁️", name: "Cloudy" },
    { id: "rain",   icon: "🌧️", name: "Rain" },
    { id: "storm",  icon: "⛈️", name: "Storm" },
    { id: "snow",   icon: "❄️", name: "Snow" },
    { id: "wind",   icon: "🌬️", name: "Windy" },
    { id: "fog",    icon: "🌫️", name: "Fog" }
  ];

  var canvas = document.createElement("canvas");
  canvas.id = "weather-canvas";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");

  var W = 0, H = 0, dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  // particle pools
  var rain = [], snow = [], clouds = [], motes = [], leaves = [], streaks = [], fog = [];
  // storm
  var strikes = [], flash = 0, nextBolt = 0;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function build() {
    var n = Math.round(W * H / 14000);
    rain = []; for (var i = 0; i < Math.min(220, n * 1.6); i++) rain.push({ x: rnd(0, W), y: rnd(0, H), len: rnd(12, 22), sp: rnd(560, 900) });
    snow = []; for (var j = 0; j < Math.min(150, n); j++) snow.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(1.5, 4), sp: rnd(40, 90), sw: rnd(0.5, 1.6), ph: rnd(0, 6.3) });
    clouds = []; for (var c = 0; c < 6; c++) clouds.push({ x: rnd(0, W), y: rnd(H * 0.05, H * 0.55), s: rnd(90, 190), sp: rnd(6, 16), o: rnd(0.10, 0.20) });
    motes = []; for (var m = 0; m < 60; m++) motes.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(1, 2.6), sp: rnd(8, 22), sw: rnd(0.3, 1), ph: rnd(0, 6.3) });
    leaves = []; for (var l = 0; l < 34; l++) leaves.push({ x: rnd(0, W), y: rnd(0, H), s: rnd(4, 9), sp: rnd(160, 300), sway: rnd(20, 60), ph: rnd(0, 6.3), rot: rnd(0, 6.3) });
    streaks = []; for (var s = 0; s < 26; s++) streaks.push({ x: rnd(0, W), y: rnd(0, H), len: rnd(60, 160), sp: rnd(320, 560), o: rnd(0.05, 0.14) });
    fog = []; for (var f = 0; f < 5; f++) fog.push({ x: rnd(0, W), y: rnd(H * 0.15, H * 0.9), s: rnd(220, 420), sp: rnd(5, 14), o: rnd(0.06, 0.13) });
  }

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }
  resize();
  window.addEventListener("resize", resize);

  /* ---------- state ---------- */
  var enabled = (localStorage.getItem(STORE_KEY) === null) ? !REDUCED : localStorage.getItem(STORE_KEY) === "1";
  var curIdx = 0, prevIdx = 0, mix = 1;   // mix: 0..1 crossfade toward current
  var running = false, raf = null, lastT = 0, tSec = 0;

  function scrollIdx() {
    var doc = document.documentElement;
    var max = (doc.scrollHeight - window.innerHeight) || 1;
    var frac = Math.min(0.999, Math.max(0, window.scrollY / max));
    return Math.min(TYPES.length - 1, Math.floor(frac * TYPES.length));
  }
  function syncScroll() {
    var idx = scrollIdx();
    if (idx !== curIdx) { prevIdx = curIdx; curIdx = idx; mix = 0; paintChip(); }
  }
  window.addEventListener("scroll", syncScroll, { passive: true });

  /* ---------- updates ---------- */
  function update(dt) {
    tSec += dt;
    var wx = Math.sin(tSec * 0.2) * 0.25 + 0.35;  // shared wind factor
    for (var i = 0; i < rain.length; i++) { var d = rain[i]; d.y += d.sp * dt; d.x += d.sp * dt * wx * 0.4; if (d.y > H + 20) { d.y = rnd(-40, -5); d.x = rnd(-40, W); } if (d.x > W + 20) d.x = -20; }
    for (var j = 0; j < snow.length; j++) { var f = snow[j]; f.y += f.sp * dt; f.x += Math.sin(tSec * f.sw + f.ph) * 14 * dt; if (f.y > H + 6) { f.y = -6; f.x = rnd(0, W); } }
    for (var c = 0; c < clouds.length; c++) { var cl = clouds[c]; cl.x += cl.sp * dt; if (cl.x - cl.s > W) cl.x = -cl.s; }
    for (var m = 0; m < motes.length; m++) { var mo = motes[m]; mo.y -= mo.sp * dt; mo.x += Math.sin(tSec * mo.sw + mo.ph) * 10 * dt; if (mo.y < -6) { mo.y = H + 6; mo.x = rnd(0, W); } }
    for (var l = 0; l < leaves.length; l++) { var le = leaves[l]; le.x += le.sp * dt; le.y += Math.sin(tSec * 2 + le.ph) * le.sway * dt; le.rot += dt * 3; if (le.x - le.s > W) { le.x = -le.s; le.y = rnd(0, H); } }
    for (var s = 0; s < streaks.length; s++) { var sk = streaks[s]; sk.x += sk.sp * dt; if (sk.x - sk.len > W) { sk.x = -sk.len; sk.y = rnd(0, H); } }
    for (var g = 0; g < fog.length; g++) { var fo = fog[g]; fo.x += fo.sp * dt; if (fo.x - fo.s > W) fo.x = -fo.s; }
  }

  /* ---------- draw helpers ---------- */
  function drawRain(op, dense) {
    ctx.globalAlpha = op; ctx.strokeStyle = "rgba(70,84,140,0.45)"; ctx.lineWidth = 1.3; ctx.lineCap = "round";
    var step = dense ? 1 : 2;
    ctx.beginPath();
    for (var i = 0; i < rain.length; i += step) { var d = rain[i]; ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.len * 0.35, d.y - d.len); }
    ctx.stroke(); ctx.globalAlpha = 1;
  }
  function drawSnow(op) {
    ctx.globalAlpha = op; ctx.fillStyle = "rgba(150,170,220,0.85)";
    for (var i = 0; i < snow.length; i++) { var f = snow[i]; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill(); }
    ctx.globalAlpha = 1;
  }
  function puff(x, y, s, o, op, col) {
    var g = ctx.createRadialGradient(x, y, s * 0.1, x, y, s);
    g.addColorStop(0, col.replace("A", (o * op).toFixed(3)));
    g.addColorStop(1, col.replace("A", "0"));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, s, 0, 6.283); ctx.fill();
  }
  function drawClouds(op) {
    for (var i = 0; i < clouds.length; i++) { var c = clouds[i]; puff(c.x, c.y, c.s, c.o, op, "rgba(120,130,155,A)"); puff(c.x + c.s * 0.5, c.y + c.s * 0.12, c.s * 0.7, c.o, op, "rgba(120,130,155,A)"); }
  }
  function drawClear(op) {
    // warm sun glow top-right
    var sx = W * 0.86, sy = H * 0.16, R = Math.max(W, H) * 0.5;
    var g = ctx.createRadialGradient(sx, sy, 0, sx, sy, R);
    g.addColorStop(0, "rgba(255,206,120," + (0.22 * op).toFixed(3) + ")");
    g.addColorStop(0.5, "rgba(255,206,120," + (0.05 * op).toFixed(3) + ")");
    g.addColorStop(1, "rgba(255,206,120,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = op; ctx.fillStyle = "rgba(255,190,90,0.55)";
    for (var i = 0; i < motes.length; i++) { var m = motes[i]; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.283); ctx.fill(); }
    ctx.globalAlpha = 1;
  }
  function drawWind(op) {
    ctx.globalAlpha = op; ctx.strokeStyle = "rgba(110,120,150,0.5)"; ctx.lineWidth = 1.5; ctx.lineCap = "round";
    for (var i = 0; i < streaks.length; i++) { var s = streaks[i]; ctx.globalAlpha = op * (s.o * 6); ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.quadraticCurveTo(s.x - s.len * 0.5, s.y - 6, s.x - s.len, s.y); ctx.stroke(); }
    for (var l = 0; l < leaves.length; l++) {
      var le = leaves[l]; ctx.globalAlpha = op * 0.7; ctx.save(); ctx.translate(le.x, le.y); ctx.rotate(le.rot);
      ctx.fillStyle = l % 2 ? "rgba(180,130,70,0.8)" : "rgba(120,140,90,0.8)";
      ctx.beginPath(); ctx.ellipse(0, 0, le.s, le.s * 0.5, 0, 0, 6.283); ctx.fill(); ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
  function drawFog(op) {
    ctx.globalAlpha = op; ctx.fillStyle = "rgba(200,205,220," + (0.10 * op).toFixed(3) + ")"; ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < fog.length; i++) { var f = fog[i]; puff(f.x, f.y, f.s, f.o, op, "rgba(210,214,228,A)"); }
    ctx.globalAlpha = 1;
  }

  /* ---------- storm lightning ---------- */
  function genPath(x1, y1, x2, y2, disp, out) {
    if (disp < 6) { out.push([x2, y2]); return; }
    var mx = (x1 + x2) / 2 + (Math.random() - 0.5) * disp, my = (y1 + y2) / 2 + (Math.random() - 0.5) * disp;
    genPath(x1, y1, mx, my, disp / 2, out); genPath(mx, my, x2, y2, disp / 2, out);
  }
  function makeBolt() {
    var x1 = rnd(W * 0.15, W * 0.85), x2 = x1 + rnd(-W * 0.25, W * 0.25);
    var pts = [[x1, -30]]; genPath(x1, -30, x2, H + 30, Math.min(W, H) * 0.28, pts);
    var branches = [];
    for (var i = 0; i < 3; i++) { var idx = 2 + (Math.random() * (pts.length - 4) | 0); if (idx < 1 || idx >= pts.length) continue; var p = pts[idx]; var bp = [[p[0], p[1]]]; genPath(p[0], p[1], p[0] + rnd(-W * 0.16, W * 0.16), p[1] + rnd(H * 0.06, H * 0.22), Math.min(W, H) * 0.13, bp); branches.push(bp); }
    strikes.push({ pts: pts, branches: branches, life: 1 });
    flash = Math.min(1, flash + rnd(0.5, 0.85));
  }
  function strokePts(pts, w, color, glow) {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.lineWidth = w; ctx.strokeStyle = color; ctx.shadowBlur = glow; ctx.shadowColor = "rgba(124,58,237,0.9)"; ctx.lineJoin = "round"; ctx.lineCap = "round"; ctx.stroke();
  }
  function drawStorm(op, active, dt, t) {
    drawRain(op, true);
    if (flash > 0) { ctx.fillStyle = "rgba(90,70,180," + (flash * 0.06 * op).toFixed(3) + ")"; ctx.fillRect(0, 0, W, H); if (active) flash -= dt * 3.2; if (flash < 0) flash = 0; }
    if (active && t >= nextBolt && strikes.length < 2) { makeBolt(); nextBolt = t + rnd(1400, 4200); }
    for (var s = strikes.length - 1; s >= 0; s--) {
      var st = strikes[s], fl = 0.75 + Math.random() * 0.25;
      ctx.globalAlpha = Math.max(0, st.life) * 0.62 * op * fl;
      strokePts(st.pts, 5, "rgba(124,58,237,0.30)", 18); strokePts(st.pts, 2, "rgba(91,110,245,0.85)", 8); strokePts(st.pts, 1, "rgba(224,231,255,0.95)", 4);
      for (var b = 0; b < st.branches.length; b++) { ctx.globalAlpha = Math.max(0, st.life) * 0.4 * op * fl; strokePts(st.branches[b], 3, "rgba(124,58,237,0.25)", 12); strokePts(st.branches[b], 1.1, "rgba(129,140,248,0.8)", 6); }
      if (active) st.life -= dt * 2.4;
      if (st.life <= 0) strikes.splice(s, 1);
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  }

  function drawType(id, op, active, dt, t) {
    if (op <= 0.01) return;
    switch (id) {
      case "clear":  drawClear(op); break;
      case "clouds": drawClouds(op); break;
      case "rain":   drawRain(op, false); break;
      case "storm":  drawStorm(op, active, dt, t); break;
      case "snow":   drawSnow(op); break;
      case "wind":   drawWind(op); break;
      case "fog":    drawFog(op); break;
    }
    ctx.shadowBlur = 0;
  }

  /* ---------- loop ---------- */
  function loop(t) {
    if (!running) return;
    var dt = Math.min(0.05, (t - lastT) / 1000 || 0); lastT = t;
    update(dt);
    if (mix < 1) mix = Math.min(1, mix + dt * 1.4);
    ctx.clearRect(0, 0, W, H);
    var tsec = t / 1000;
    if (mix < 1 && prevIdx !== curIdx) drawType(TYPES[prevIdx].id, 1 - mix, false, dt, tsec);
    drawType(TYPES[curIdx].id, mix, true, dt, tsec);
    raf = requestAnimationFrame(loop);
  }
  function start() { if (running) return; running = true; canvas.style.display = "block"; lastT = performance.now(); nextBolt = lastT / 1000 + 1; raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); ctx.clearRect(0, 0, W, H); strikes = []; flash = 0; canvas.style.display = "none"; }

  /* ---------- indicator + toggle chip ---------- */
  var chip = document.createElement("button");
  chip.className = "weather-chip";
  chip.setAttribute("aria-label", "Toggle weather effects");
  document.body.appendChild(chip);
  function paintChip() {
    var w = TYPES[curIdx];
    chip.innerHTML = enabled
      ? '<span class="wx-ico">' + w.icon + '</span> ' + w.name
      : '<span class="wx-ico">🌦️</span> Weather off';
    chip.classList.toggle("off", !enabled);
  }
  chip.addEventListener("click", function () {
    enabled = !enabled; localStorage.setItem(STORE_KEY, enabled ? "1" : "0"); paintChip();
    if (enabled) start(); else stop();
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { if (running) { running = false; cancelAnimationFrame(raf); } }
    else if (enabled && !running) start();
  });

  syncScroll(); paintChip();
  if (enabled) start();
})();
