# Saurabh Maurya — AI, Web & App Technology Consulting

A premium, brutalist + modern digital marketing site for Saurabh Maurya's technology
consulting practice offering AI, web, and mobile app consulting and development. Built
with plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no build step.

> Search the codebase for `TODO` to swap in the real contact email, social links,
> testimonials, and client logos before going live.

## Structure

```text
index.html            Single-page site (semantic sections)
css/
  style.css           Design tokens, layout, components (light + dark)
  animations.css      Reveal states, marquee, reduced-motion overrides
js/
  main.js             Nav, mobile menu, theme toggle, reveals, counters, step tracking
  animations.js       Canvas visuals: hero network, signature orb, bento accent
  interactions.js     Pointer tracking + magnetic buttons
```

## Design

- **Language:** Brutalist + modern digital. Sharp containers, thin borders,
  oversized display type, asymmetric editorial layouts, high-contrast sections.
- **Type:** Space Grotesk (display), Space Mono (labels/numbers), Inter Tight (body).
- **Color:** Neutral paper/ink base with a single electric-blue accent. Light default,
  dark via `prefers-color-scheme`, plus a manual toggle (persisted in `localStorage`).
- **Motion:** IntersectionObserver scroll reveals, `requestAnimationFrame` canvas
  morphing visuals, magnetic buttons. All motion collapses under
  `prefers-reduced-motion: reduce`.

## Accessibility & performance

- Semantic HTML, skip link, keyboard-navigable, visible focus states.
- Canvas loops pause when offscreen or when the tab is hidden.
- Only `transform` / `opacity` are animated. No scroll-jank listeners drive animation.
- Fonts load with `display: swap`.

## Editing

- **Brand:** the site is branded "Saurabh Maurya" (nav, hero, footer, `<title>`, meta).
- **Contact:** replace the `mailto:hello@saurabhmaurya.com` placeholders and footer links.
- **Accent color:** change `--accent` in `css/style.css` (light and dark blocks).
- **Metrics** in the Work section are marked "Illustrative outcomes." Replace with real data.

## Running

It is a static site. Open `index.html`, or serve locally:

```bash
python3 -m http.server 8000
```
