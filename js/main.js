/* ============================================================
   SAURABH MAURYA PORTFOLIO — main.js
============================================================ */

// ============================================================
// CUSTOM CURSOR
// ============================================================
(function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mX = -100, mY = -100, rX = -100, rY = -100;

  document.addEventListener('mousemove', e => {
    mX = e.clientX;
    mY = e.clientY;
    dot.style.left = mX + 'px';
    dot.style.top  = mY + 'px';
  });

  function animRing() {
    rX += (mX - rX) * 0.13;
    rY += (mY - rY) * 0.13;
    ring.style.left = rX + 'px';
    ring.style.top  = rY + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  // Expand ring on interactive elements
  const targets = document.querySelectorAll(
    'a, button, .project-card, .stat-card, .skill-tag, .contact-link'
  );
  targets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();


// ============================================================
// NEURAL NETWORK CANVAS
// ============================================================
(function initCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const NODE_COUNT = 68;
  const MAX_DIST   = 155;
  const SPEED      = 0.38;

  let W, H, nodes = [];
  let mouse = { x: -1000, y: -1000 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.getElementById('hero').addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.getElementById('hero').addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class Node {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * (W || window.innerWidth);
      this.y  = Math.random() * (H || window.innerHeight);
      this.vx = (Math.random() - 0.5) * SPEED;
      this.vy = (Math.random() - 0.5) * SPEED;
      this.r  = Math.random() * 2 + 1;
      this.op = Math.random() * 0.45 + 0.15;
    }
    update() {
      // Soft mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 14400) { // 120px
        const d = Math.sqrt(d2);
        const f = (120 - d) / 120 * 0.6;
        this.vx += (dx / d) * f;
        this.vy += (dy / d) * f;
      }

      // Speed cap
      const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (spd > SPEED * 3) {
        this.vx = (this.vx / spd) * SPEED * 3;
        this.vy = (this.vy / spd) * SPEED * 3;
      }

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,220,232,${this.op})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());

  function drawEdges() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.11;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0,220,232,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  let rafId;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => { n.update(); n.draw(); });
    drawEdges();
    rafId = requestAnimationFrame(animate);
  }
  animate();

  // Pause when hero is out of view
  const heroObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { if (!rafId) animate(); }
      else { cancelAnimationFrame(rafId); rafId = null; }
    });
  });
  heroObs.observe(document.getElementById('hero'));
})();


// ============================================================
// TYPEWRITER
// ============================================================
(function initTypewriter() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'Senior LLM / GenAI Engineer',
    'Tech Lead & Agentic Systems Builder',
    'Enterprise Payments Architect',
    'RAG & Knowledge Graph Specialist',
  ];

  let pi = 0, ci = 0, deleting = false;

  function type() {
    const word = phrases[pi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 68);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(type, 450);
        return;
      }
      setTimeout(type, 38);
    }
  }
  setTimeout(type, 900);
})();


// ============================================================
// SCROLL REVEAL  (IntersectionObserver)
// ============================================================
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();


// ============================================================
// STAT COUNTERS
// ============================================================
(function initCounters() {
  function runCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix ?? '+';
    const dur    = 1400;
    const step   = target / (dur / 16);
    let current  = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-number[data-target]').forEach(runCounter);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  const grid = document.querySelector('.stats-grid');
  if (grid) obs.observe(grid);
})();


// ============================================================
// NAVBAR SCROLL
// ============================================================
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 55);
  window.addEventListener('scroll', onScroll, { passive: true });
})();


// ============================================================
// MOBILE MENU TOGGLE
// ============================================================
(function initMobileMenu() {
  const btn   = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();


// ============================================================
// SMOOTH SECTION ACTIVE STATE IN NAV  (optional polish)
// ============================================================
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + e.target.id) {
            a.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => obs.observe(s));
})();
