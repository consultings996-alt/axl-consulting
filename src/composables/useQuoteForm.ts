import { reactive, ref, watch, nextTick, onMounted, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import services from '@/data/services'
import { OTHER_SERVICE, PUNCTUAL_SERVICE, timelineOptions, budgetOptions } from '@/data/quote'
import { CONTACT_LIMITS, isValidEmail, type ContactResponse } from '@/data/contactContract'

const CONTACT_ENDPOINT = '/api/contact'
const REQUEST_TIMEOUT_MS = 12_000

export interface QuoteFormState {
  service: string
  timeline: string
  budget: string
  name: string
  email: string
  company: string
  phone: string
  message: string
  _gotcha: string
}

const emptyForm = (): QuoteFormState => ({
  service: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  _gotcha: ''
})

export function useQuoteForm(nameInput?: Ref<HTMLInputElement | null>) {
  const serviceOptions = [
    ...services.map((s) => ({ value: s.slug, label: s.shortTitle })),
    PUNCTUAL_SERVICE,
    { value: OTHER_SERVICE, label: 'Otro / no estoy seguro' }
  ]

  const form = reactive<QuoteFormState>(emptyForm())
  const errors = reactive<{ service?: string; name?: string; email?: string }>({})
  const step = ref<1 | 2>(1)
  const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
  const submitErrorMessage = ref<string>('')

  const route = useRoute()
  const preselect = (slug: unknown) => {
    if (typeof slug === 'string' && serviceOptions.some((o) => o.value === slug)) {
      form.service = slug
      step.value = 1
    }
  }
  onMounted(() => preselect(route.query.servicio))
  watch(() => route.query.servicio, preselect)

  const next = async () => {
    errors.service = form.service ? undefined : 'Elige una opción para continuar.'
    if (errors.service) return
    step.value = 2
    await nextTick()
    nameInput?.value?.focus()
  }

  const validateContact = () => {
    errors.name = form.name ? undefined : 'Escribe tu nombre.'
    errors.email = isValidEmail(form.email) ? undefined : 'Escribe un correo válido.'
    return !errors.name && !errors.email
  }

  const onSubmit = async () => {
    if (status.value === 'sending') return
    if (form._gotcha) return
    if (!validateContact()) return

    status.value = 'sending'
    submitErrorMessage.value = ''

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          ...form,
          service: serviceOptions.find((o) => o.value === form.service)?.label ?? form.service
        })
      })

      const data = (await response.json().catch(() => null)) as ContactResponse | null
      if (!response.ok || (data && !data.ok)) {
        if (data && !data.ok && data.error) {
          submitErrorMessage.value = data.error
        }
        throw new Error(`HTTP ${response.status}`)
      }
      status.value = 'success'
    } catch (error) {
      console.error('Error al enviar la solicitud de cotización:', error)
      status.value = 'error'
    } finally {
      clearTimeout(timer)
    }
  }

  const reset = () => {
    Object.assign(form, emptyForm())
    errors.service = undefined
    errors.name = undefined
    errors.email = undefined
    submitErrorMessage.value = ''
    step.value = 1
    status.value = 'idle'
  }

  return {
    form,
    errors,
    step,
    status,
    submitErrorMessage,
    serviceOptions,
    timelineOptions,
    budgetOptions,
    limits: CONTACT_LIMITS,
    next,
    onSubmit,
    reset
  }
}
