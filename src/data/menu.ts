// Solo rutas que existen. "Inicio" se alcanza desde el logo y "Cotizar" es el botón del encabezado.
import { hasProjects } from './projects'
import { pages } from './pages'

export interface MenuItem {
  label: string
  link: string
}

const menu: MenuItem[] = [
  { label: 'Servicios', link: pages.servicios },
  { label: 'Cómo trabajamos', link: pages.comoTrabajamos },
  { label: 'Perfiles', link: pages.perfiles },
  { label: 'Nosotros', link: '/about' },
  { label: 'Insights', link: '/insights' },
  { label: 'Carreras', link: '/careers' },
  // Aparece solo cuando hay proyectos en data/projects.ts
  ...(hasProjects ? [{ label: 'Proyectos', link: pages.proyectos }] : [])
]

export const contactLink: MenuItem = { label: 'Cotizar proyecto', link: pages.cotizar }

export default menu
