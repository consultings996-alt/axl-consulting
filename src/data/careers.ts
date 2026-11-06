import { company } from './company'

export interface CareerBenefit {
  title: string
  description: string
}

export interface JobOpening {
  id: number
  title: string
  type: string
  location: string
}

export const careerBenefits: readonly CareerBenefit[] = [
  { title: 'Crecimiento', description: 'Planes de carrera y capacitación constante.' },
  { title: 'Trabajo remoto', description: 'Trabaja desde donde te sientas más productivo.' },
  { title: 'Bienestar', description: 'Seguro médico y días de salud mental.' }
]

export const jobOpenings: readonly JobOpening[] = [
  { id: 1, title: 'Backend Engineering', type: 'Por proyecto / híbrido', location: 'Remoto' },
  { id: 2, title: 'Frontend Engineering', type: 'Por proyecto / híbrido', location: 'Remoto' },
  { id: 3, title: 'Arquitectura Cloud', type: 'Por proyecto / híbrido', location: 'Remoto' },
  { id: 4, title: 'DevOps', type: 'Por proyecto / híbrido', location: 'Remoto' },
  { id: 5, title: 'Project Management', type: 'Por proyecto / híbrido', location: 'Remoto' },
  { id: 6, title: 'Ventas tecnológicas', type: 'Por proyecto / híbrido', location: 'Remoto' }
]

export const applyHref = (title: string): string =>
  `mailto:${company.email}?subject=${encodeURIComponent(`Aplicación para ${title}`)}`

