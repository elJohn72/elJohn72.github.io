import profileJson from '../data/profile.json';
import projectsJson from '../data/projects.json';
import type { Locale } from '../i18n/ui';
import type { MergedProject, ProjectCategory } from '../i18n/utils';

export interface Credential {
  id: string;
  file: string;
  year: string;
  locales: Record<Locale, { title: string; issuer: string }>;
}

export interface ProductionSite {
  url: string;
  label: string;
  locales: Record<Locale, string>;
}

export interface CvFile {
  file: string;
  locales: Record<Locale, string>;
  primary: boolean;
}

export interface Degree {
  locales: Record<Locale, string>;
}

export interface Profile {
  name: string;
  email: string;
  photo: string;
  degrees: Degree[];
  social: Record<string, string>;
  productionSites: ProductionSite[];
  credentials: Credential[];
  cvFiles: CvFile[];
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

export const socialLabels: Record<string, Record<Locale, string>> = {
  github: { es: 'GitHub', en: 'GitHub' },
  linkedin: { es: 'LinkedIn', en: 'LinkedIn' },
  facebook: { es: 'Facebook', en: 'Facebook' },
  instagram: { es: 'Instagram', en: 'Instagram' },
  tiktok: { es: 'TikTok', en: 'TikTok' },
  youtube: { es: 'YouTube', en: 'YouTube' },
};

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
