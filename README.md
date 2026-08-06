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
7. [Deployment (GitHub Pages)](#deployment-github-pages)
8. [Brand Manual](#brand-manual)

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
    │   ├── corporate-office.jpg     # Hero / about imagery (raster)
    │   ├── corporate-office.webp    # WebP counterpart
    │   ├── financial-security.jpg   # Secondary imagery (raster)
    │   └── financial-security.webp  # WebP counterpart
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

## Deployment (GitHub Pages)

The project is designed to deploy as-is to GitHub Pages.

1. Push the repository to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` (or your default branch) — **root** (`/`)
4. Save. GitHub Pages will publish the site at `https://<org-or-user>.github.io/<repo-name>/` within a minute or two.

No workflow file is required. Because every path in the HTML/CSS is relative (`assets/…`), the site works whether it's served from a domain root or a project sub-path.

**Custom domain (optional):** add a `CNAME` file at the repository root containing the domain, then configure a DNS `CNAME` record pointing at `<org-or-user>.github.io`.

---

## Brand Manual

The authoritative source for logo usage rules, minimum sizes, clear space, approved color combinations, and tone of voice is the **CounterAct Consult Brand Manual**. When it becomes available, link it here:

> Brand Manual: *link to be added once the official manual is published.*

Until then, refer to the color, typography, and asset conventions documented in this README and encoded in `styles.css`.

---

## License

© CounterAct Consult Limited. All rights reserved. Brand assets, logos, and copy are proprietary. Do not redistribute without permission.
