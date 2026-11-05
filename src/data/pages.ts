/**
 * Páginas principales del sitio (cada opción del menú es una página propia).
 */
export const pages = {
  servicios: '/servicios',
  comoTrabajamos: '/como-trabajamos',
  perfiles: '/perfiles',
  cotizar: '/cotizar'
} as const

/** Enlace a "Cotizar" con el servicio ya elegido en el formulario */
export const quoteLink = (serviceSlug?: string) =>
  serviceSlug ? `${pages.cotizar}?servicio=${serviceSlug}` : pages.cotizar
