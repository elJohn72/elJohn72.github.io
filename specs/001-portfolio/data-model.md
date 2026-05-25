# Data Model

## Profile (`src/data/profile.yaml`)

```yaml
name: string
title: { es: string, en: string }
email: string
photo: string
bio: { es: string, en: string }
highlights: { es: string[], en: string[] }
skills: { name: string, level: number }[]
timeline: { year: string, title: { es, en }, description: { es, en } }[]
social: { github, linkedin, ... }
roles: { dentistry, teaching, entrepreneurship, robotics }: { es, en }
```

## Curated Project (`curated-projects.json[]`)

| Field | Type | Required |
|-------|------|----------|
| id | string | yes |
| repo | string (`owner/name`) | yes |
| featured | boolean | yes |
| category | enum | yes |
| locales.es/en | title, summary, role | yes |
| tags | string[] | no |
| demoUrl | string \| null | no |
| image | string | no |

## Merged Project (`projects.json[]`)

Curated fields + `stars`, `forks`, `updatedAt`, `githubDescription`, `htmlUrl`.

## Categories

`ecotech` | `healthtech` | `edtech` | `automation` | `robotics` | `teaching`
