/* =========================================================
   NORTHBOUND — animations.js
   Canvas generative visuals: hero network, signature orb, bento accent.
   Performance: rAF, DPR cap, pause when offscreen / tab hidden.
   Honors prefers-reduced-motion (renders a single static frame).
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Shared pointer state (also written by interactions.js). Normalized 0..1.
  window.NB = window.NB || {};
  var NB = window.NB;
  if (NB.pointer === undefined) NB.pointer = { x: 0.5, y: 0.5, active: false };

  function css(varName, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return v || fallback;
  }

  // Palette is locked to the light maximalist theme (orange / black / cream).
  function palette() {
    return { accent: css("--accent", "#ff5a00"), ink: "22,18,11", dark: false };
  }

  function hexToRgb(hex) {
    hex = (hex || "").trim();
    if (hex.charAt(0) === "#") hex = hex.slice(1);
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    var n = parseInt(hex, 16);
    if (isNaN(n)) return "255,90,0";
    return ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255);
  }

  // Generic canvas bootstrap with DPR + resize + visibility pausing.
  function setupCanvas(canvas, draw, opts) {
    opts = opts || {};
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, raf = null, visible = true, onScreen = true;

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (opts.onResize) opts.onResize(w, h);
    }

    function frame(t) {
      draw(ctx, w, h, t || 0);
      if (!reduce && visible && onScreen) raf = requestAnimationFrame(frame);
      else raf = null;
    }
    function start() { if (raf == null && !reduce && visible && onScreen) raf = requestAnimationFrame(frame); }

    resize();
    window.addEventListener("resize", function () { resize(); if (reduce) frame(0); }, { passive: true });
    document.addEventListener("visibilitychange", function () {
      visible = !document.hidden; if (visible) start();
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        if (onScreen) start();
      }, { threshold: 0 }).observe(canvas);
    }

    if (reduce) { frame(0); } else { start(); }
    return { resize: resize };
  }

  /* ---------------- HERO : drifting node network ---------------- */
  var heroEl = document.getElementById("hero-canvas");
  if (heroEl) {
    var nodes = [];
    function seedNodes(w, h) {
      var count = Math.round(Math.min(64, Math.max(26, (w * h) / 26000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.8
        });
      }
    }
    setupCanvas(heroEl, function (ctx, w, h, t) {
      if (!nodes.length) seedNodes(w, h);
      var pal = palette(), accentRgb = hexToRgb(pal.accent);
      var px = NB.pointer.x * w, py = NB.pointer.y * h;
      var PR = Math.max(150, Math.min(w, h) * 0.34); // pointer interaction radius
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (!reduce) { n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        // pull toward pointer / touch when it is near
        if (NB.pointer.active) {
          var dx = px - n.x, dy = py - n.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PR) { var f = (1 - dist / PR) * 0.05; n.x += dx * f; n.y += dy * f; }
        }
      }
      // node-to-node links
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var A = nodes[a], B = nodes[b];
          var ddx = A.x - B.x, ddy = A.y - B.y, d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 132) {
            var o = (1 - d / 132) * 0.3;
            ctx.strokeStyle = "rgba(" + pal.ink + "," + o.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
          }
        }
      }
      // pointer halo + links to nearby nodes (the "reacts to touch/near it" effect)
      if (NB.pointer.active) {
        var hg = ctx.createRadialGradient(px, py, 0, px, py, PR);
        hg.addColorStop(0, "rgba(" + accentRgb + ",0.15)");
        hg.addColorStop(1, "rgba(" + accentRgb + ",0)");
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.arc(px, py, PR, 0, Math.PI * 2); ctx.fill();

        var LR = PR * 0.62;
        for (var p = 0; p < nodes.length; p++) {
          var q = nodes[p], lx = px - q.x, ly = py - q.y, ld = Math.sqrt(lx * lx + ly * ly);
          if (ld < LR) {
            ctx.strokeStyle = "rgba(" + accentRgb + "," + ((1 - ld / LR) * 0.5).toFixed(3) + ")";
            ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      // nodes
      var nearR2 = PR * PR * 0.16;
      for (var k = 0; k < nodes.length; k++) {
        var m = nodes[k], near = false;
        if (NB.pointer.active) { var ex = px - m.x, ey = py - m.y; near = (ex * ex + ey * ey) < nearR2; }
        ctx.fillStyle = near ? pal.accent : "rgba(" + pal.ink + ",0.5)";
        ctx.beginPath(); ctx.arc(m.x, m.y, near ? m.r + 1.6 : m.r, 0, Math.PI * 2); ctx.fill();
      }
    }, { onResize: function (w, h) { seedNodes(w, h); } });
  }

  /* ---------------- PAGE BACKGROUND : hexagon honeycomb, rotates + parallax on scroll ---------------- */
  var bgEl = document.getElementById("bg-canvas");
  if (bgEl) {
    var scrollTarget = window.pageYOffset || 0, sy = scrollTarget;
    window.addEventListener("scroll", function () { scrollTarget = window.pageYOffset || 0; }, { passive: true });

    var R = 52;                       // hexagon radius
    var stepX = R * 1.5;              // flat-top honeycomb spacing
    var stepY = R * Math.sqrt(3);

    function hexPath(ctx, cx, cy, rot) {
      for (var k = 0; k < 6; k++) {
        var a = rot + k * Math.PI / 3;
        var x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    setupCanvas(bgEl, function (ctx, w, h, t) {
      var pal = palette(), accentRgb = hexToRgb(pal.accent);
      sy += (scrollTarget - sy) * 0.08;            // smoothed scroll position
      var time = reduce ? 0 : t * 0.0002;
      var rot = reduce ? 0 : (sy * 0.0016 + time); // scroll drives cell rotation
      var par = reduce ? 0 : (sy * 0.14) % (stepY * 2); // scroll parallax (wrapped, seamless)

      ctx.clearRect(0, 0, w, h);
      var cols = Math.ceil(w / stepX) + 2, rows = Math.ceil(h / stepY) + 4;

      // base honeycomb
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(" + pal.ink + ",0.07)";
      ctx.beginPath();
      for (var ci = -1; ci < cols; ci++) {
        var cx = ci * stepX, rowOff = (Math.abs(ci) % 2) ? stepY / 2 : 0;
        for (var ri = -2; ri < rows; ri++) hexPath(ctx, cx, ri * stepY + rowOff + par, rot);
      }
      ctx.stroke();

      // sparse orange accent cells
      ctx.strokeStyle = "rgba(" + accentRgb + ",0.18)";
      ctx.beginPath();
      for (var ci2 = -1; ci2 < cols; ci2 += 3) {
        var cx2 = ci2 * stepX, rowOff2 = (Math.abs(ci2) % 2) ? stepY / 2 : 0;
        for (var ri2 = -2; ri2 < rows; ri2 += 3) hexPath(ctx, cx2, ri2 * stepY + rowOff2 + par, rot);
      }
      ctx.stroke();
    });
  }

  /* ---------------- SIGNATURE ORB : morphing blob ---------------- */
  var orbEl = document.getElementById("orb-canvas");
  var stateEls = document.querySelectorAll("#signal-states span");
  if (orbEl) {
    var stateIndex = 0, lastSwitch = 0;
    setupCanvas(orbEl, function (ctx, w, h, t) {
      var pal = palette();
      ctx.clearRect(0, 0, w, h);
      var cx = w / 2, cy = h / 2;
      var base = Math.min(w, h) * 0.24;
      var time = reduce ? 0 : t * 0.0005;

      // pointer offset (parallax pull)
      var offx = (NB.pointer.x - 0.5) * base * 0.5;
      var offy = (NB.pointer.y - 0.5) * base * 0.5;

      // cycle states every ~3.2s
      if (!reduce && t - lastSwitch > 3200) {
        lastSwitch = t;
        stateIndex = (stateIndex + 1) % Math.max(1, stateEls.length);
        for (var s = 0; s < stateEls.length; s++) stateEls[s].classList.toggle("is-active", s === stateIndex);
      }
      var morph = 1 + stateIndex * 0.35; // shape complexity per state

      function blob(scale, alpha, fill) {
        ctx.beginPath();
        var steps = 120;
        for (var i = 0; i <= steps; i++) {
          var ang = (i / steps) * Math.PI * 2;
          var noise =
            Math.sin(ang * (3 + stateIndex) + time * 2) * 0.16 +
            Math.sin(ang * (5 * morph) - time * 1.5) * 0.10 +
            Math.cos(ang * 2 + time) * 0.08;
          var rr = base * scale * (1 + noise);
          var x = cx + offx + Math.cos(ang) * rr;
          var y = cy + offy + Math.sin(ang) * rr * 0.92;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        if (fill) {
          var g = ctx.createRadialGradient(cx + offx, cy + offy, base * 0.2, cx + offx, cy + offy, base * scale * 1.4);
          g.addColorStop(0, pal.accent);
          g.addColorStop(1, "rgba(" + pal.ink + ",0)");
          ctx.globalAlpha = alpha; ctx.fillStyle = g; ctx.fill(); ctx.globalAlpha = 1;
        } else {
          ctx.globalAlpha = alpha; ctx.strokeStyle = pal.accent; ctx.lineWidth = 1.2; ctx.stroke(); ctx.globalAlpha = 1;
        }
      }
      blob(1.5, 0.14, true);
      blob(1.15, 0.5, false);
      blob(0.85, 0.85, false);
      // core
      ctx.beginPath(); ctx.arc(cx + offx, cy + offy, base * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = pal.accent; ctx.globalAlpha = 0.9; ctx.fill(); ctx.globalAlpha = 1;
    });
  }

  /* ---------------- BENTO accent viz ---------------- */
  var vizEl = document.getElementById("why-viz");
  if (vizEl) {
    var pts = [];
    setupCanvas(vizEl, function (ctx, w, h, t) {
      if (!pts.length) for (var i = 0; i < 5; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, p: Math.random() * 6.28 });
      var pal = palette();
      ctx.clearRect(0, 0, w, h);
      var time = reduce ? 0 : t * 0.001;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        var x = (p.x % w), y = (p.y % h) + Math.sin(time + p.p) * 8;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j];
          ctx.strokeStyle = "rgba(" + pal.ink + ",0.14)"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(q.x % w, q.y % h); ctx.stroke();
        }
        ctx.fillStyle = pal.accent; ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.29); ctx.fill();
      }
    });
  }

  // Repaint static frames when theme flips (so reduced-motion / paused canvases update colors).
  window.addEventListener("nb:themechange", function () {
    if (reduce) window.dispatchEvent(new Event("resize"));
  });
})();
