# Component Patterns

HTML structure and essential CSS for each portfolio component. All components use tokens from [tokens.md](tokens.md).

## Layout

### Container

```html
<div class="container">
  <!-- max-width 1160px, padding 0 1.5rem -->
</div>
```

### Section Header

```html
<div class="section-header reveal">
  <div class="section-label">category</div>
  <h2 class="section-title">Section Title</h2>
  <p class="section-subtitle">Optional description text.</p>
</div>
```

```css
.section-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  margin-bottom: 1rem;
}
.section-subtitle {
  color: var(--text);
  font-size: 1.05rem;
  max-width: 540px;
}
.section-header { margin-bottom: 3rem; }
```

## Navigation

```html
<nav id="navbar">
  <div class="container">
    <div class="nav-inner">
      <a href="#" class="nav-logo">BrandName<span>.dev</span></a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="nav-links">
        <li><a href="#about">about</a></li>
        <li><a href="#contact" class="nav-cta">hire me</a></li>
      </ul>
    </div>
  </div>
</nav>
```

Key CSS:
- Fixed top, `z-index: 500`
- `.nav-logo` — mono, muted text, span in `--accent`
- `.nav-links a` — mono, lowercase, underline animates on hover (`scaleX`)
- `.nav-cta` — bordered pill button, fills accent on hover
- `#navbar.scrolled` — `background: rgba(230,217,200,0.94)`, `backdrop-filter: blur(20px)`, bottom border

## Hero

```html
<section id="hero">
  <canvas id="neural-canvas"></canvas>
  <div class="hero-overlay"></div>
  <div class="hero-content container">
    <div class="hero-text">
      <div class="hero-tag">
        <span class="tag-dot"></span>
        Status message
      </div>
      <h1 class="hero-name">
        First<br>
        <span class="gradient-text">Last</span>
      </h1>
      <p class="hero-title">
        <span class="typed-text" id="typed"></span><span class="cursor-blink"></span>
      </p>
      <p class="hero-summary">Body text with <strong>emphasis</strong>.</p>
      <div class="hero-actions">
        <a href="#" class="btn btn-primary"><i class="fas fa-rocket"></i> Primary</a>
        <a href="#" class="btn btn-secondary"><i class="fas fa-download"></i> Secondary</a>
      </div>
      <div class="hero-socials">
        <a href="#" class="social-link" aria-label="GitHub"><i class="fab fa-github"></i></a>
      </div>
    </div>
  </div>
</section>
```

Key CSS:
- `min-height: 100vh`, gradient background, dot grid `::before`
- `.hero-name` — `clamp(3.8rem, 8.5vw, 6.8rem)`, weight 600
- `.hero-tag` — pill, mono, accent border, green pulse `.tag-dot`
- `.hero-title` — mono, muted, typed text in accent
- Staggered `fadeUp` animations on hero children

## Buttons

```html
<a href="#" class="btn btn-primary"><i class="fas fa-rocket"></i> Label</a>
<a href="#" class="btn btn-secondary"><i class="fas fa-download"></i> Label</a>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.9rem;
  font-family: var(--ff-mono);
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  border-radius: var(--radius);
  transition: var(--t);
  position: relative;
  overflow: hidden;
}
/* ::before — white shine sweep on hover */
.btn-primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 4px 15px rgba(15,58,148,0.25);
}
.btn-primary:hover {
  background: #1558B8;
  transform: translateY(-2px);
}
.btn-secondary {
  background: rgba(15,58,148,0.05);
  border: 1.5px solid rgba(15,58,148,0.28);
  color: var(--text-bright);
}
.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: var(--glow-sm);
  transform: translateY(-2px);
}
```

## Social Link

```html
<a href="#" class="social-link" aria-label="GitHub"><i class="fab fa-github"></i></a>
```

40×40px, `--surface` bg, `--border`, hover: accent border + lift `-3px`.

## Stat Card

```html
<div class="stats-grid">
  <div class="stat-card reveal">
    <div class="stat-number" data-target="5" data-suffix="+">0</div>
    <div class="stat-label">Years Experience</div>
  </div>
</div>
```

```css
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.stat-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.75rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
/* ::before — top gradient bar, scaleX on hover */
.stat-card:hover { transform: translateY(-5px); box-shadow: 0 8px 28px rgba(15,58,148,0.12); }
.stat-number {
  font-family: var(--ff-display);
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--accent);
}
.stat-label {
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
```

## Skill Group

```html
<div class="skills-groups">
  <div class="skill-group reveal">
    <div class="skill-group-header">
      <div class="skill-group-icon"><i class="fas fa-brain"></i></div>
      <div class="skill-group-title">Category Name</div>
    </div>
    <div class="skill-tags">
      <span class="skill-tag">Tag</span>
    </div>
  </div>
</div>
```

```css
.skills-groups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.skill-group {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}
/* ::after — bottom gradient bar on hover */
.skill-group-icon {
  width: 36px; height: 36px;
  background: rgba(15,58,148,0.08);
  border: 1.5px solid rgba(15,58,148,0.16);
  border-radius: 8px;
  color: var(--accent);
}
.skill-tag {
  padding: 0.32rem 0.8rem;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: var(--ff-mono);
  font-size: 0.73rem;
}
.skill-tag:hover {
  background: rgba(15,58,148,0.07);
  color: var(--accent);
  transform: translateY(-1px);
}
```

## Project Card

```html
<div class="projects-grid">
  <div class="project-card reveal">
    <div class="project-icon">📊</div>
    <h3 class="project-name">Project Name</h3>
    <p class="project-desc">Description text.</p>
    <div class="project-tags">
      <span>Python</span><span>OpenAI</span>
    </div>
  </div>
</div>
```

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.project-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  position: relative;
  overflow: hidden;
}
/* ::before — subtle gradient overlay on hover */
/* ::after — bottom 3px gradient bar on hover */
.project-card:hover { transform: translateY(-7px); }
.project-name {
  font-family: var(--ff-display);
  font-size: 1.05rem;
  font-weight: 700;
}
.project-tags span {
  font-family: var(--ff-mono);
  font-size: 0.68rem;
  padding: 0.22rem 0.65rem;
  background: rgba(15,58,148,0.06);
  border: 1px solid rgba(15,58,148,0.13);
  border-radius: 4px;
  color: var(--accent-dim);
}
```

## Experience Card

```html
<div class="timeline">
  <div class="timeline-item reveal">
    <div class="timeline-connector"><div class="timeline-dot"></div></div>
    <div class="exp-card">
      <div class="exp-header">
        <div>
          <h3 class="exp-role">Job Title</h3>
          <div class="exp-company">Company · Location</div>
        </div>
        <div class="exp-date">Apr 2025 — Present</div>
      </div>
      <ul class="exp-bullets">
        <li>Bullet with <strong>emphasis</strong>.</li>
      </ul>
      <div class="exp-tags">
        <span>Python</span><span>LangChain</span>
      </div>
    </div>
  </div>
</div>
```

Key CSS:
- `.timeline::before` — 2px vertical gradient line
- `.timeline-dot` — 14px circle, accent border, fills on hover
- `.exp-card::before` — left 3px vertical gradient bar on hover
- `.exp-card:hover` — `translateX(4px)`
- `.exp-date` — pill badge, mono, accent color
- `.exp-bullets li::before` — `▸` in accent

## Timeline

Standalone reference for the timeline connector pattern:

```css
.timeline { position: relative; padding-left: 1.5rem; }
.timeline::before {
  content: '';
  position: absolute;
  left: 0; top: 0.5rem; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), rgba(15,58,148,0.06));
}
.timeline-item { position: relative; padding-left: 2.5rem; margin-bottom: 2.5rem; }
.timeline-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--surface);
  border: 2.5px solid var(--accent);
  box-shadow: 0 0 0 3px rgba(15,58,148,0.12);
}
```

## Education Card

```html
<div class="edu-grid">
  <div class="edu-card reveal">
    <div class="edu-icon">🎓</div>
    <h3 class="edu-degree">Degree Name</h3>
    <div class="edu-field">Field of Study</div>
    <div class="edu-institution">Institution</div>
    <div class="edu-year">2020</div>
  </div>
</div>
```

- Grid: 3 columns, gap `1.25rem`
- Background: `var(--bg)` on `var(--surface)` section
- `::before` top gradient bar on hover
- `.edu-field` — accent color; `.edu-year` — pill badge

## Contact Link

```html
<div class="contact-links">
  <a href="mailto:email@example.com" class="contact-link">
    <div class="cl-icon"><i class="fas fa-envelope"></i></div>
    <div class="cl-info">
      <span class="cl-label">Email</span>
      <span class="cl-value">email@example.com</span>
    </div>
    <i class="fas fa-arrow-right cl-arrow"></i>
  </a>
</div>
```

```css
.contact-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
}
.contact-link:hover {
  transform: translateX(6px);
  box-shadow: 0 6px 24px rgba(15,58,148,0.10);
}
.cl-icon {
  width: 38px; height: 38px;
  background: rgba(15,58,148,0.07);
  border: 1.5px solid rgba(15,58,148,0.14);
  border-radius: var(--radius);
  color: var(--accent);
}
.cl-label {
  font-family: var(--ff-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}
```

## Achievement Card

```html
<div class="achievement-card">
  <div class="ach-big">9×</div>
  <div class="ach-title">Achievement Title</div>
  <div class="ach-sub">Description text.</div>
  <div class="ach-divider"></div>
  <div class="ach-stats">
    <div class="ach-stat">
      <div class="ach-num">5+</div>
      <div class="ach-lbl">Years</div>
    </div>
    <div class="ach-sep"></div>
    <!-- more stats -->
  </div>
</div>
```

- Gradient background with conic rotating `::before`
- `.ach-big` — gradient text shimmer, 5.5rem display font
- `.ach-num` — accent color (use `--accent2` / `--accent3` for variety)

## About Link

```html
<a href="#" class="about-link">
  <i class="fab fa-linkedin"></i> LinkedIn
</a>
```

Mono, bordered, `--surface2` bg, hover accent + lift.

## Footer

```html
<footer>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-logo">BrandName<span>.dev</span></div>
      <p class="footer-text">Tagline · Location</p>
      <div class="footer-socials">
        <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
      </div>
    </div>
  </div>
</footer>
```

- `background: var(--surface)`, top border
- Flex row, wraps on mobile to column center

## Card Hover Bar Pattern

Shared pattern across card types — pick position per component:

| Component | Pseudo | Position | Direction |
|-----------|--------|----------|-----------|
| stat-card | `::before` | top | horizontal `scaleX` |
| skill-group | `::after` | bottom | horizontal `scaleX` |
| project-card | `::after` | bottom 3px | horizontal `scaleX` |
| exp-card | `::before` | left 3px | vertical `scaleY` |
| edu-card | `::before` | top | horizontal `scaleX` |

```css
/* Horizontal bar example */
.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent3));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease);
}
.card:hover::before { transform: scaleX(1); }
```

## Tech Chip (Hero Visual)

```html
<div class="tech-chip chip-1">🐍 Python</div>
```

Pill shape, cream glass bg `rgba(240,232,218,0.96)`, mono, `chipFloat` animation with staggered delays.
