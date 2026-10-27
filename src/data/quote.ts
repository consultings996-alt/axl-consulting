/** Opciones del formulario de cotización. Ajusta textos y rangos aquí. */

export const OTHER_SERVICE = 'otro'

/** Para clientes que solo necesitan una funcionalidad o un ajuste, no un proyecto completo */
export const PUNCTUAL_SERVICE = { value: 'funcionalidad-puntual', label: 'Funcionalidad o ajuste puntual' }

export const timelineOptions = [
  'Lo antes posible',
  'En 1 a 3 meses',
  'En 3 a 6 meses',
  'Solo estoy explorando'
] as const

export const budgetOptions = [
  'Menos de $50,000 MXN',
  '$50,000 a $150,000 MXN',
  '$150,000 a $500,000 MXN',
  'Más de $500,000 MXN',
  'Aún no lo sé'
] as const

/** Lo que pasa después de enviar el formulario */
export const nextSteps = [
  { title: 'Revisamos tu solicitud', description: 'Te contactamos por correo o WhatsApp para entender tu proyecto.' },
  { title: 'Agendamos una llamada', description: 'Conversamos sobre tu operación, objetivos y restricciones.' },
  { title: 'Recibes una propuesta', description: 'Con alcance, tiempos y costo por escrito.' }
]
