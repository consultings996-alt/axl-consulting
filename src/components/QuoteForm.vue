<template>
  <div class="quote-form on-dark">
    <!-- Confirmación -->
    <div v-if="status === 'success'" class="done" role="status" aria-live="polite">
      <svg class="done-icon" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="22" />
        <path d="m15 24.5 6 6 12-13" />
      </svg>
      <h3>Recibimos tu solicitud</h3>
      <p>Te contactaremos pronto para platicar sobre tu proyecto. Si prefieres adelantar la conversación, escríbenos por WhatsApp.</p>
      <div class="done-actions">
        <a :href="whatsapp.url" target="_blank" rel="noopener noreferrer" class="btn btn-ice">Escribir por WhatsApp</a>
        <button type="button" class="btn btn-ghost" @click="reset">Enviar otra solicitud</button>
      </div>
    </div>

    <form v-else novalidate @submit.prevent="onSubmit">
      <div class="progress" aria-hidden="true">
        <span :class="{ on: step >= 1 }"></span>
        <span :class="{ on: step >= 2 }"></span>
      </div>
      <p class="step-label">Paso {{ step }} de 2 · {{ step === 1 ? 'Tu proyecto' : 'Tus datos' }}</p>

      <!-- Paso 1: proyecto -->
      <fieldset v-show="step === 1" class="fields">
        <legend class="visually-hidden">Tu proyecto</legend>

        <div class="field">
          <span id="service-label" class="label">¿Qué necesitas?</span>
          <div class="chips" role="radiogroup" aria-labelledby="service-label">
            <label v-for="opt in serviceOptions" :key="opt.value" class="chip" :class="{ selected: form.service === opt.value }">
              <input v-model="form.service" type="radio" name="service" :value="opt.value" />
              {{ opt.label }}
            </label>
          </div>
          <p v-if="errors.service" class="error">{{ errors.service }}</p>
        </div>

        <div class="row">
          <div class="field">
            <label for="q-timeline" class="label">¿Cuándo te gustaría empezar?</label>
            <select id="q-timeline" v-model="form.timeline">
              <option value="">Selecciona una opción</option>
              <option v-for="t in timelineOptions" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div class="field">
            <label for="q-budget" class="label">Presupuesto aproximado</label>
            <select id="q-budget" v-model="form.budget">
              <option value="">Selecciona una opción</option>
              <option v-for="b in budgetOptions" :key="b" :value="b">{{ b }}</option>
            </select>
          </div>
        </div>

        <div class="actions">
          <button type="button" class="btn btn-ice" @click="next">Continuar</button>
        </div>
      </fieldset>

      <!-- Paso 2: datos de contacto -->
      <fieldset v-show="step === 2" class="fields">
        <legend class="visually-hidden">Tus datos</legend>

        <div class="row">
          <div class="field">
            <label for="q-name" class="label">Nombre completo</label>
            <input id="q-name" ref="nameInput" v-model.trim="form.name" type="text" autocomplete="name" :aria-invalid="!!errors.name" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
          </div>
          <div class="field">
            <label for="q-email" class="label">Correo</label>
            <input id="q-email" v-model.trim="form.email" type="email" autocomplete="email" :aria-invalid="!!errors.email" />
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
          </div>
        </div>

        <div class="row">
          <div class="field">
            <label for="q-company" class="label">Empresa <span class="optional">(opcional)</span></label>
            <input id="q-company" v-model.trim="form.company" type="text" autocomplete="organization" />
          </div>
          <div class="field">
            <label for="q-phone" class="label">Teléfono o WhatsApp <span class="optional">(opcional)</span></label>
            <input id="q-phone" v-model.trim="form.phone" type="tel" autocomplete="tel" />
          </div>
        </div>

        <div class="field">
          <label for="q-message" class="label">Cuéntanos un poco más <span class="optional">(opcional)</span></label>
          <textarea id="q-message" v-model.trim="form.message" rows="4" placeholder="Qué quieres lograr, qué sistemas usas hoy, qué te preocupa…"></textarea>
        </div>

        <!-- Campo trampa contra bots -->
        <input v-model="form._gotcha" type="text" name="_gotcha" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <p v-if="status === 'error'" class="error submit-error" role="alert">
          No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos a
          <a :href="`mailto:${company.email}`">{{ company.email }}</a>.
        </p>

        <div class="actions">
          <button type="button" class="btn btn-ghost" @click="step = 1">Regresar</button>
          <button type="submit" class="btn btn-ice" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Enviando…' : 'Enviar solicitud' }}
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import services from '@/data/services'
import { company, social } from '@/data/company'
import { OTHER_SERVICE, PUNCTUAL_SERVICE, timelineOptions, budgetOptions } from '@/data/quote'

const CONTACT_ENDPOINT = '/api/contact'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const whatsapp = social('whatsapp')
const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.shortTitle })),
  PUNCTUAL_SERVICE,
  { value: OTHER_SERVICE, label: 'Otro / no estoy seguro' }
]

const emptyForm = () => ({
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

const form = reactive(emptyForm())
const errors = reactive<{ service?: string; name?: string; email?: string }>({})
const step = ref<1 | 2>(1)
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const nameInput = ref<HTMLInputElement | null>(null)

// Preselecciona el servicio cuando se llega desde "Cotizar este servicio" (?servicio=slug)
// (se aplica tras montar para que coincida con el HTML prerenderizado)
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
  nameInput.value?.focus()
}

const validateContact = () => {
  errors.name = form.name ? undefined : 'Escribe tu nombre.'
  errors.email = EMAIL_RE.test(form.email) ? undefined : 'Escribe un correo válido.'
  return !errors.name && !errors.email
}

const onSubmit = async () => {
  if (form._gotcha) return
  if (!validateContact()) return

  status.value = 'sending'
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...form,
        service: serviceOptions.find((o) => o.value === form.service)?.label ?? form.service
      })
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    status.value = 'success'
  } catch (error) {
    console.error('Error al enviar la solicitud de cotización:', error)
    status.value = 'error'
  }
}

const reset = () => {
  Object.assign(form, emptyForm())
  step.value = 1
  status.value = 'idle'
}
</script>

<style scoped>
.quote-form {
  position: relative;
  padding: clamp(24px, 4vw, 40px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--line-dark);
  background: linear-gradient(180deg, rgba(159, 220, 245, 0.06), rgba(159, 220, 245, 0.015)), var(--ink-raised);
  box-shadow: 0 30px 80px -30px rgba(159, 220, 245, 0.28);
  color: #ffffff;
}

.quote-form::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 12%;
  right: 12%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--ice), transparent);
}

.progress {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
}

.progress span {
  height: 3px;
  border-radius: 3px;
  background: var(--line-dark);
  transition: background-color 0.25s ease;
}

.progress span.on {
  background: var(--ice);
}

.step-label {
  margin: 0 0 24px;
  color: var(--muted-dark);
  font-size: var(--text-sm);
}

.fields {
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
  display: grid;
  gap: 22px;
}

.row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.field {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.label {
  font-size: 0.95rem;
  font-weight: 600;
}

.optional {
  color: var(--muted-dark);
  font-weight: 400;
}

input:not([type='radio']),
select,
textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line-dark);
  background: rgba(10, 26, 47, 0.7);
  color: #ffffff;
  font: inherit;
  font-size: 1rem;
  transition: border-color 0.15s ease;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='m1 1 5 5 5-5' fill='none' stroke='%239fdcf5' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 38px;
}

select option {
  color: var(--ink);
}

textarea {
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: #7f95aa;
}

input:not([type='radio']):hover,
select:hover,
textarea:hover {
  border-color: rgba(159, 220, 245, 0.45);
}

input:not([type='radio']):focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: var(--ice);
  box-shadow: 0 0 0 3px rgba(159, 220, 245, 0.2);
}

input[aria-invalid='true'] {
  border-color: #ff9b8a;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  position: relative;
  padding: 9px 14px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line-dark);
  color: var(--muted-dark);
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
}

.chip:hover {
  border-color: rgba(159, 220, 245, 0.5);
  color: #ffffff;
}

.chip.selected {
  border-color: var(--ice);
  background: rgba(159, 220, 245, 0.12);
  color: #ffffff;
}

.chip input {
  position: absolute;
  opacity: 0;
  inset: 0;
  margin: 0;
  cursor: pointer;
}

.chip:has(input:focus-visible) {
  outline: 2px solid var(--ice);
  outline-offset: 2px;
}

.error {
  margin: 0;
  color: #ffb4a6;
  font-size: var(--text-sm);
}

.submit-error a {
  color: inherit;
}

.actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
}

.btn[disabled] {
  opacity: 0.6;
  cursor: progress;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

/* Confirmación */
.done {
  text-align: center;
  padding: 20px 0;
}

.done-icon {
  width: 56px;
  height: 56px;
  margin-bottom: 20px;
  fill: none;
  stroke: var(--ice);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.done h3 {
  font-size: var(--text-xl);
  margin-bottom: 12px;
}

.done p {
  margin: 0 auto 28px;
  max-width: 42ch;
  color: var(--muted-dark);
}

.done-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 1fr;
  }

  .actions .btn {
    flex: 1;
  }
}
</style>
