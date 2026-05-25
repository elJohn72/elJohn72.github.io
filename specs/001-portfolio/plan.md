# Implementation Plan: Professional Portfolio

**Branch**: `001-portfolio` | **Date**: 2026-05-25

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro 5 |
| Styling | Tailwind CSS 4 via `@astrojs/tailwind` |
| i18n | Route-based `/es/*` and `/en/*` + `src/i18n/ui.ts` |
| Data | `profile.yaml`, `curated-projects.json`, generated `projects.json` |
| Sync | `scripts/sync-github-metadata.mjs` (Node fetch) |
| SEO | `@astrojs/sitemap`, JSON-LD in BaseLayout |
| Deploy | GitHub Actions → `actions/deploy-pages` |

## Architecture

```
src/
  components/     Header, Footer, ProjectCard, CategoryFilter, ...
  data/           profile.yaml, curated-projects.json, projects.json
  i18n/           ui.ts, utils.ts
  layouts/        BaseLayout.astro
  pages/
    index.astro           → redirect /es/
    es/...
    en/...
public/
  cv/cv.pdf (placeholder)
  images/projects/
scripts/sync-github-metadata.mjs
```

## Data Model

See `data-model.md`. Sync merges `curated-projects.json` entries with GitHub API `repos/{owner}/{repo}`.

## GitHub Pages Config

- `site: https://eljohn72.github.io`
- `base: /`
- Workflow: checkout → npm ci → sync:github → build → deploy-pages

## Agent Skills (skills.sh)

Install before UI/QA: astro, publish-to-pages, frontend-design, web-design-guidelines, copywriting, seo-audit, schema-markup, webapp-testing, audit-website, accessibility.

## Constitution Compliance

- Static output only ✓
- Bilingual URLs ✓
- Curated-first data ✓
- WCAG/SEO gates in Phase D ✓
