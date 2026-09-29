# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page static marketing website for **Third Sourcers** (legal name: Third Sourcers Private Limited / थर्ड सोर्सर्स प्राइभेट लिमिटेड, Reg. No. 401634/83/84, PAN 624715513) — a software studio and remote-staffing company based in Lalitpur, Nepal that builds web, mobile and SaaS products and provides dedicated engineering teams. The brand was renamed from "The Third Sourcers" — never use "The" in copy. Main page: `index.html`. No framework, no package manager, no build step.

The Sep 2026 redesign follows a flat-illustration SaaS template style (violet wavy hero, coral CTAs, navy bands, white cards). The signature section is **"Every product has three parties"** (`#three`): client → end user → Third Sourcers, tied to the logo's three orbits — keep that story central.

## Architecture

- `index.html` — one scrolling page: top bar, sticky header, hero (wave), three parties, services (8 cards), navy achievement band, process (sprint-board mock + accordion), tech stack tiles, work (a plain row of product logos — grayscale until hover, then colour + one-line caption; white monochrome in dark mode), engagement plans, FAQ accordion + CTA strip, navy contact, footer (with legal/registration details).
- `styles.css` — hand-written plain CSS (no build). Imports DM Sans + Noto Sans Devanagari from Google Fonts; all tokens in `:root`, dark-mode overrides under `[data-theme="dark"]`.
- `main.js` — theme toggle, sticky header, mobile menu, `[data-acc]` accordions (one open at a time), back-to-top, reveal-on-scroll, footer year.
- `assets/` — `logo.svg` / `logo-white.svg` (full lockup incl. "THIRD SOURCERS PVT. LTD."), `logo-mark.svg` / `logo-mark-white.svg` (three-orbit mark only, cropped viewBox). `images/logo.svg` is a copy used as a CSS mask by the secondary pages.
- `images/illustrations/*.webp` — flat illustrations generated with Gemini (Nano Banana) in the brand palette, white background removed (flood-fill + trim) and exported with `cwebp`. `hero`, `three`, `launch`, `inspect`, `support` are used; `laptop` is spare.
- `images/products/` — product logos for the work marquee (`snapmycv.svg` from snapmycv.com, `shakyadynasty.webp` from shakyadynasty.com, `jeweloop.svg` from jeweloop.com; the gold Shakya logo sits on its brand red). To add a product, add an `a.plogo` inside `.logo-row`. `images/snapmycv.webp` / `shakyadynasty.webp` screenshots are no longer used.
- Secondary pages `about.html`, `why-hire-in-nepal.html` still use the OLD design via `styles/styles.css` (compiled from `styles/layout/*.scss`).
- Favicons (`favicon.ico`, `Favicon.svg`, `Favicon-white.svg`) at the repo root are generated from the mark.

## Design tokens

Surfaces `--bg`, `--bg-soft`, `--bg-cream`, `--bg-lilac`, `--bg-slate`, `--paper`; ink `--ink` (navy), `--ink-soft`, `--ink-faint`; brand `--violet` `#492CD4`, `--violet-2/3`, `--violet-hero`, `--navy` `#1F2255`; accents `--coral` `#FF7A50` (primary CTA), `--sun` `#FFB400` (underline `.u-sun`, badges); radii `--r-sm/--r/--r-lg/--r-xl`; shadows `--shadow-sm/md/lg`; `--maxw: 1200px`, `--pad`. Never hardcode colors in section rules — use tokens.

Headings follow the pattern light first line + `<b>` bold second line (`.h2 b`).

## Conventions

- Reveal-on-scroll: add `.reveal` (+ optional `.d1`–`.d4`); disabled under `prefers-reduced-motion`.
- Motion (all in the `/* ---------- motion ---------- */` block of `styles.css`, all switched off under `prefers-reduced-motion`): top scroll-progress bar, `data-parallax="<factor>"` on illustrations (JS sets `--py`, CSS uses the `translate` property so it never fights `transform` animations), `.u-sun` underline draws in when its `.reveal` parent gets `.in`, `data-count` stats count up, sprint-board tickets/bars stagger in, slow orbit spin on the mark, bobbing tech tiles, coral-button sheen. Headless Chrome on this machine reports reduced motion ON — emulate `no-preference` when testing animations.
- Contact CTAs are `mailto:`/`tel:` links — no form, no backend.
- Tech logos come from the devicon CDN (`cdn.jsdelivr.net/gh/devicons/devicon`).

## Responsive breakpoints

1020px (services → 2 cols, footer reflow), 860px (hamburger menu, all split grids → 1 col, stack illustration hidden, plans stacked), 560px (1-col cards, 3-col tiles, smaller brand), 400px (smaller display, stats stacked).
