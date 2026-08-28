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
      credentials: 'Títulos y certificaciones',
      productionSites: 'Sitios en producción',
      social: 'Redes sociales',
    },
    project: {
      viewRepo: 'Ver en GitHub',
      viewDemo: 'Ver sitio',
      live: 'En producción',
      downloadCert: 'Descargar PDF',
      role: 'Rol',
      updated: 'Actualizado',
      stars: 'estrellas',
    },
    about: {
      title: 'Sobre mí',
      degrees: 'Formación académica',
      dentalHygiene: 'Higiene dental',
      engineering: 'Ingeniería (Electromecánica y OTI)',
      education: 'Formación universitaria (UEA)',
      teaching: 'Docencia — Andrés Bello',
      entrepreneurship: 'Emprendimiento',
      robotics: 'Robótica y tecnología',
    },
    cv: {
      title: 'Currículum',
      download: 'Descargar PDF',
      print: 'Imprimir',
      all: 'Perfil completo',
      filterHint: 'elige el perfil que quieres ver',
      search: 'Buscar en el CV',
      searchPlaceholder: 'Buscar tecnología, curso o proyecto…',
      noResults: 'Nada coincide con este filtro.',
      experience: 'Experiencia',
      projects: 'Proyectos',
      stack: 'Stack técnico',
      education: 'Formación',
      courses: 'Cursos y capacitaciones',
      languages: 'Idiomas',
      expandAll: 'Expandir todo',
      collapseAll: 'Contraer todo',
      current: 'Actual',
      shareFacet: 'Copiar enlace',
      copied: '¡Copiado!',
      liveSite: 'Ver sitio',
      repo: 'Código',
      showing: '{n} de {t} bloques',
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Colaboramos en ingeniería, salud oral, educación o proyectos tecnológicos?',
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
      credentials: 'Degrees & certifications',
      productionSites: 'Live websites',
      social: 'Social media',
    },
    project: {
      viewRepo: 'View on GitHub',
      viewDemo: 'Visit site',
      live: 'Live',
      downloadCert: 'Download PDF',
      role: 'Role',
      updated: 'Updated',
      stars: 'stars',
    },
    about: {
      title: 'About me',
      degrees: 'Academic background',
      dentalHygiene: 'Dental hygiene',
      engineering: 'Engineering (Electromechanical & IT)',
      education: 'University studies (UEA)',
      teaching: 'Teaching — Andrés Bello',
      entrepreneurship: 'Entrepreneurship',
      robotics: 'Robotics & technology',
    },
    cv: {
      title: 'Resume',
      download: 'Download PDF',
      print: 'Print',
      all: 'Full profile',
      filterHint: 'pick the profile you want to see',
      search: 'Search the resume',
      searchPlaceholder: 'Search technology, course, or project…',
      noResults: 'Nothing matches this filter.',
      experience: 'Experience',
      projects: 'Projects',
      stack: 'Tech stack',
      education: 'Education',
      courses: 'Courses & training',
      languages: 'Languages',
      expandAll: 'Expand all',
      collapseAll: 'Collapse all',
      current: 'Current',
      shareFacet: 'Copy link',
      copied: 'Copied!',
      liveSite: 'Visit site',
      repo: 'Code',
      showing: '{n} of {t} blocks',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s collaborate on engineering, oral health, education, or tech projects.',
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
