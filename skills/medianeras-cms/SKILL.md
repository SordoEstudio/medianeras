---
name: medianeras-cms
description: Capa de datos y Payload CMS de Medianeras. Activar al trabajar con colecciones, formularios de inscripción, modo mock, Astro Actions o emails Resend.
---

# SKILL: medianeras-cms
> Activar al trabajar con Payload CMS, formularios de inscripción, o la capa de datos.

---

## Arquitectura de datos

```
Payload CMS (Railway)
  Collections:
    actividades     → talleres, encuentros, capacitaciones, contenido gratuito
    equipo          → integrantes y docentes
    inscripciones   → registros de formularios (solo lectura para la cliente)
    media           → imágenes subidas

  Globals:
    config          → textos del sitio, contacto, coordenadas

Astro (Cloudflare Pages)
  Build-time: fetch a Payload API → páginas estáticas
  Runtime: Astro Actions → POST a Payload API (inscripciones)
```

---

## Reglas del CMS

### Para el panel (UX de la cliente)
- Todo label en **español**
- Toda `description` explica **para qué** sirve el campo, no qué tipo de dato es
- Campos con valores por defecto sensatos (estado: 'activo', destacada: false)
- Campos opcionales claramente señalados como "Opcional" en la description
- La colección `inscripciones` es **read-only** para la cliente (no puede borrar ni editar)

### Para el API
- Endpoint base: `${CMS_URL}/api`
- Actividades públicas: `GET /api/actividades?where[estado][not_equals]=borrador`
- Config: `GET /api/globals/config`
- Equipo: `GET /api/equipo`
- Inscripciones: `POST /api/inscripciones` (sin autenticación — campo `access.create: () => true`)

### Modo mock
- Activado con `USE_MOCK=true` en `.env.development`
- Toda llamada a CMS pasa por `src/lib/cms.ts`
- En modo mock, las funciones retornan datos de `mock/`
- El POST de inscripción en mock simula 600ms de latencia y retorna `{ ok: true }`
- **Nunca llamar directamente a la API en componentes.** Siempre a través de `src/lib/cms.ts`.

---

## Flujo de inscripción (completo)

```
Usuario clickea "Sumate" en una ActividadCard
  → abre <ModalInscripcion actividad={...} />
  → usuario completa nombre + email + mensaje (opcional)
  → submit dispara Astro Action `inscribirse`
    → validación Zod server-side
    → llama a cms.crearInscripcion()
      → modo mock: delay 600ms → { ok: true }
      → modo prod: POST /api/inscripciones → Payload guarda en DB
        → hook afterChange: envío email vía Resend
    → Action retorna { id } en éxito
  → Modal muestra estado 'success'
    → mensaje: "Ya estás anotada. Te escribimos al mail..."
  → si error: estado 'error' con mensaje humano
```

---

## Email de confirmación (Etapa 1)

Implementar con **Resend** (`resend.com`) en el hook `afterChange` de la colección `inscripciones`.

```typescript
// cms/collections/Inscripciones.ts (hook)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

afterChange: [async ({ doc, operation }) => {
  if (operation !== 'create') return;

  // 1. Email a la persona inscripta
  await resend.emails.send({
    from: 'Medianeras <hola@medianeras.com.ar>',
    to: doc.email,
    subject: `Tu inscripción a ${doc.actividad.nombre}`,
    // template: usar React Email o string HTML
  });

  // 2. Notificación interna a Medianeras
  await resend.emails.send({
    from: 'Medianeras <hola@medianeras.com.ar>',
    to: process.env.ADMIN_EMAIL,
    subject: `Nueva inscripción: ${doc.nombre} → ${doc.actividad.nombre}`,
  });
}]
```

Variables de entorno necesarias:
```
RESEND_API_KEY=re_...
ADMIN_EMAIL=hola@medianeras.com.ar
```

---

## Variables de entorno completas

```bash
# Astro (.env)
USE_MOCK=true                              # true en dev, false en prod
CMS_URL=http://localhost:3001              # URL del Payload CMS
PUBLIC_GOOGLE_MAPS_KEY=                   # opcional
PUBLIC_GA_ID=                             # Google Analytics 4

# Payload CMS (.env en /cms)
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=una-cadena-larga-y-random
RESEND_API_KEY=re_...
ADMIN_EMAIL=hola@medianeras.com.ar
```

---

## Errores comunes

| Error | Causa probable | Solución |
|---|---|---|
| Actividades no aparecen | `estado` = 'borrador' | Cambiar a 'activo' en el CMS |
| Formulario falla silenciosamente | `USE_MOCK` no está en `.env.development` | Agregar `USE_MOCK=true` |
| CMS no conecta en prod | `CMS_URL` incorrecto | Verificar variable de entorno en Cloudflare |
| Email no llega | `RESEND_API_KEY` vacío | Configurar en Railway |
| Campo vacío rompe UI | Campo opcional no manejado | Verificar operador `?.` en todos los campos `optional` del tipo |
