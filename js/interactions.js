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

/* =========================================================
   Testimonials carousel — arrow nav + drag-to-scroll.
   Progressive enhancement over a native scroll container.
   ========================================================= */
(function () {
  "use strict";

  var root = document.querySelector("[data-carousel]");
  if (!root) return;

  var track = root.querySelector("[data-carousel-track]");
  var prev = document.querySelector("[data-carousel-prev]");
  var next = document.querySelector("[data-carousel-next]");
  if (!track) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function step() {
    // Advance by one card + gap; fall back to ~80% viewport of the track.
    var card = track.querySelector(".quote");
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
  }

  function scrollBy(dir) {
    track.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" });
  }

  function updateButtons() {
    if (!prev || !next) return;
    var max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max;
  }

  if (prev) prev.addEventListener("click", function () { scrollBy(-1); });
  if (next) next.addEventListener("click", function () { scrollBy(1); });
  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons, { passive: true });
  updateButtons();

  /* ---- Drag / swipe to scroll (pointer-based, fine pointers) ---- */
  var down = false, startX = 0, startScroll = 0, moved = 0;

  track.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch") return; // native touch scroll is better
    down = true; moved = 0;
    startX = e.clientX; startScroll = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener("pointermove", function (e) {
    if (!down) return;
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 4 && !track.classList.contains("is-dragging")) {
      track.classList.add("is-dragging");
    }
    moved = dx;
    track.scrollLeft = startScroll - dx;
  });
  function endDrag(e) {
    if (!down) return;
    down = false;
    track.classList.remove("is-dragging");
    if (e && e.pointerId != null && track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
    updateButtons();
  }
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("dragstart", function (e) { e.preventDefault(); });
})();
