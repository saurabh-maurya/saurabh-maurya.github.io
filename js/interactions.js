/* =========================================================
   NORTHBOUND — interactions.js
   Pointer tracking (shared with canvas) + magnetic buttons.
   No custom cursor. All physics honor prefers-reduced-motion.
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.NB = window.NB || {};
  var NB = window.NB;
  NB.pointer = NB.pointer || { x: 0.5, y: 0.5, active: false };

  // Global pointer normalized to viewport (drives canvas parallax / node pull).
  window.addEventListener("pointermove", function (e) {
    NB.pointer.x = e.clientX / window.innerWidth;
    NB.pointer.y = e.clientY / window.innerHeight;
    NB.pointer.active = true;
  }, { passive: true });
  window.addEventListener("pointerleave", function () { NB.pointer.active = false; });
  window.addEventListener("blur", function () { NB.pointer.active = false; });

  if (reduce) return; // motion physics disabled under reduced motion

  /* ---------------- Hero photo parallax (pointer + touch) ---------------- */
  var heroPhoto = document.querySelector(".hero__photo");
  if (heroPhoto) {
    var tX = 0, tY = 0, tR = 0, cX = 0, cY = 0, cR = 0, running = false;
    function step() {
      cX += (tX - cX) * 0.09; cY += (tY - cY) * 0.09; cR += (tR - cR) * 0.09;
      heroPhoto.style.transform = "translate(" + cX.toFixed(2) + "px," + cY.toFixed(2) + "px) rotate(" + cR.toFixed(2) + "deg)";
      if (Math.abs(tX - cX) > 0.15 || Math.abs(tY - cY) > 0.15 || Math.abs(tR - cR) > 0.04) requestAnimationFrame(step);
      else running = false;
    }
    window.addEventListener("pointermove", function (e) {
      var nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
      tX = nx * -18; tY = ny * -14; tR = nx * 2.4 - 2; /* -2deg resting tilt */
      if (!running) { running = true; requestAnimationFrame(step); }
    }, { passive: true });
  }

  // Magnetic pull only on devices with a fine pointer (mouse/trackpad).
  if (!window.matchMedia("(pointer: fine)").matches) return;

  var magnets = Array.prototype.slice.call(document.querySelectorAll(".magnetic"));
  var STRENGTH = 0.32, RADIUS = 90;

  magnets.forEach(function (el) {
    var rect = null;
    function cache() { rect = el.getBoundingClientRect(); }

    el.addEventListener("pointerenter", cache);
    el.addEventListener("pointermove", function (e) {
      if (!rect) cache();
      var mx = e.clientX - (rect.left + rect.width / 2);
      var my = e.clientY - (rect.top + rect.height / 2);
      var dist = Math.hypot(mx, my);
      var pull = Math.min(1, RADIUS / Math.max(dist, 1));
      el.style.transform = "translate(" + (mx * STRENGTH * pull).toFixed(2) + "px," +
        (my * STRENGTH * pull).toFixed(2) + "px)";
    });
    el.addEventListener("pointerleave", function () {
      el.style.transform = "";
      rect = null;
    });
  });

  window.addEventListener("resize", function () {
    magnets.forEach(function (el) { el.style.transform = ""; });
  }, { passive: true });
})();
