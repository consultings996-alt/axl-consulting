/**
 * Contenido institucional de "Nosotros" y de la sección "Quiénes somos" en el inicio.
 */

export interface CompanyValue {
  title: string
  desc: string
}

export interface CompanyHighlight {
  title: string
  description: string
}

export const aboutTags: readonly string[] = [
  'Ingeniería de excelencia',
  'Servicios nearshore',
  'Consultoría especializada',
  'Innovación con IA'
]

export const aboutHighlights: readonly CompanyHighlight[] = [
  {
    title: 'Ingeniería con experiencia real',
    description: 'Equipo con experiencia en sistemas empresariales, gobierno, finanzas e inteligencia artificial.'
  },
  {
    title: 'Comunicación directa',
    description: 'Hablas con quien diseña y construye tu solución, sin intermediarios.'
  },
  {
    title: 'Entregas cortas y visibles',
    description: 'Avances funcionales cada pocas semanas, no solo al final del proyecto.'
  },
  {
    title: 'Acompañamiento después del lanzamiento',
    description: 'Soporte, mejoras y evolución de tu sistema cuando ya está en producción.'
  }
]

export const companyValues: readonly CompanyValue[] = [
  { title: 'Innovación continua', desc: 'Siempre a la vanguardia tecnológica.' },
  { title: 'Excelencia técnica', desc: 'Ingeniería de alto nivel en cada línea de código.' },
  { title: 'Compromiso con la calidad', desc: 'Sistemas robustos y confiables.' },
  { title: 'Transparencia y confianza', desc: 'Relaciones sólidas basadas en la honestidad.' },
  { title: 'Orientación a resultados', desc: 'Soluciones que generan impacto real.' },
  { title: 'Escalabilidad', desc: 'Sistemas preparados para el futuro.' }
]

