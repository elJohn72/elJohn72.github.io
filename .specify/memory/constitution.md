# elJohn72 Portfolio Constitution

## Core Principles

### I. Accessibility First
WCAG 2.1 AA: sufficient contrast, keyboard navigation, semantic HTML, `lang` attribute per locale (`es`, `en`). Agent MUST consult `web-design-guidelines` and `accessibility` skills when reviewing UI.

### II. Dark Mode Only
The site uses a single dark theme (`color-scheme: dark`). No light mode toggle — assets and photography are optimized for dark backgrounds.

### III. Bilingual by URL
Explicit locales at `/es/` and `/en/`. No mixed-language pages. Locale switcher preserves logical page mapping.

### IV. Performance
Lighthouse mobile score target ≥ 90. No runtime CDN frameworks in production. Static assets only after `astro build`.

### V. Curated Content First
Project catalog is authored in `curated-projects.json`. GitHub API enriches metadata only (stars, dates, descriptions). Teaching repos are categorized separately from product showcases.

### VI. SEO & Discoverability
Every page has unique title/description, Open Graph tags, `sitemap.xml`, `robots.txt`, and JSON-LD where applicable. Agent MUST use `seo-audit` and `schema-markup` skills before release.

### VII. Simplicity & Maintainability
One project = one curated entry. Fixed categories: ecotech, healthtech, edtech, automation, robotics, teaching. Prefer Astro components over abstractions.

## Technical Constraints

- Deploy target: GitHub Pages via GitHub Actions (`dist/` artifact).
- No server runtime; contact via `mailto:` and external links.
- CV available as web page and downloadable PDF in `public/cv/`.
- Agent skills from skills.sh are required for UI, SEO, deploy, and QA phases.

## Development Workflow

- Specifications live in `specs/001-portfolio/` and supersede ad-hoc requirements.
- Changes to scope update spec → plan → tasks before code.
- Pre-merge: `npm run sync:github`, `npm run build`, manual check of `/es/` and `/en/` routes.

## Governance

Constitution supersedes conflicting implementation choices. Amendments require updating this file and relevant spec artifacts.

**Version**: 1.0.0 | **Ratified**: 2026-05-25 | **Last Amended**: 2026-05-25
