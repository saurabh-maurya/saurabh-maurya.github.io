---
name: portfolio-design-system
description: >-
  Applies the Saurabh Maurya portfolio "Light Blue & Cream" design system —
  cream/blue palette, Space Grotesk + Inter + IBM Plex Mono, card patterns,
  and vanilla CSS tokens. Use when building pages, sections, or components
  that should match saurabh-maurya.github.io styling, or when the user
  mentions portfolio theme, cream-blue design, or this site's look and feel.
---

# Portfolio Design System

Vanilla HTML/CSS design system from saurabh-maurya.github.io. Theme: **Light Blue & Cream** — warm cream backgrounds, deep blue primary, purple secondary accent.

## When to Apply

- New pages, landing sections, or one-off HTML files
- Restyling existing markup to match the portfolio
- Adding sections to this repo (about, projects, contact patterns)

## Required Setup

Every page needs:

1. **Google Fonts** — Space Grotesk, Inter, IBM Plex Mono (see [snippets.md](snippets.md))
2. **Font Awesome 6.5.1** — icons CDN
3. **CSS tokens** — `:root` variables (see [tokens.md](tokens.md) or [snippets.md](snippets.md))

### Inside This Repo

Prefer linking existing assets instead of duplicating:

```html
<link rel="stylesheet" href="css/styles.css" />
<script src="js/main.js"></script>
```

Use `js/main.js` when you need: custom cursor, scroll reveals (`.reveal`), neural canvas hero, typed text, navbar scroll state.

### Outside This Repo

Copy the `:root` block and base styles from [snippets.md](snippets.md). Include grain overlay, typography, and component CSS as needed.

## Workflow

```
Task Progress:
- [ ] Add head boilerplate (fonts, icons, CSS)
- [ ] Apply :root tokens
- [ ] Structure section: .container → .section-header → content grid
- [ ] Pick section background (--bg or --surface, alternate between sections)
- [ ] Use component patterns from components.md
- [ ] Add .reveal classes if scroll animation is needed
- [ ] Verify responsive breakpoints
```

**Step 1 — Layout shell**

```html
<section id="section-id">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-label">label text</div>
      <h2 class="section-title">Section Title</h2>
      <p class="section-subtitle">Optional subtitle.</p>
    </div>
    <!-- content grid or cards -->
  </div>
</section>
```

**Step 2 — Section backgrounds** (alternate for rhythm):

| Pattern | CSS |
|---------|-----|
| Default cream | `background: var(--bg)` |
| Elevated panel | `background: var(--surface); border-top/bottom: 1px solid var(--border)` |

**Step 3 — Cards** — always use `1.5px solid var(--border)`, `border-radius: var(--radius-lg)`, hover accent bar. See [components.md](components.md).

**Step 4 — Responsive** — match existing breakpoints:

| Breakpoint | Typical change |
|------------|----------------|
| `1024px` | 3-col grids → 2-col |
| `860px` | 2-col → 1-col; hide hero visual; mobile nav |
| `600px` | section padding `4rem`; single-column everything |

## Quick Token Reference

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#E6D9C8` | Page background |
| `--surface` | `#F0E8DA` | Cards, elevated sections |
| `--accent` | `#0F3A94` | Primary blue — links, labels, buttons |
| `--accent3` | `#4F36A8` | Purple — gradient endpoints |
| `--text-bright` | `#060E1C` | Headings |
| `--text-muted` | `#5A6A7C` | Secondary text, nav links |
| `--ff-display` | Space Grotesk | h1–h4, card titles |
| `--ff-body` | Inter 300 | Body copy |
| `--ff-mono` | IBM Plex Mono | Labels, tags, nav, buttons |

Full spec: [tokens.md](tokens.md)

## Typography Rules

- **Headings** — `font-family: var(--ff-display)`, `color: var(--text-bright)`, `letter-spacing: -0.02em`
- **Body** — `font-family: var(--ff-body)`, `font-weight: 300`, `line-height: 1.75`
- **Labels** — `.section-label`: mono, `0.72rem`, uppercase, `letter-spacing: 0.28em`, accent color, trailing line
- **Emphasis** — `<strong>` uses `color: var(--accent); font-weight: 700`
- **Gradient text** — `.gradient-text` for hero names and highlight words

## Signature Patterns (Required)

These define the portfolio look — always include when building new UI:

1. **Grain overlay** — `body::after` with SVG fractal noise (see [tokens.md](tokens.md))
2. **Gradient shimmer** — accent → accent3 on `.gradient-text` and card accent bars
3. **Card hover bars** — `::before` or `::after` with `linear-gradient(90deg, var(--accent), var(--accent3))`, `scaleX(0)` → `scaleX(1)` on hover
4. **Hover lift** — `transform: translateY(-3px to -7px)` + `box-shadow: var(--glow-sm)`
5. **Borders** — `1.5px solid var(--border)`, never 1px gray borders
6. **Mono micro-labels** — tags, dates, nav links, button text use `--ff-mono`

## Do / Don't

**Do:**
- Use CSS custom properties for all colors
- Alternate `--bg` / `--surface` section backgrounds
- Use pill badges (`border-radius: 100px`) for status tags and dates
- Add `.reveal` + `main.js` scroll observer for entrance animations
- Use HTML section comment dividers in this repo: `<!-- ===== SECTION ===== -->`

**Don't:**
- Dark themes or pure white/gray palettes
- System fonts only — always load the three Google Font families
- Sharp corners on cards (minimum `--radius`)
- Bootstrap/Material default styling
- Heavy box shadows without blue tint

## Component Index

| Component | Class | Reference |
|-----------|-------|-----------|
| Primary button | `.btn.btn-primary` | [components.md](components.md#buttons) |
| Secondary button | `.btn.btn-secondary` | [components.md](components.md#buttons) |
| Stat card | `.stat-card` | [components.md](components.md#stat-card) |
| Skill group | `.skill-group` | [components.md](components.md#skill-group) |
| Project card | `.project-card` | [components.md](components.md#project-card) |
| Experience card | `.exp-card` | [components.md](components.md#experience-card) |
| Timeline | `.timeline` | [components.md](components.md#timeline) |
| Contact link | `.contact-link` | [components.md](components.md#contact-link) |
| Hero tag | `.hero-tag` | [components.md](components.md#hero) |
| Nav | `#navbar` | [components.md](components.md#navigation) |

## Additional Resources

- [tokens.md](tokens.md) — full color palette, spacing, animations, hero gradients
- [components.md](components.md) — HTML structure and CSS per component
- [snippets.md](snippets.md) — copy-paste boilerplate blocks
