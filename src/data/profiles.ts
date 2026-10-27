/**
 * Perfiles que A.X.L puede asignar a un proyecto, por rol y nivel.
 * Propuesta inicial basada en los servicios del sitio: ajustar roles, niveles y skills según el equipo real.
 */
export type Level = 'jr' | 'mid' | 'sr'

export interface LevelInfo {
  id: Level
  label: string
  description: string
}

export const levels: LevelInfo[] = [
  { id: 'jr', label: 'Jr', description: 'Base sólida; resuelve tareas definidas con guía del equipo.' },
  { id: 'mid', label: 'Mid', description: 'Autonomía para construir módulos completos de principio a fin.' },
  { id: 'sr', label: 'Sr', description: 'Diseña soluciones, toma decisiones técnicas y guía al equipo.' }
]

export interface Profile {
  id: string
  role: string
  description: string
  /** Niveles con los que se cuenta para este rol */
  levels: Level[]
  skills: string[]
}

const profiles: Profile[] = [
  {
    id: 'frontend',
    role: 'Frontend',
    description: 'Interfaces web rápidas, accesibles y adaptadas a cualquier pantalla.',
    levels: ['jr', 'mid', 'sr'],
    skills: ['JavaScript / TypeScript', 'Vue', 'React', 'HTML y CSS', 'Diseño responsive']
  },
  {
    id: 'backend',
    role: 'Backend',
    description: 'APIs, lógica de negocio y bases de datos que sostienen tu operación.',
    levels: ['jr', 'mid', 'sr'],
    skills: ['Java / Spring Boot', 'Node.js', 'Python', 'APIs REST', 'SQL']
  },
  {
    id: 'fullstack',
    role: 'Full Stack',
    description: 'Desarrollo de punta a punta, del servidor a la interfaz.',
    levels: ['mid', 'sr'],
    skills: ['TypeScript', 'Vue / React', 'Node.js', 'Spring Boot', 'SQL y NoSQL']
  },
  {
    id: 'movil',
    role: 'Desarrollo móvil',
    description: 'Apps para iOS y Android conectadas a tus sistemas.',
    levels: ['mid', 'sr'],
    skills: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Publicación en tiendas']
  },
  {
    id: 'cloud-devops',
    role: 'Cloud y DevOps',
    description: 'Infraestructura en la nube, despliegues automáticos y monitoreo.',
    levels: ['mid', 'sr'],
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD']
  },
  {
    id: 'automatizacion',
    role: 'Automatización e integraciones',
    description: 'Flujos que conectan tus sistemas y eliminan tareas manuales.',
    levels: ['jr', 'mid', 'sr'],
    skills: ['n8n', 'APIs y webhooks', 'RPA', 'ETL', 'ERP / CRM']
  },
  {
    id: 'qa',
    role: 'QA y pruebas',
    description: 'Pruebas manuales y automatizadas para entregar sin sorpresas.',
    levels: ['jr', 'mid'],
    skills: ['Pruebas funcionales', 'Playwright', 'Selenium', 'Pruebas de API', 'Postman']
  },
  {
    id: 'arquitectura',
    role: 'Arquitectura y liderazgo técnico',
    description: 'Diseño de la solución, decisiones técnicas y acompañamiento al equipo.',
    levels: ['sr'],
    skills: ['Arquitectura de software', 'Microservicios', 'Seguridad', 'Revisión de código', 'Metodologías ágiles']
  }
]

export default profiles
