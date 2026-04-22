# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing website for The Third Sourcers — a remote staffing and product development company based in Nepal. Three pages: `index.html`, `about.html`, `co-working-space.html`. No framework, no package manager.

## Compiling SCSS

The site uses SCSS compiled to `styles/styles.css`. There is no build script — compile manually:

```bash
# One-time compile
sass styles/styles.scss styles/styles.css

# Watch mode during development
sass styles/styles.scss styles/styles.css --watch
```

Always commit the compiled `styles/styles.css` alongside any SCSS changes.

## SCSS architecture

`styles/styles.scss` is the entry point that `@use`s four layers in order:

| Layer | Path | Purpose |
|-------|------|---------|
| `base` | `styles/base/` | Reset, font-face declarations, element defaults, dark mode |
| `components` | `styles/components/` | Navigation, button styles |
| `utilities` | `styles/utilities/` | Utility classes (`d-flex`, `d-grid`, `text-*`, etc.) |
| `layout` | `styles/layout/` | Per-section styles (hero, header, tech, about, coworking) |

The `abstract/` folder (`_colors.scss`, `_typography.scss`, `_mixins.scss`) holds design tokens only — it is `@use`d by other partials but never directly in `styles.scss`.

## Design tokens

Colors are defined as a nested SCSS map `$colorSchemes` in `styles/abstract/_colors.scss` and compiled to CSS custom properties in `styles/base/_root.scss` via `@each`. The resulting property naming pattern is `--clr-{scheme}{weight}` (e.g. `--clr-primary700`, `--clr-accent400`).

Dark mode swaps a subset of root variables under `@media (prefers-color-scheme: dark)` — do not hardcode color values in layout/component files; use the CSS custom properties.

Fonts:
- `--systemFont` → PT Sans (body text)
- `--headerFont` → K2D (all `h1`–`h6` elements)

Both are self-hosted under `fonts/` as `.woff` + `.woff2` pairs.

## Tech marquee animation

The scrolling tech-stack rows on `index.html` use a CSS-only trick: all `<li>` items inside `.tech-lists` share `grid-area: 1/1` so they overlap in one cell, then each item is offset with a calculated `animation-delay` and loops through `translateX`. `data-row="1|2|3"` selects the animation keyframe and direction. Item counts are hardcoded in `_tech.scss` as `$firstRow`, `$secondRow`, `$thirdRow` — update these variables if the number of `<li>` items in that row changes.

## Mobile navigation

The hamburger menu is a pure-CSS checkbox hack — `<input type="checkbox" id="toggle-menu-checkbox">` toggled by a `<label>` and styled in `styles/components/_navigation.scss`. No JavaScript is involved.
