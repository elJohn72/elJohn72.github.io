# elJohn72.github.io — Professional Portfolio

Bilingual (ES/EN) static portfolio built with [Astro](https://astro.build), deployed to GitHub Pages.

**Live site:** https://eljohn72.github.io

## Stack

- Astro 5 + Tailwind CSS
- Curated project catalog + GitHub API metadata sync
- [Spec Kit](https://github.com/github/spec-kit) specifications in `specs/001-portfolio/`

## Development

```bash
npm install
npm run sync:github   # refresh stars/dates from GitHub API
npm run dev           # http://localhost:4321
npm run build
npm run preview
```

## Add a project

1. Edit `src/data/curated-projects.json`
2. Run `npm run sync:github`
3. Commit and push to `main` (GitHub Actions deploys automatically)

## Profile & CV

- Profile: `src/data/profile.json`
- Replace placeholder PDF: `public/cv/cv.pdf`

## GitHub Pages

Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Agent skills ([skills.sh](https://www.skills.sh/))

Recommended skills for maintenance:

```bash
npx skills add https://github.com/astrolicious/agent-skills --skill astro
npx skills add https://github.com/github/awesome-copilot --skill publish-to-pages
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit
npx skills add https://github.com/anthropics/skills --skill webapp-testing
npx skills add https://github.com/squirrelscan/skills --skill audit-website
```

## Spec-Driven workflow

```bash
/speckit-constitution
/speckit-specify
/speckit-plan
/speckit-tasks
/speckit-implement
```

Artifacts: `.specify/memory/constitution.md`, `specs/001-portfolio/`.
