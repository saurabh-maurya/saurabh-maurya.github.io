# Starter Snippets

Generic boilerplate for new vanilla HTML/CSS projects. Replace token values to match brand.

## Minimal HTML Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Page description for SEO" />
  <title>Page Title</title>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <header class="nav-header">
    <nav class="nav container" aria-label="Main navigation">
      <a href="/" class="nav__logo">Brand</a>
      <ul class="nav__menu">
        <li><a href="#about">About</a></li>
        <li><a href="#contact" class="btn btn--primary btn--sm">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__copy">&copy; 2026 Brand</p>
    </div>
  </footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

## CSS Reset + Tokens Starter

```css
/* ── Tokens ── */
:root {
  --color-bg: #ffffff;
  --color-surface: #f8f9fa;
  --color-text: #1a1a2e;
  --color-text-muted: #6b7280;
  --color-text-inverse: #ffffff;
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-border: rgba(0, 0, 0, 0.12);
  --color-focus-ring: var(--color-primary);

  --font-body: system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-heading: var(--font-body);
  --font-mono: ui-monospace, monospace;

  --text-base: clamp(0.95rem, 0.9rem + 0.25vw, 1rem);
  --text-lg: clamp(1.05rem, 1rem + 0.35vw, 1.25rem);
  --text-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --text-3xl: clamp(2rem, 1.5rem + 2.5vw, 3rem);

  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-8: 3rem;
  --space-12: 6rem;

  --radius: 8px;
  --radius-lg: 16px;
  --container-max: 72rem;
  --container-padding: 0 var(--space-5);
  --grid-gap: var(--space-5);
  --border-width: 1px;
  --border: var(--border-width) solid var(--color-border);

  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --duration: 0.25s;
  --transition: var(--duration) var(--ease);

  --shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
  --z-sticky: 200;
}

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; padding: 0; }

/* ── Typography ── */
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: 1.2;
  color: var(--color-text);
}
h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-lg); }

/* ── Layout ── */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--container-padding);
}
section { padding: var(--space-12) 0; }

/* ── Focus ── */
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Section Template

```html
<section id="features" aria-labelledby="features-heading">
  <div class="container">
    <header class="section-header">
      <p class="section-label">Features</p>
      <h2 id="features-heading" class="section-title">What We Offer</h2>
      <p class="section-desc">Brief supporting description.</p>
    </header>
    <div class="grid grid--3">
      <article class="card">
        <h3 class="card__title">Feature One</h3>
        <p class="card__body">Description.</p>
      </article>
    </div>
  </div>
</section>
```

## Google Fonts Integration

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

```css
:root {
  --font-body: 'Inter', system-ui, sans-serif;
  --font-heading: var(--font-body);
}
```

## Dark Mode Toggle

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #121212;
    --color-surface: #1e1e1e;
    --color-text: #f0f0f0;
    --color-text-muted: #a0a0a0;
    --color-border: rgba(255, 255, 255, 0.12);
  }
}
```

```javascript
// Optional explicit toggle
document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
});
```

```css
[data-theme="dark"] {
  --color-bg: #121212;
  --color-surface: #1e1e1e;
  --color-text: #f0f0f0;
  --color-text-muted: #a0a0a0;
  --color-border: rgba(255, 255, 255, 0.12);
}
```

## Mobile Nav Toggle (JS)

```javascript
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');
toggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('nav__menu--open');
  toggle.setAttribute('aria-expanded', open);
});
```

```css
@media (max-width: 48rem) {
  .nav__toggle { display: flex; }
  .nav__menu {
    display: none;
    position: absolute;
    top: 100%; left: 0; right: 0;
    flex-direction: column;
    background: var(--color-bg);
    border-bottom: var(--border);
    padding: var(--space-4);
  }
  .nav__menu--open { display: flex; }
}
.nav__toggle { display: none; }
```
