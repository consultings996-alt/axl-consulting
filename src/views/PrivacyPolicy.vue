<template>
  <LegalLayout title="Aviso de privacidad" :updated="privacyUpdated">
    <h2>1. Responsable de tus datos</h2>
    <p>
      <Fill :value="legalEntity.razonSocial" label="razón social o nombre del responsable" />, conocido
      comercialmente como {{ company.legalName }} ("A.X.L"), con domicilio en
      <Fill :value="legalEntity.domicilio" label="domicilio" />, es responsable del tratamiento de los datos personales
      que nos proporcionas, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
    </p>
    <p>
      Para cualquier asunto relacionado con tus datos personales, escríbenos a
      <a :href="`mailto:${company.email}`">{{ company.email }}</a>.
    </p>

    <h2>2. Datos que recabamos</h2>
    <p>Cuando llenas el formulario de cotización de este sitio, recabamos:</p>
    <ul>
      <li>Nombre completo y correo electrónico.</li>
      <li>Teléfono o WhatsApp y nombre de tu empresa, si decides compartirlos.</li>
      <li>El servicio que te interesa, el tiempo de inicio y el presupuesto estimado.</li>
      <li>La información que escribas sobre tu proyecto.</li>
    </ul>
    <p>
      Si nos contactas por correo, teléfono o WhatsApp, tratamos los datos que nos compartas por ese medio.
      No solicitamos datos personales sensibles; te pedimos no incluirlos en tus mensajes.
    </p>

    <h2>3. Para qué usamos tus datos</h2>
    <p><strong>Finalidades necesarias</strong> para atender tu solicitud:</p>
    <ul>
      <li>Responder tu solicitud y ponernos en contacto contigo.</li>
      <li>Elaborar y enviarte una propuesta o cotización.</li>
      <li>Dar seguimiento a la propuesta.</li>
      <li>Si contratas nuestros servicios, celebrar y cumplir la relación contractual, incluida la facturación.</li>
    </ul>
    <p><strong>Finalidades adicionales</strong>, que no son necesarias para atender tu solicitud:</p>
    <ul>
      <li>Enviarte información sobre nuestros servicios, novedades o contenido que pueda interesarte.</li>
      <li>Invitarte a responder encuestas de satisfacción.</li>
    </ul>
    <p>
      Si no quieres que usemos tus datos para las finalidades adicionales, escríbenos a
      <a :href="`mailto:${company.email}`">{{ company.email }}</a> con el asunto "No a finalidades adicionales".
      Tu negativa no afecta la atención de tu solicitud.
    </p>

    <h2>4. Con quién compartimos tus datos</h2>
    <p>
      Para operar este sitio usamos proveedores que tratan tus datos únicamente por nuestra cuenta y siguiendo
      nuestras instrucciones:
    </p>
    <ul>
      <li><strong>Vercel Inc.</strong>, que aloja el sitio y procesa el envío del formulario.</li>
      <li><strong>Google LLC</strong> (Gmail), a través de cuyo servicio de correo recibimos tus solicitudes.</li>
    </ul>
    <p>
      Estos proveedores pueden almacenar la información en servidores ubicados fuera de México. No vendemos tus
      datos ni los compartimos con terceros para sus propios fines, salvo en los casos en que la ley lo permite sin
      tu consentimiento, como un requerimiento de autoridad competente.
    </p>

    <h2>5. Tus derechos ARCO y cómo revocar tu consentimiento</h2>
    <p>
      Tienes derecho a <strong>Acceder</strong> a tus datos, <strong>Rectificarlos</strong> si son inexactos,
      <strong>Cancelarlos</strong> cuando consideres que no se usan adecuadamente y <strong>Oponerte</strong> a su uso
      para fines específicos. También puedes revocar el consentimiento que nos diste o limitar el uso de tus datos.
    </p>
    <p>Para hacerlo, envía un correo a <a :href="`mailto:${company.email}`">{{ company.email }}</a> que incluya:</p>
    <ul>
      <li>Tu nombre y un medio para responderte.</li>
      <li>Un documento que acredite tu identidad o, en su caso, la de tu representante.</li>
      <li>Una descripción clara de los datos y del derecho que quieres ejercer.</li>
      <li>Cualquier información que nos ayude a localizar tus datos.</li>
    </ul>
    <p>Te responderemos por el mismo medio, dentro de los plazos que establece la ley.</p>

    <h2>6. Cookies y tecnologías de rastreo</h2>
    <p>
      Este sitio no utiliza cookies ni tecnologías de rastreo con fines publicitarios o de análisis. Si esto cambia,
      lo indicaremos en este aviso.
    </p>

    <h2>7. Conservación y seguridad</h2>
    <p>
      Conservamos tus datos solo durante el tiempo necesario para las finalidades descritas y para cumplir con
      nuestras obligaciones legales. Aplicamos medidas de seguridad administrativas, técnicas y físicas para
      protegerlos contra daño, pérdida, alteración, uso o acceso no autorizado.
    </p>

    <h2>8. Cambios a este aviso</h2>
    <p>
      Podemos actualizar este aviso por cambios en la ley, en nuestros servicios o en nuestras prácticas. La versión
      vigente siempre estará publicada en esta página, con su fecha de última actualización.
    </p>

    <h2>9. Autoridad</h2>
    <p>
      Si consideras que tu derecho a la protección de datos personales fue vulnerado, puedes acudir ante la
      Secretaría Anticorrupción y Buen Gobierno, autoridad encargada de la protección de datos personales.
    </p>
  </LegalLayout>
</template>

<script setup lang="ts">
import { h, type FunctionalComponent } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import LegalLayout from '@/components/LegalLayout.vue'
import { company } from '@/data/company'
import { legalEntity, privacyUpdated } from '@/data/legal'

usePageMeta({
  title: 'Aviso de privacidad',
  description: 'Aviso de privacidad de A.X.L – Advanced eXponential Logic: qué datos recabamos, para qué los usamos y cómo ejercer tus derechos ARCO.',
  path: '/privacy',
  noindex: true
})

/** Muestra el dato, o "[Por llenar: …]" resaltado si todavía está vacío */
const Fill: FunctionalComponent<{ value: string; label: string }> = (props) =>
  props.value ? props.value : h('mark', { class: 'pending' }, `[Por llenar: ${props.label}]`)
Fill.props = ['value', 'label']
</script>
