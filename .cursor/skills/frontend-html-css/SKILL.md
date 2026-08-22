---
name: frontend-html-css
description: >-
  Builds and styles vanilla HTML/CSS frontends using design tokens, semantic
  markup, accessible components, and responsive layout patterns. Use when
  creating or editing HTML pages, CSS stylesheets, landing pages, static sites,
  or UI components — for any project that is not tied to a specific brand theme.
  Prefer portfolio-design-system when matching saurabh-maurya.github.io styling.
---

# Frontend HTML/CSS

Framework-agnostic patterns for building polished static frontends. **No fixed palette or fonts** — discover or define tokens per project.

## When to Apply

- New HTML pages, sections, or static sites (any project)
- Adding CSS to an existing vanilla frontend
- Refactoring inline styles into a token-based stylesheet
- Building reusable UI components (nav, cards, forms, hero)

**Not for:** React/Vue/Svelte component libraries (use framework conventions). **Not for:** portfolio-specific cream-blue theme (use `portfolio-design-system`).

## Workflow

```
Task Progress:
- [ ] Read existing HTML/CSS in the project (if any)
- [ ] Define or extend :root design tokens
- [ ] Write semantic HTML structure
- [ ] Style: base → layout → components
- [ ] Add responsive rules and focus states
- [ ] Verify accessibility basics
```

### Step 1 — Discover Before Creating

Before writing CSS, check the project for:

| Look for | Action |
|----------|--------|
| Existing `:root` or CSS variables | Extend, don't duplicate |
| `styles.css` / `main.css` | Link and add component classes |
| Font imports in HTML | Reuse same families |
| Breakpoints in media queries | Match existing values |
| Class naming (BEM, utility, etc.) | Follow project convention |

If no styles exist, scaffold from [snippets.md](snippets.md).

### Step 2 — Token-First CSS

Always centralize values in `:root`. See [tokens-template.md](tokens-template.md) for the full token schema.

Minimum token set:

```css
:root {
  /* Colors — semantic names, project-specific values */
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --color-primary: ...;
  --color-border: ...;

  /* Typography */
  --font-body: system-ui, sans-serif;
  --font-heading: var(--font-body);
  --font-mono: ui-monospace, monospace;

  /* Spacing & shape */
  --space-unit: 1rem;
  --radius: 8px;
  --radius-lg: 16px;
  --container-max: 72rem;

  /* Motion */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --duration: 0.25s;
  --transition: var(--duration) var(--ease);
}
```

### Step 3 — HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="..." />
  <title>Page Title</title>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
  <script src="js/main.js" defer></script>
</body>
</html>
```

Rules:
- One `<h1>` per page; heading levels never skip
- Use `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>` semantically
- Buttons for actions, links for navigation
- `alt` on images, `aria-label` on icon-only controls

### Step 4 — Section Layout

Standard content section:

```html
<section id="features" aria-labelledby="features-heading">
  <div class="container">
    <header class="section-header">
      <p class="section-label">Category</p>
      <h2 id="features-heading" class="section-title">Title</h2>
      <p class="section-desc">Supporting text.</p>
    </header>
    <div class="grid grid--3">
      <!-- cards -->
    </div>
  </div>
</section>
```

### Step 5 — Responsive & A11y

- Mobile-first: base styles for small screens, `min-width` media queries to enhance
- Default breakpoints: `48rem` (tablet), `64rem` (desktop) — override to match project
- Visible `:focus-visible` on all interactive elements
- Respect `prefers-reduced-motion: reduce`
- Target 4.5:1 contrast for body text, 3:1 for large text

## CSS File Organization

```css
/* 1. Tokens      */  :root { ... }
/* 2. Reset/base  */  *, body, typography
/* 3. Layout      */  .container, .grid, .stack
/* 4. Components  */  .btn, .card, .nav
/* 5. Utilities   */  .sr-only, .text-center (sparingly)
/* 6. Responsive  */  @media queries
```

## Component Quick Reference

| Need | Pattern | Details |
|------|---------|---------|
| Primary CTA | `.btn .btn--primary` | [components.md](components.md#buttons) |
| Card | `.card` | [components.md](components.md#card) |
| Navigation | `.nav` | [components.md](components.md#navigation) |
| Form field | `.field` | [components.md](components.md#forms) |
| Tag/badge | `.tag` | [components.md](components.md#tags) |
| Grid layout | `.grid .grid--N` | [components.md](components.md#grid) |

## Do / Don't

**Do:**
- Use CSS custom properties for every repeated value
- Use `clamp()` for fluid typography and spacing
- Add hover **and** focus-visible states together
- Keep specificity low (single classes, avoid deep nesting)
- Use `gap` in flex/grid instead of margin hacks
- Load fonts with `preconnect` + `display=swap`

**Don't:**
- Hardcode hex values inside component rules (use tokens)
- Use `!important` except for utilities or overrides
- Style with `div` soup when semantic elements exist
- Disable outline without a replacement focus style
- Copy a fixed theme when the project already has one
- Add CSS frameworks unless the user asks

## Theming

Support light/dark by scoping tokens:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #121212;
    --color-text: #f0f0f0;
  }
}
/* Or explicit toggle: */
[data-theme="dark"] { ... }
```

When the user provides brand colors, map them to semantic tokens (`--color-primary`, not `--blue-500` in component CSS).

## Additional Resources

- [tokens-template.md](tokens-template.md) — full token schema and naming conventions
- [components.md](components.md) — HTML/CSS for common UI patterns
- [snippets.md](snippets.md) — starter HTML, CSS reset, layout utilities
