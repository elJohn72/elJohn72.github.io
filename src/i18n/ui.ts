export type Locale = 'es' | 'en';

export const defaultLocale: Locale = 'es';

export const locales: Locale[] = ['es', 'en'];

export const ui = {
  es: {
    nav: {
      home: 'Inicio',
      projects: 'Proyectos',
      about: 'Sobre mí',
      cv: 'CV',
      contact: 'Contacto',
    },
    hero: {
      ctaProjects: 'Ver proyectos',
      ctaCv: 'Descargar CV',
      ctaContact: 'Contactar',
    },
    sections: {
      featured: 'Proyectos destacados',
      allProjects: 'Todos los proyectos',
      skills: 'Habilidades',
      timeline: 'Trayectoria',
      filterAll: 'Todos',
    },
    project: {
      viewRepo: 'Ver en GitHub',
      viewDemo: 'Ver demo',
      role: 'Rol',
      updated: 'Actualizado',
      stars: 'estrellas',
    },
    about: {
      title: 'Sobre mí',
      dentistry: 'Odontología',
      teaching: 'Docencia',
      entrepreneurship: 'Emprendimiento',
      robotics: 'Robótica y tecnología',
    },
    cv: {
      title: 'Currículum',
      download: 'Descargar PDF',
      print: 'Imprimir',
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Colaboramos en educación, salud digital o innovación tecnológica?',
      email: 'Correo',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
    },
    categories: {
      ecotech: 'EcoTech',
      healthtech: 'Salud digital',
      edtech: 'EdTech',
      automation: 'Automatización',
      robotics: 'Robótica',
      teaching: 'Docencia',
    },
    theme: {
      light: 'Modo claro',
      dark: 'Modo oscuro',
    },
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      cv: 'CV',
      contact: 'Contact',
    },
    hero: {
      ctaProjects: 'View projects',
      ctaCv: 'Download CV',
      ctaContact: 'Get in touch',
    },
    sections: {
      featured: 'Featured projects',
      allProjects: 'All projects',
      skills: 'Skills',
      timeline: 'Timeline',
      filterAll: 'All',
    },
    project: {
      viewRepo: 'View on GitHub',
      viewDemo: 'View demo',
      role: 'Role',
      updated: 'Updated',
      stars: 'stars',
    },
    about: {
      title: 'About me',
      dentistry: 'Dentistry',
      teaching: 'Teaching',
      entrepreneurship: 'Entrepreneurship',
      robotics: 'Robotics & technology',
    },
    cv: {
      title: 'Resume',
      download: 'Download PDF',
      print: 'Print',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s collaborate on education, digital health, or tech innovation.',
      email: 'Email',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    categories: {
      ecotech: 'EcoTech',
      healthtech: 'Digital health',
      edtech: 'EdTech',
      automation: 'Automation',
      robotics: 'Robotics',
      teaching: 'Teaching',
    },
    theme: {
      light: 'Light mode',
      dark: 'Dark mode',
    },
  },
} as const;

export function getUi(locale: Locale) {
  return ui[locale];
}

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return `/${locale}/`;
  return `/${locale}${normalized}`;
}

export function switchLocalePath(currentLocale: Locale, targetLocale: Locale, pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'es' || segments[0] === 'en') {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  const routeMap: Record<string, Record<string, string>> = {
    proyectos: { en: 'projects' },
    projects: { es: 'proyectos' },
    'sobre-mi': { en: 'about' },
    about: { es: 'sobre-mi' },
    contacto: { en: 'contact' },
    contact: { es: 'contacto' },
  };
  const idx = segments.findIndex((s, i) => i > 0 && routeMap[s]);
  if (idx > 0) {
    const segment = segments[idx];
    const mapped = routeMap[segment]?.[targetLocale];
    if (mapped) segments[idx] = mapped;
  }
  return '/' + segments.join('/') + (pathname.endsWith('/') ? '/' : '');
}
