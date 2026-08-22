# Copy-Paste Snippets

Ready-to-use blocks for new pages outside this repo. Inside this repo, link `css/styles.css` instead.

## HTML Head Boilerplate

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Page description" />
  <title>Page Title</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />

  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

  <!-- Styles -->
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <!-- content -->
</body>
</html>
```

## :root Token Block

```css
:root {
  --bg:         #E6D9C8;
  --surface:    #F0E8DA;
  --surface2:   #D9CCBA;
  --surface3:   #CCC0AC;
  --border:     rgba(15, 58, 148, 0.16);
  --border-hov: rgba(15, 58, 148, 0.38);
  --accent:     #0F3A94;
  --accent-dim: rgba(15, 58, 148, 0.65);
  --accent2:    #B84220;
  --accent3:    #4F36A8;
  --text:       #1E2D44;
  --text-bright:#060E1C;
  --text-muted: #5A6A7C;
  --glow-sm:    0 4px 22px rgba(15, 58, 148, 0.15);
  --glow-md:    0 8px 44px rgba(15, 58, 148, 0.22);
  --ff-display: 'Space Grotesk', sans-serif;
  --ff-mono:    'IBM Plex Mono', monospace;
  --ff-body:    'Inter', sans-serif;
  --radius:     8px;
  --radius-lg:  16px;
  --ease:       cubic-bezier(0.4, 0, 0.2, 1);
  --t:          all 0.3s var(--ease);
}
```

## Minimal Base CSS

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--ff-body);
  font-size: 16px;
  font-weight: 300;
  line-height: 1.75;
  overflow-x: hidden;
}
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9000;
  opacity: 0.3;
}
img { display: block; max-width: 100%; }
a  { text-decoration: none; color: inherit; }
ul { list-style: none; }
strong { color: var(--accent); font-weight: 700; }

h1, h2, h3, h4 {
  font-family: var(--ff-display);
  color: var(--text-bright);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
section { padding: 6rem 0; }
```

## Section Template

```html
<!-- ================================================================
     SECTION NAME
================================================================ -->
<section id="section-id">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-label">category</div>
      <h2 class="section-title">Section Title</h2>
      <p class="section-subtitle">Optional supporting text.</p>
    </div>

    <div class="content-grid reveal">
      <!-- cards or content here -->
    </div>
  </div>
</section>
```

With elevated surface background:

```css
#section-id {
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
```

## Button Pair

```html
<div class="hero-actions">
  <a href="#projects" class="btn btn-primary">
    <i class="fas fa-rocket"></i> View My Work
  </a>
  <a href="#" class="btn btn-secondary">
    <i class="fas fa-download"></i> Download
  </a>
</div>
```

## Project Card Template

```html
<div class="projects-grid">
  <div class="project-card reveal">
    <div class="project-icon">📊</div>
    <h3 class="project-name">Card Title</h3>
    <p class="project-desc">Card description goes here.</p>
    <div class="project-tags">
      <span>Tag One</span>
      <span>Tag Two</span>
    </div>
  </div>
</div>
```

## Stat Card Template

```html
<div class="stats-grid">
  <div class="stat-card reveal">
    <div class="stat-number">5+</div>
    <div class="stat-label">Metric Label</div>
  </div>
  <div class="stat-card reveal" style="transition-delay:0.1s">
    <div class="stat-number">9×</div>
    <div class="stat-label">Another Metric</div>
  </div>
</div>
```

## Tag Row

```html
<div class="skill-tags">
  <span class="skill-tag">Python</span>
  <span class="skill-tag">LangChain</span>
  <span class="skill-tag">AWS</span>
</div>
```

Inline exp/project tags (smaller):

```html
<div class="exp-tags">
  <span>Python</span><span>OpenAI</span><span>RAG</span>
</div>
```

## Gradient Text

```html
<h1 class="hero-name">
  First<br>
  <span class="gradient-text">Highlighted</span>
</h1>
```

```css
.gradient-text {
  background: linear-gradient(130deg, var(--accent) 0%, var(--accent3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: shimmerText 4s linear infinite;
}
@keyframes shimmerText {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}
```

## Scroll Reveal Setup

Add to elements:

```html
<div class="reveal">Content</div>
<div class="reveal" style="transition-delay:0.15s">Staggered</div>
```

Minimal JS (if not using `js/main.js`):

```javascript
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

## Custom Cursor (Optional)

```html
<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursor-ring"></div>
```

Requires full cursor CSS from `css/styles.css` and `initCursor()` from `js/main.js`.
