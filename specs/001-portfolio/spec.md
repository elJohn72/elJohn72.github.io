# Feature Specification: Professional Portfolio

**Feature Branch**: `001-portfolio`

**Created**: 2026-05-25

**Status**: Approved

**Input**: Bilingual personal portfolio for recruiters, students, and partners showcasing projects, teaching, entrepreneurship, dentistry background, and robotics work.

## User Scenarios & Testing

### User Story 1 - Landing & Featured Projects (Priority: P1)

A visitor opens the site in Spanish or English and immediately understands who elJohn72 is, sees featured projects, and can navigate to CV or contact.

**Why this priority**: Core value proposition for GitHub Pages presence.

**Independent Test**: Load `/es/` and `/en/`; verify hero, ≥3 featured project cards, and working nav.

**Acceptance Scenarios**:

1. **Given** a new visitor, **When** they open `/es/`, **Then** they see hero copy in Spanish and featured projects.
2. **Given** a visitor on `/es/`, **When** they switch locale to EN, **Then** they land on `/en/` with equivalent content.

---

### User Story 2 - CV Access (Priority: P1)

A visitor views or downloads a curriculum-style summary of experience and projects.

**Why this priority**: Primary shareable asset for job/partnership outreach.

**Independent Test**: Open `/es/cv` and download PDF from CTA.

**Acceptance Scenarios**:

1. **Given** CV page loaded, **When** user clicks download, **Then** `public/cv/cv.pdf` downloads or opens.
2. **Given** print stylesheet, **When** user prints CV page, **Then** layout remains readable.

---

### User Story 3 - Project Discovery by Category (Priority: P2)

A visitor filters projects by category (EcoTech, HealthTech, EdTech, Automation, Robotics, Teaching).

**Why this priority**: Organizes diverse work across domains.

**Independent Test**: Open projects index, click each filter, verify grid updates client-side.

**Acceptance Scenarios**:

1. **Given** projects page, **When** user selects "Robotics", **Then** only robotics projects display.
2. **Given** a project card, **When** clicked, **Then** detail page shows summary, role, tags, and GitHub link.

---

### User Story 4 - About & Multidisciplinary Profile (Priority: P2)

A visitor reads about dentistry background, UEA teaching, AJTecnology/AJENZA entrepreneurship, and robotics involvement.

**Independent Test**: `/es/sobre-mi` and `/en/about` render all profile sections from `profile.yaml`.

**Acceptance Scenarios**:

1. **Given** about page, **When** loaded, **Then** timeline and skills sections are visible in correct locale.

---

### User Story 5 - Contact & Social Links (Priority: P3)

A visitor reaches GitHub, LinkedIn, or email from footer and contact page.

**Independent Test**: All external links open in new tab with `rel="noopener noreferrer"`.

**Acceptance Scenarios**:

1. **Given** contact page, **When** user clicks email, **Then** mail client opens via `mailto:`.

---

### Edge Cases

- GitHub API unavailable at build: build uses last synced `projects.json` or curated-only fallback.
- Missing project image: show category placeholder.
- Unknown locale in URL: redirect to `/es/` default.

## Requirements

### Functional Requirements

- **FR-001**: Site MUST serve static pages at `/es/` and `/en/` with equivalent information architecture.
- **FR-002**: System MUST display curated projects merged with GitHub metadata.
- **FR-003**: Users MUST filter projects by category without full page reload.
- **FR-004**: System MUST support light/dark theme with persisted preference.
- **FR-005**: System MUST include sitemap, robots.txt, and per-page meta tags.
- **FR-006**: Root `/` MUST redirect to default locale `/es/`.

### Key Entities

- **Profile**: name, bios, skills, timeline, social links (ES/EN).
- **Project**: id, repo, category, featured, locales, tags, urls, GitHub stats.
- **Category**: ecotech, healthtech, edtech, automation, robotics, teaching.

## Success Criteria

- **SC-001**: `/es/` and `/en/` load in under 3s on 3G simulated.
- **SC-002**: All curated repo links resolve to live GitHub repositories.
- **SC-003**: Lighthouse accessibility score ≥ 90 on landing page.
- **SC-004**: `npm run build` succeeds in CI without errors.

## Assumptions

- Public GitHub repos only for sync script.
- User provides or accepts placeholder profile photo and CV PDF.
- GitHub Pages source configured as GitHub Actions.
