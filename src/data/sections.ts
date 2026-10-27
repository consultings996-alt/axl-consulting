/**
 * Secciones de la página principal que tienen su propia URL limpia.
 * Por ejemplo, /servicios abre el inicio y baja directo a la sección con id="servicios".
 */
export interface HomeSection {
  path: string
  /** id del elemento en la página principal */
  id: string
}

export const homeSections = {
  servicios: { path: '/servicios', id: 'servicios' },
  comoTrabajamos: { path: '/como-trabajamos', id: 'como-trabajamos' },
  perfiles: { path: '/perfiles', id: 'perfiles' },
  cotizar: { path: '/cotizar', id: 'cotizar' }
} satisfies Record<string, HomeSection>

const byPath = new Map<string, HomeSection>(Object.values(homeSections).map((s) => [s.path, s]))

/** Devuelve la sección si la ruta es una de ellas */
export const sectionForPath = (path: string) => byPath.get(path)

/** Enlace a "Cotizar" con el servicio ya elegido en el formulario */
export const quoteLink = (serviceSlug?: string) =>
  serviceSlug ? `${homeSections.cotizar.path}?servicio=${serviceSlug}` : homeSections.cotizar.path
