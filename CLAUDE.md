# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page static marketing website for The Third Sourcers — a software studio and remote-staffing company based in Lalitpur, Nepal that builds web, mobile and SaaS products and provides dedicated engineering teams. One page: `index.html`. No framework, no package manager, no build step.

This site was rebuilt from a high-fidelity design handoff. The design source lives in `~/Downloads/design_handoff_third_sourcers_site/` (prototype HTML/CSS/JS) and `README.md` there documents every token, section, and interaction in detail — consult it before making structural changes.

## Architecture

- `index.html` — full page markup. One continuously-scrolling page: header/nav, hero, capabilities marquee, services, process, tech stack, portfolio, why-us/stats, engagement models, contact, CTA band, footer.
- `styles.css` — complete hand-written stylesheet (plain CSS, edited directly — there is **no** SCSS/build step anymore). Imports Google Fonts at the top and defines all design tokens as CSS custom properties in `:root`.
- `main.js` — vanilla JS (~40 lines): sticky-header-on-scroll, mobile menu open/close, IntersectionObserver reveal-on-scroll, footer year injection.
- `assets/` — logo SVGs: `logo-mark.svg` / `logo-mark-white.svg` (knot mark, used in lockups paired with HTML text) and `logo.svg` / `logo-white.svg` (full logo). Violet gradient `#492CD4 → #462CBD`.
- `images/` — product screenshots: `snapmycv.webp` (used in the hero glass-card AND the SnapMyCV portfolio case) and `shakyadynasty.webp` (Shakya Dynasty portfolio case). Regenerate by screenshotting the live sites and converting with `cwebp`.
- Favicons (`favicon.ico`, `Favicon.svg`, `Favicon-white.svg`) at the repo root.

## Design tokens

All tokens are CSS custom properties in `styles.css` `:root`. Naming: warm neutrals (`--bg`, `--bg-warm`, `--bg-lilac`, `--paper`), ink (`--ink`, `--ink-soft`, `--ink-faint`), brand violet (`--violet` `#492CD4`, `--violet-2`, `--violet-deep`, `--on-violet`), warm terracotta accent (`--terra`, `--terra-2`, `--terra-tint`), plus radii (`--r-sm`/`--r`/`--r-lg`/`--r-xl`), shadows (`--shadow-sm/md/lg`), and layout (`--maxw: 1200px`, `--pad`). Never hardcode color values in section rules — use the custom properties.

Fonts (Google Fonts CDN, imported at the top of `styles.css`):
- `--sans` → **Hanken Grotesk** (UI, body, most headings)
- `--serif` → **Instrument Serif** (italic emphasis words only, via `.serif-em`)

## Conventions

- Section backgrounds: light sections use `--bg`/`--bg-warm`; the Process and Engagement sections plus the footer are dark (`--violet-deep`) and recolor eyebrows/ticks to terracotta.
- Reveal-on-scroll: add `.reveal` (and optional `.d1`–`.d4` stagger) to any element; `main.js` adds `.in` when it intersects. Disabled under `prefers-reduced-motion`.
- Product screenshots fill the design's image slots via the `.shot` class (`object-fit: cover`); `.glass-card .shot` and `.case-frame .shot` set the aspect ratios.
- Contact CTAs are `mailto:`/`tel:` links — there is no contact form and no backend.

## Responsive breakpoints

1020px (grids → 2 cols), 860px (nav → hamburger checkbox-free JS menu, hero/why/case → single column, hero visual hidden), 560px (all grids → 1 col, body 17px, header CTA/subtitle hidden), 400px (stat cards → 1 col, smaller display/menu).
