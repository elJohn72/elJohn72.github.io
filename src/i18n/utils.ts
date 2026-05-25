import type { Locale } from './ui';

export type ProjectCategory =
  | 'ecotech'
  | 'healthtech'
  | 'edtech'
  | 'automation'
  | 'robotics'
  | 'teaching';

export interface ProjectLocale {
  title: string;
  summary: string;
  role: string;
}

export interface CuratedProject {
  id: string;
  repo: string;
  featured: boolean;
  category: ProjectCategory;
  locales: Record<Locale, ProjectLocale>;
  tags: string[];
  demoUrl: string | null;
  image: string | null;
}

export interface MergedProject extends CuratedProject {
  stars: number;
  forks: number;
  updatedAt: string;
  githubDescription: string | null;
  htmlUrl: string;
}

export function getLocalizedProject(project: MergedProject | CuratedProject, locale: Locale) {
  return project.locales[locale];
}

export function formatDate(date: string, locale: Locale): string {
  return new Date(date).toLocaleDateString(locale === 'es' ? 'es-EC' : 'en-US', {
    year: 'numeric',
    month: 'short',
  });
}
