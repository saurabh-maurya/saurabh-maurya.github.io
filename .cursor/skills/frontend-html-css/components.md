# Component Patterns

Framework-free HTML/CSS components. All values via tokens from [tokens-template.md](tokens-template.md).

## Layout

### Container

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--container-padding);
}
```

### Stack (vertical rhythm)

```css
.stack > * + * { margin-top: var(--space-4); }
.stack--lg > * + * { margin-top: var(--space-6); }
```

### Grid

```html
<div class="grid grid--3">
  <div class="card">...</div>
</div>
```

```css
.grid {
  display: grid;
  gap: var(--grid-gap);
}
.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 48rem) {
  .grid--2, .grid--3 { grid-template-columns: 1fr; }
}
```

### Section Header

```html
<header class="section-header">
  <p class="section-label">Category</p>
  <h2 class="section-title">Section Title</h2>
  <p class="section-desc">Optional description.</p>
</header>
```

```css
.section-header { margin-bottom: var(--space-8); }
.section-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  margin-bottom: var(--space-2);
}
.section-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  color: var(--color-text);
  line-height: var(--leading-tight);
}
.section-desc {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  max-width: 42rem;
  margin-top: var(--space-3);
}
```

## Navigation

```html
<header class="nav-header">
  <nav class="nav" aria-label="Main navigation">
    <a href="/" class="nav__logo">Brand</a>
    <button class="nav__toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav__menu" id="nav-menu">
      <li><a href="#about">About</a></li>
      <li><a href="#contact" class="btn btn--primary btn--sm">Contact</a></li>
    </ul>
  </nav>
</header>
```

```css
.nav-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: color-mix(in srgb, var(--color-bg) 90%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: var(--border);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--space-4) var(--space-5);
}
.nav__menu {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  list-style: none;
}
.nav__menu a {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  transition: color var(--transition);
}
.nav__menu a:hover,
.nav__menu a:focus-visible {
  color: var(--color-primary);
}
```

Mobile: hide `.nav__menu`, show `.nav__toggle`, toggle `.nav__menu--open` class via JS.

## Buttons

```html
<a href="#" class="btn btn--primary">Primary</a>
<button type="button" class="btn btn--secondary">Secondary</button>
<button type="button" class="btn btn--ghost">Ghost</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-family: inherit;
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  line-height: 1;
  border-radius: var(--radius);
  border: var(--border-width) solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--transition), color var(--transition),
              border-color var(--transition), transform var(--transition);
}
.btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
.btn--primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}
.btn--primary:hover {
  background: var(--color-primary-hover);
}
.btn--secondary {
  background: transparent;
  border-color: var(--color-border-strong);
  color: var(--color-text);
}
.btn--secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.btn--ghost {
  background: transparent;
  color: var(--color-text-muted);
}
.btn--ghost:hover { color: var(--color-primary); }
.btn--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}
```

## Card

```html
<article class="card">
  <div class="card__icon" aria-hidden="true">📊</div>
  <h3 class="card__title">Card Title</h3>
  <p class="card__body">Description text.</p>
  <div class="card__footer">
    <span class="tag">Tag</span>
  </div>
</article>
```

```css
.card {
  background: var(--color-surface);
  border: var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: box-shadow var(--transition), transform var(--transition);
}
.card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}
.card__title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
}
.card__body {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-normal);
  flex: 1;
}
.card__footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: auto;
}
```

## Tags

```html
<span class="tag">Label</span>
<span class="tag tag--primary">Featured</span>
```

```css
.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  border: var(--border);
  color: var(--color-text-muted);
}
.tag--primary {
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  border-color: color-mix(in srgb, var(--color-primary) 25%, transparent);
  color: var(--color-primary);
}
```

## Forms

```html
<div class="field">
  <label class="field__label" for="email">Email</label>
  <input class="field__input" type="email" id="email" name="email" required autocomplete="email" />
</div>
```

```css
.field { display: flex; flex-direction: column; gap: var(--space-2); }
.field__label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text);
}
.field__input {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  font-family: inherit;
  color: var(--color-text);
  background: var(--color-bg);
  border: var(--border);
  border-radius: var(--radius);
  transition: border-color var(--transition), box-shadow var(--transition);
}
.field__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
}
.field__input::placeholder { color: var(--color-text-muted); }
```

## Hero

```html
<section class="hero" aria-labelledby="hero-heading">
  <div class="container hero__inner">
    <p class="hero__eyebrow">Eyebrow text</p>
    <h1 id="hero-heading" class="hero__title">Main Headline</h1>
    <p class="hero__desc">Supporting paragraph.</p>
    <div class="hero__actions">
      <a href="#" class="btn btn--primary">Get Started</a>
      <a href="#" class="btn btn--secondary">Learn More</a>
    </div>
  </div>
</section>
```

```css
.hero {
  padding: var(--space-12) 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
}
.hero__eyebrow {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}
.hero__title {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  max-width: 20ch;
}
.hero__desc {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  max-width: 42rem;
  margin-top: var(--space-5);
  line-height: var(--leading-loose);
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}
```

## Footer

```html
<footer class="footer">
  <div class="container footer__inner">
    <p class="footer__copy">&copy; 2026 Brand. All rights reserved.</p>
    <nav class="footer__nav" aria-label="Footer">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </nav>
  </div>
</footer>
```

```css
.footer {
  border-top: var(--border);
  padding: var(--space-6) 0;
  margin-top: var(--space-12);
}
.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}
.footer__copy {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
.footer__nav { display: flex; gap: var(--space-4); }
.footer__nav a {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
.footer__nav a:hover { color: var(--color-primary); }
```

## Accessibility Utilities

```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

## Scroll Reveal (Optional)

```css
.reveal {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
```
