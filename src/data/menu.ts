// Solo rutas que existen. "Inicio" se alcanza desde el logo y "Contacto" es el botón del encabezado.
import { hasProjects } from './projects'
import { homeSections } from './sections'

export interface MenuItem {
  label: string
  link: string
}

const menu: MenuItem[] = [
  { label: 'Servicios', link: homeSections.servicios.path },
  ...(hasProjects ? [{ label: 'Proyectos', link: '/projects' }] : []),
  { label: 'Cómo trabajamos', link: homeSections.comoTrabajamos.path },
  { label: 'Nosotros', link: '/about' },
  { label: 'Insights', link: '/insights' },
  { label: 'Carreras', link: '/careers' }
]

export const contactLink: MenuItem = { label: 'Cotizar proyecto', link: homeSections.cotizar.path }

export default menu
