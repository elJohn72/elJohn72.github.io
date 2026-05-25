import profileJson from '../data/profile.json';
import projectsJson from '../data/projects.json';
import type { Locale } from '../i18n/ui';
import type { MergedProject, ProjectCategory } from '../i18n/utils';

export interface Profile {
  name: string;
  email: string;
  photo: string;
  social: Record<string, string>;
  title: Record<Locale, string>;
  bio: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  skills: { name: string; level: number }[];
  roles: Record<string, Record<Locale, string>>;
  timeline: {
    year: string;
    title: Record<Locale, string>;
    description: Record<Locale, string>;
  }[];
}

export const profile = profileJson as Profile;
export const projects = projectsJson as MergedProject[];

export function getFeaturedProjects(): MergedProject[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: string): MergedProject | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectsByCategory(category: ProjectCategory | 'all'): MergedProject[] {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}

export const categories: ProjectCategory[] = [
  'ecotech',
  'healthtech',
  'edtech',
  'automation',
  'robotics',
  'teaching',
];
