/* =========================================================
   NORTHBOUND — main.js
   Nav, mobile menu, theme toggle, scroll reveals, step tracking, counters.
   Uses IntersectionObserver (no scroll listeners for animation).
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  /* ---------------- Year ---------------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------------- Theme: locked to light maximalist ---------------- */
  root.setAttribute("data-theme", "light");

  /* ---------------- Nav: hide on scroll down, show on scroll up ---------------- */
  var nav = document.getElementById("nav");
  var lastY = window.pageYOffset, ticking = false;
  function onScrollNav() {
    var y = window.pageYOffset;
    if (nav) {
      if (y > lastY && y > 200) nav.classList.add("is-hidden");
      else nav.classList.remove("is-hidden");
    }
    lastY = y; ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScrollNav); ticking = true; }
  }, { passive: true });

  /* ---------------- Mobile menu ---------------- */
  var burger = document.getElementById("nav-burger");
  var menu = document.getElementById("mobile-menu");
  function closeMenu() {
    if (!menu) return;
    menu.setAttribute("hidden", "");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  }
  function openMenu() {
    menu.removeAttribute("hidden");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      burger.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------------- Scroll reveals ---------------- */
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var heroTitle = document.querySelector(".hero__title");
  if (heroTitle) revealTargets.push(heroTitle);

  // Stagger index among direct-sibling reveal groups (list items etc.)
  document.querySelectorAll(".problem__list, .svc, .bento, .metrics, .tech__grid, .steps").forEach(function (group) {
    var kids = group.querySelectorAll("[data-reveal]");
    kids.forEach(function (k, i) { k.style.setProperty("--i", i); });
  });

  if (reduce || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
    runCounters(document);
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          if (entry.target.hasAttribute("data-count")) animateCount(entry.target);
          else if (entry.target.querySelector("[data-count]")) runCounters(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Counters (per-element, animate once) ---------------- */
  function animateCount(el) {
    if (el.dataset.counted) return; el.dataset.counted = "1";
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.innerHTML = target + suffix; return; }
    var start = performance.now(), dur = 1400;
    function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function runCounters(scope) {
    (scope || document).querySelectorAll("[data-count]").forEach(animateCount);
  }

  /* ---------------- Approach step tracking ---------------- */
  var steps = Array.prototype.slice.call(document.querySelectorAll(".step"));
  var bar = document.getElementById("approach-bar");
  var nowLabel = document.getElementById("approach-now");
  if (steps.length && "IntersectionObserver" in window) {
    var stepIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = steps.indexOf(entry.target);
          steps.forEach(function (s, i) { s.classList.toggle("is-active", i <= idx); });
          if (bar) bar.style.width = ((idx + 1) / steps.length * 100) + "%";
          if (nowLabel) nowLabel.textContent = entry.target.getAttribute("data-step");
        }
      });
    }, { threshold: 0.6 });
    steps.forEach(function (s) { stepIO.observe(s); });
  } else {
    steps.forEach(function (s) { s.classList.add("is-active"); });
  }
})();
