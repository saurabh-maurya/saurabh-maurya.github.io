# Design Tokens — Light Blue & Cream

Source of truth: `css/styles.css` `:root` block.

## CSS Custom Properties

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

## Color Usage Map

| Token | Hex / Value | Role |
|-------|-------------|------|
| `--bg` | `#E6D9C8` | Page background, skills/projects/contact sections |
| `--surface` | `#F0E8DA` | Cards, about/experience/education sections, nav scrolled bg base |
| `--surface2` | `#D9CCBA` | Tag backgrounds, about links, nested surfaces |
| `--surface3` | `#CCC0AC` | Deepest surface tier (reserved) |
| `--accent` | `#0F3A94` | Primary blue — buttons, labels, links, strong text |
| `--accent-dim` | `rgba(15,58,148,0.65)` | Muted tag text |
| `--accent2` | `#B84220` | Rust accent — stat highlights only |
| `--accent3` | `#4F36A8` | Purple — gradient endpoints, orbit rings |
| `--text` | `#1E2D44` | Body copy |
| `--text-bright` | `#060E1C` | Headings, card titles |
| `--text-muted` | `#5A6A7C` | Secondary text, nav links, labels |

### Accent Tints (inline rgba patterns)

Used throughout for subtle fills and borders:

| Pattern | Value | Use |
|---------|-------|-----|
| Accent fill light | `rgba(15,58,148,0.04–0.09)` | Button secondary bg, hover states |
| Accent fill medium | `rgba(15,58,148,0.07)` | Date pills, icon backgrounds |
| Accent border light | `rgba(15,58,148,0.14–0.22)` | Tags, chips, hero tag border |
| Accent border medium | `rgba(15,58,148,0.28–0.38)` | Secondary buttons, nav CTA |
| Purple tint | `rgba(79,54,168,0.04–0.14)` | Hero overlay, orbit rings |
| Status green | `#22c55e` | Hero tag pulse dot only |

### Button Hover Overrides

| State | Value |
|-------|-------|
| Primary hover bg | `#1558B8` |
| Primary shadow | `0 8px 30px rgba(15,58,148,0.35)` |
| Nav scrolled bg | `rgba(230, 217, 200, 0.94)` |

## Typography

### Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
```

### Font Assignment

| Role | Family | Weight | Size examples |
|------|--------|--------|---------------|
| Display headings | Space Grotesk | 600–800 | Hero: `clamp(3.8rem, 8.5vw, 6.8rem)`; Section: `clamp(2rem, 4vw, 2.8rem)` |
| Body | Inter | 300 (default) | `16px`, line-height `1.75` |
| Labels / UI | IBM Plex Mono | 400–600 | Section label `0.72rem`; nav `0.78rem`; tags `0.68–0.73rem` |

### Heading Defaults

```css
h1, h2, h3, h4 {
  font-family: var(--ff-display);
  color: var(--text-bright);
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

### Section Label

```css
.section-label {
  font-family: var(--ff-mono);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
}
/* ::after — 48px × 1px accent line, opacity 0.4 */
```

## Spacing & Layout

| Token / Rule | Value |
|--------------|-------|
| Container max-width | `1160px` |
| Container padding | `0 1.5rem` |
| Section padding | `6rem 0` (mobile: `4rem 0`) |
| Section header margin-bottom | `3rem` |
| Grid gap (cards) | `1.25rem` |
| Grid gap (about/contact) | `5rem` |
| Border width | `1.5px` (standard), `2.5px` (timeline dot) |

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius` | `8px` | Buttons, social links, contact links, small icons |
| `--radius-lg` | `16px` | Cards, stat cards, skill groups |
| Pill | `100px` | Hero tag, date badges, tech chips, edu year |
| Small tag | `4–6px` | Exp tags, skill tags |

## Shadows & Glows

| Token | Value |
|-------|-------|
| `--glow-sm` | `0 4px 22px rgba(15, 58, 148, 0.15)` |
| `--glow-md` | `0 8px 44px rgba(15, 58, 148, 0.22)` |
| Card default | `0 2px 12px rgba(15,58,148,0.04–0.05)` |
| Card hover | `0 8px 28px rgba(15,58,148,0.10–0.12)` |
| Project card hover | `0 16px 50px rgba(15,58,148,0.12), 0 4px 16px rgba(15,58,148,0.07)` |
| Cursor dot | `0 0 10px rgba(15,58,148,0.5), 0 0 20px rgba(15,58,148,0.3)` |

## Motion

| Token | Value |
|-------|-------|
| `--ease` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--t` | `all 0.3s var(--ease)` |
| Reveal transition | `opacity 0.7s`, `transform 0.7s` |
| Accent bar transition | `transform 0.4s var(--ease)` |
| Hover lift | `translateY(-2px)` buttons, `(-3px)` skill groups, `(-5px)` stat/edu, `(-7px)` projects |

### Keyframes

```css
@keyframes shimmerText {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.5; transform: scale(0.75); }
}

@keyframes blink {
  0%,100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes chipFloat {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-7px); }
}

@keyframes spin {
  from { transform: rotate(0); }
  to   { transform: rotate(360deg); }
}

@keyframes scrollPulse {
  0%   { transform: scaleY(0); transform-origin: top; }
  50%  { transform: scaleY(1); transform-origin: top; }
  51%  { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

@keyframes rotateSlow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(130deg, var(--accent) 0%, var(--accent3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: shimmerText 4s linear infinite;
}
```

## Base Styles

### Grain Overlay

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9000;
  opacity: 0.3;
}
```

### Body

```css
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--ff-body);
  font-size: 16px;
  font-weight: 300;
  line-height: 1.75;
  overflow-x: hidden;
}

strong { color: var(--accent); font-weight: 700; }
```

## Hero-Specific Tokens

### Hero Background Gradient

```css
#hero {
  background: linear-gradient(145deg, #E0D3C0 0%, #D8E4F6 50%, #E0D3C0 100%);
}
```

### Hero Overlay Radials

```css
.hero-overlay {
  background:
    radial-gradient(ellipse 70% 55% at 30% 50%, rgba(15,58,148,0.04) 0%, transparent 65%),
    radial-gradient(ellipse 50% 50% at 80% 70%, rgba(79,54,168,0.04) 0%, transparent 60%);
}
```

### Dot Grid Pattern

```css
#hero::before {
  background-image: radial-gradient(circle, rgba(15,58,148,0.09) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%);
}
```

### Neural Canvas Colors

- Node fill: `rgba(15,58,148, opacity)` where opacity is `0.15–0.60`
- Edge stroke: `rgba(15,58,148, alpha)` where alpha scales with distance

## Scroll Reveal

```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Requires `js/main.js` IntersectionObserver. Stagger with inline `style="transition-delay:0.1s"`.

## Responsive Breakpoints

| Max-width | Changes |
|-----------|---------|
| `1024px` | Skills/projects grids: 3 → 2 columns |
| `860px` | Hero visual hidden; about/contact 1-col; mobile nav toggle |
| `600px` | All grids 1-col; section padding reduced; footer stacked |
