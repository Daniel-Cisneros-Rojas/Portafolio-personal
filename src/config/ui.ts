import cvSpanishPdf from '../../docs/cv/Daniel_Cisneros_Rojas_CV_Resume_ESP.pdf?url'
import cvEnglishPdf from '../../docs/cv/Daniel_Cisneros_Rojas_CV_Resume_ENG.pdf?url'

export const UI_TEXT = {
  navigation: {
    ariaLabel: 'Navegación principal',
    links: [
      { href: '#projects', label: 'Proyectos' },
      { href: '#experience', label: 'Experiencia' },
      { href: '#education', label: 'Educación' },
      { href: '#contact', label: 'Contacto' },
    ],
  },
  hero: {
    eyebrow: 'Desarrollador de software',
    actions: {
      cvSpanish: { href: cvSpanishPdf, label: 'Ver CV en español', variant: 'primary' },
      cvEnglish: { href: cvEnglishPdf, label: 'View CV in English', variant: 'secondary' },
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
    },
  },
  sections: {
    skills: { eyebrow: 'Skills', title: 'Tecnologías y competencias' },
    projects: { eyebrow: 'Proyectos', title: 'Proyectos destacados' },
    experience: { eyebrow: 'Experiencia', title: 'Trayectoria profesional' },
    education: { eyebrow: 'Formación', title: 'Educación' },
    courses: { eyebrow: 'Cursos', title: 'Formación complementaria' },
    achievements: { eyebrow: 'Logros', title: 'Participaciones y reconocimientos' },
    contact: { eyebrow: 'Contacto', title: 'Hablemos' },
  },
  projects: {
    viewProject: 'Ver proyecto',
    showMore: 'Ver más',
    showLess: 'Ver menos',
    githubRepositoryAriaLabel: (projectName: string) => `Ver repositorio de ${projectName} en GitHub`,
    githubRepositoryTitle: (projectName: string) => `Repositorio de ${projectName}`,
    placeholderImagePath: '/images/projects/placeholder.png',
  },
  courses: {
    verification: 'Verificación',
  },
  contact: {
    email: 'Email',
    phone: 'Teléfono',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    copy: 'Copiar',
    copied: '✓ Copiado',
    copyTitle: (label: string) => `Copiar ${label}`,
    intro: '¿Tienes un proyecto en mente o te gustaría colaborar? Escríbeme por cualquiera de estos medios.',
  },
  projectPage: {
    back: '← Volver',
    notFoundTitle: 'Proyecto no encontrado',
    sections: {
      summary: 'Resumen',
      description: 'Descripción',
      features: 'Características',
      architecture: 'Arquitectura',
      technologies: 'Tecnologías',
      repository: 'Repositorio',
      viewRepository: 'Ver repositorio',
      demo: 'Demo',
      video: 'Video',
      credentials: 'Credenciales',
      images: 'Imágenes',
    },
    imageAlt: (projectName: string) => `${projectName} detalle`,
  },
  notFound: {
    title: 'Página no encontrada',
    message: 'La ruta solicitada no existe.',
    backToHome: 'Volver al inicio',
  },
} as const
