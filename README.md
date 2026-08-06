# CounterAct Consult — AML/CFT Landing Page

A single-page marketing site for **CounterAct Consult Limited**, a specialist Anti-Money-Laundering (AML) and Counter-Financing-of-Terrorism (CFT) consultancy. Built as a static HTML/CSS/JavaScript project so it deploys anywhere — including GitHub Pages — with no build step.

> **Tagline:** *Compliance is our priority. Trust is our promise.*

---

## Table of Contents

1. [About](#about)
2. [Brand Overview](#brand-overview)
3. [Brand Colors](#brand-colors)
4. [Typography](#typography)
5. [Project Structure](#project-structure)
6. [Local Development](#local-development)
7. [Performance Optimization](#performance-optimization)
8. [Lighthouse Scores](#lighthouse-scores)
9. [Deployment (GitHub Pages)](#deployment-github-pages)
10. [Testing](#testing)
11. [Future Enhancements](#future-enhancements)
12. [Brand Manual](#brand-manual)

---

## About

This repository contains the source for CounterAct Consult's public-facing landing page. Its purpose is to:

- Communicate the firm's positioning as a trusted AML/CFT partner.
- Present service offerings (risk assessments, regulatory advisory, monitoring, training).
- Build trust with potential clients through clear, professional design.
- Offer a clear call-to-action for prospective clients to book a consultation.
- Demonstrate visual and tonal consistency with CounterAct Consult's brand identity.

The site is intentionally lightweight: pure HTML, CSS, and JavaScript with SVG-based iconography. No build tooling, package manager, or runtime dependencies are required to run it locally.

---

## Brand Overview

CounterAct Consult occupies a serious, technical corner of the professional-services market. The brand voice is confident, precise, and reassuring — never alarmist. Visual identity leans on a pixel-aesthetic pattern language that references digital-forensics and monitoring imagery, balanced by clean typography and generous whitespace.

**Brand promise:** *Compliance is our priority. Trust is our promise.*

Every asset in this project — colors, type, iconography, logo usage — is derived from the official CounterAct Consult brand manual.

---

## Brand Colors

| Role         | Name          | Hex        | Usage                                                       |
|--------------|---------------|------------|-------------------------------------------------------------|
| Primary      | Primary Blue  | `#2C3EF8`  | Primary logo, CTAs, links, key accents                      |
| Secondary    | Light Blue    | `#ABB2FC`  | Supporting accents, subtle backgrounds, hover states        |
| Neutral      | Off-White     | `#F7F7FF`  | Page background, section fills                              |
| Highlight    | Bright Green  | `#00FD00`  | Focus states, positive indicators, sparingly used accent    |
| Depth        | Dark Purple   | `#1A0B68`  | Header/footer backgrounds, dark surfaces                    |
| Text         | Black         | `#131313`  | Primary body copy                                           |
| Surface      | White         | `#FFFFFF`  | Cards, elevated surfaces                                    |

The palette is used with strong contrast: Primary Blue on Off-White for light surfaces, White or Light Blue on Dark Purple for dark surfaces.

---

## Typography

The site uses two Google Fonts, both loaded via `<link>` from `fonts.googleapis.com`:

- **Saira Condensed** — display face for headings and the wordmark. Weights: 500 (Medium), 700 (Bold).
- **Exo 2** — body face for paragraphs, lists, buttons, and UI copy. Weights: 400 (Regular), 500 (Medium), 600 (SemiBold).

Suggested embed:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600&family=Saira+Condensed:wght@500;700&display=swap"
  rel="stylesheet">
```

---

## Project Structure

```
.
├── index.html               # Single-page entry point
├── styles.css               # All styles (brand tokens, layout, components)
├── scripts.js               # Progressive-enhancement JavaScript
├── README.md                # This file
├── .gitignore               # OS, editor, and build-artifact excludes
└── assets/
    ├── logos/
    │   ├── primary-logo.svg # Full CounterAct Consult wordmark
    │   └── icon.svg         # Compact icon/symbol version
    ├── images/
    │   ├── favicon.png              # 60x60 browser tab icon
    │   ├── corporate-office.jpg     # Hero / about imagery (raster fallback)
    │   ├── corporate-office.webp    # WebP optimized counterpart
    │   ├── financial-security.jpg   # Secondary imagery (raster fallback)
    │   └── financial-security.webp  # WebP optimized counterpart
    └── icons/
        ├── security.svg     # Pixel-aesthetic icon — security services
        ├── lock.svg         # Pixel-aesthetic icon — compliance / protection
        ├── firewall.svg     # Pixel-aesthetic icon — fraud prevention
        ├── caution.svg      # Pixel-aesthetic icon — risk detection
        └── info.svg         # Pixel-aesthetic icon — information / guidance
```

Directory conventions:

- `assets/logos/` — brand marks only. Do not put decorative icons here.
- `assets/images/` — raster photography and the favicon.
- `assets/icons/` — pixel-aesthetic 40×40 grid SVG icons used across service sections.

---

## Local Development

No build step, no dependencies. To run the site locally:

**Option 1 — Open directly in a browser**

Double-click `index.html`, or from the project root run:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows (PowerShell)
start index.html
```

**Option 2 — Serve over HTTP (recommended, for correct font/CORS behavior)**

Any lightweight static server works. For example:

```bash
# Python 3 (bundled on most systems)
python3 -m http.server 8000

# Node (if you have it)
npx --yes http-server -p 8000
```

Then open <http://localhost:8000> in your browser.

---

## Performance Optimization

The site is engineered for a sub-3-second load time and strong Core Web Vitals. Key techniques in use:

- **Image optimization to WebP** — photographic assets are shipped as WebP (`corporate-office.webp`, `financial-security.webp`) at quality 80–90. Each asset is kept under 200 KB. `<picture>` with a WebP `<source>` and a JPG `<img>` fallback keeps older browsers supported.
- **Lazy loading** — below-the-fold images use `loading="lazy"` and `decoding="async"` so they never block the initial paint. The hero/LCP image is never lazy-loaded.
- **CSS best practices** — a single stylesheet, semantic tokens via CSS custom properties, no dead selectors, `will-change` restricted to genuinely animated properties, `prefers-reduced-motion` respected globally.
- **Minified CSS (production)** — for production deployments the CSS should be minified. A quick option:

  ```bash
  npx --yes clean-css-cli styles.css -o styles.min.css
  ```

  Then reference `styles.min.css` from `index.html` in production.
- **Preconnect to font origins** — `fonts.googleapis.com` and `fonts.gstatic.com` are preconnected in the `<head>` to shorten font-fetch handshakes.
- **Deferred JavaScript** — `scripts.js` is loaded with the `defer` attribute so it never blocks parsing.
- **Explicit width/height on images** — prevents Cumulative Layout Shift (CLS).

---

## Lighthouse Scores

Target scores (production build, mobile emulation, Lighthouse 12+):

| Category         | Target | Notes                                                              |
|------------------|--------|--------------------------------------------------------------------|
| Performance      | 90+    | LCP < 2.5s, CLS < 0.1, TBT < 200ms                                 |
| Accessibility    | 90+    | Semantic landmarks, contrast, focus states, ARIA where needed      |
| Best Practices   | 90+    | HTTPS, no console errors, images served with correct aspect ratio  |
| SEO              | 90+    | Meta description, canonical, Open Graph, mobile-friendly viewport  |

Re-run before every deploy — regressions here are the fastest signal that a change broke performance or accessibility.

---

## Deployment (GitHub Pages)

The project is designed to deploy as-is to GitHub Pages.

1. Push the repository to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` (or your default branch) — **root** (`/`)
4. Save. GitHub Pages will publish the site at `https://<org-or-user>.github.io/<repo-name>/` within a minute or two.

No workflow file is required. Because every path in the HTML/CSS is relative (`assets/…`), the site works whether it's served from a domain root or a project sub-path.

**Live site URL:** *link to be added once the production deploy is confirmed.*

**Custom domain (optional):** add a `CNAME` file at the repository root containing the domain, then configure a DNS `CNAME` record pointing at `<org-or-user>.github.io`.

---

## Testing

**Run a Lighthouse audit locally**

```bash
# Chrome DevTools → Lighthouse tab → Analyze page load
# Or via CLI:
npx --yes lighthouse http://localhost:8000 --view --preset=desktop
npx --yes lighthouse http://localhost:8000 --view    # mobile default
```

**Cross-browser testing**

- Chromium (Chrome, Edge, Brave) — primary target.
- Firefox — verify SVG rendering, focus outlines, and font fallback.
- Safari (macOS and iOS) — verify sticky header, `backdrop-filter` fallback, form field styling.
- Test at 320 px, 375 px, 768 px, 1024 px, and 1440 px widths at minimum.

**Manual accessibility checks**

- Keyboard: tab through the page — every interactive element must be reachable and show a visible focus ring.
- Screen reader: run VoiceOver (macOS) or NVDA (Windows) through the hero, services, and contact form.
- Color contrast: confirm with the browser DevTools contrast checker on any text over an image or coloured surface.

---

## Future Enhancements

Ideas for follow-up iterations, roughly in priority order:

- **Analytics** — privacy-respecting analytics (Plausible, Fathom, or self-hosted Umami) to measure conversion on the "Book a consultation" CTA.
- **A/B testing** — headline and CTA variants for the hero section to optimise consultation bookings.
- **Additional content** — a Resources / Insights section with short articles on regulatory updates, examination readiness, and sanctions-screening tuning.
- **Case studies** — anonymised engagement summaries that reinforce operator-led positioning without breaching client confidentiality.
- **Multilingual support** — French and Arabic variants for regulated-market audiences outside the UK/EU.
- **Contact form backend hardening** — move from a third-party form provider to a serverless handler with reCAPTCHA and audit logging.
- **Dark-mode variant** — leveraging `prefers-color-scheme` and the existing Dark Purple palette.
- **Structured data (JSON-LD)** — `Organization` schema for richer SEO.

---

## Brand Manual

The authoritative source for logo usage rules, minimum sizes, clear space, approved color combinations, and tone of voice is the **CounterAct Consult Brand Manual**. When it becomes available, link it here:

> Brand Manual: *link to be added once the official manual is published.*

Until then, refer to the color, typography, and asset conventions documented in this README and encoded in `styles.css`.

---

## License

© CounterAct Consult Limited. All rights reserved. Brand assets, logos, and copy are proprietary. Do not redistribute without permission.
