# Design Token Template

Copy and fill in per project. Use semantic names in components; store brand values only in `:root`.

## Color Tokens

```css
:root {
  /* Backgrounds */
  --color-bg:           #ffffff;
  --color-surface:      #f8f9fa;
  --color-surface-raised: #ffffff;

  /* Text */
  --color-text:         #1a1a2e;
  --color-text-muted:   #6b7280;
  --color-text-inverse: #ffffff;

  /* Brand / interactive */
  --color-primary:      #2563eb;
  --color-primary-hover:#1d4ed8;
  --color-secondary:    #7c3aed;
  --color-accent:       #f59e0b;

  /* Feedback */
  --color-success:      #16a34a;
  --color-warning:      #d97706;
  --color-error:        #dc2626;

  /* Borders & overlays */
  --color-border:       rgba(0, 0, 0, 0.12);
  --color-border-strong:rgba(0, 0, 0, 0.24);
  --color-overlay:      rgba(0, 0, 0, 0.5);

  /* Focus */
  --color-focus-ring:   var(--color-primary);
}
```

### Color Rules

| Rule | Example |
|------|---------|
| Components reference semantic tokens | `color: var(--color-text)` |
| Hover = dedicated token or `color-mix()` | `--color-primary-hover` |
| Borders use alpha for theme flexibility | `rgba(0,0,0,0.12)` or `color-mix(in srgb, var(--color-text) 12%, transparent)` |
| Never use raw hex in `.card`, `.btn`, etc. | Always `var(--color-*)` |

## Typography Tokens

```css
:root {
  --font-body:    system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-heading: var(--font-body);
  --font-mono:    ui-monospace, 'Cascadia Code', monospace;

  /* Fluid scale — adjust min/max per project */
  --text-xs:   clamp(0.7rem,  0.65rem + 0.25vw, 0.75rem);
  --text-sm:   clamp(0.8rem,  0.75rem + 0.25vw, 0.875rem);
  --text-base: clamp(0.95rem, 0.9rem  + 0.25vw, 1rem);
  --text-lg:   clamp(1.05rem, 1rem   + 0.35vw, 1.25rem);
  --text-xl:   clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);
  --text-2xl:  clamp(1.5rem,  1.2rem + 1.5vw,  2.25rem);
  --text-3xl:  clamp(2rem,    1.5rem + 2.5vw,  3rem);

  --leading-tight:  1.2;
  --leading-normal: 1.6;
  --leading-loose:  1.8;

  --weight-normal:  400;
  --weight-medium:  500;
  --weight-semibold:600;
  --weight-bold:    700;
}
```

### Typography Assignment

| Element | Font | Size | Weight |
|---------|------|------|--------|
| `body` | `--font-body` | `--text-base` | `--weight-normal` |
| `h1` | `--font-heading` | `--text-3xl` | `--weight-bold` |
| `h2` | `--font-heading` | `--text-2xl` | `--weight-bold` |
| `h3` | `--font-heading` | `--text-xl` | `--weight-semibold` |
| Labels/captions | `--font-mono` or `--font-body` | `--text-xs` / `--text-sm` | `--weight-medium` |

## Spacing Tokens

```css
:root {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.5rem;    /* 24px */
  --space-6:  2rem;      /* 32px */
  --space-8:  3rem;      /* 48px */
  --space-10: 4rem;      /* 64px */
  --space-12: 6rem;      /* 96px */

  --section-padding: var(--space-12) 0;
  --container-padding: 0 var(--space-5);
  --container-max: 72rem;
  --grid-gap: var(--space-5);
}
```

## Shape & Elevation

```css
:root {
  --radius-sm:  4px;
  --radius:     8px;
  --radius-lg:  16px;
  --radius-full:9999px;

  --shadow-sm:  0 1px 3px rgba(0,0,0,0.08);
  --shadow:     0 4px 12px rgba(0,0,0,0.10);
  --shadow-lg:  0 12px 40px rgba(0,0,0,0.12);

  --border-width: 1px;
  --border: var(--border-width) solid var(--color-border);
}
```

## Motion Tokens

```css
:root {
  --ease:       cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:    cubic-bezier(0.4, 0, 1, 1);
  --ease-out:   cubic-bezier(0, 0, 0.2, 1);
  --duration-fast: 0.15s;
  --duration:      0.25s;
  --duration-slow: 0.4s;
  --transition: var(--duration) var(--ease);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Breakpoint Tokens

Use consistent breakpoints via custom media or documented values:

| Name | Value | Typical use |
|------|-------|-------------|
| `sm` | `30rem` (480px) | Large phones |
| `md` | `48rem` (768px) | Tablets |
| `lg` | `64rem` (1024px) | Desktop |
| `xl` | `80rem` (1280px) | Wide desktop |

```css
/* Mobile-first pattern */
.grid { grid-template-columns: 1fr; }
@media (min-width: 48rem) {
  .grid--2 { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 64rem) {
  .grid--3 { grid-template-columns: repeat(3, 1fr); }
}
```

## Z-Index Scale

```css
:root {
  --z-base:     0;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-overlay:  300;
  --z-modal:    400;
  --z-toast:    500;
}
```

## Mapping Brand Input

When the user gives brand guidelines, map to tokens:

| User says | Token |
|-----------|-------|
| "Primary blue #2563eb" | `--color-primary` |
| "Background cream" | `--color-bg` |
| "Muted gray text" | `--color-text-muted` |
| "16px rounded corners" | `--radius` |
| "Inter for body" | `--font-body` |

Keep brand hex values **only** in `:root`. Components use semantic names so retheming means editing one block.
