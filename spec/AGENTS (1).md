# AGENTS.md — Medianeras Web
> Leé este archivo completo antes de escribir cualquier línea de código.
> Es el contrato entre vos (agente) y el proyecto.

---

## Proyecto

**Cliente:** Medianeras — espacio cultural de lectura, escritura y pensamiento  
**Estudio de diseño:** Chiare Studio (identidad visual)  
**Desarrollador:** Harvi Digital · Harvestech S.R.L.  
**Tipo:** One Page + CMS autoadministrable  
**Fase actual:** Etapa 1 — MVP con datos mock. Los datos reales llegan del cliente.

---

## Stack

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | Astro 5 | SSG para páginas públicas |
| Lenguaje | TypeScript strict | Sin `any`, sin `as` innecesarios |
| Estilos | CSS custom properties + módulos Astro | Sin Tailwind. Tokens en `src/styles/tokens.css` |
| CMS | Payload CMS 3 (self-hosted) | Panel en `/admin` para la cliente |
| Base de datos | PostgreSQL vía Railway | Solo para CMS (talleres, inscripciones) |
| Deploy | Railway (backend) + Cloudflare Pages (frontend) | |
| Formularios | Astro Actions + fetch al CMS API | |
| Fuente | Public Sans (Google Fonts) | Variable font, carga con `font-display: swap` |

---

## Estructura de carpetas

```
medianeras/
├── AGENTS.md              ← este archivo
├── REQUIREMENTS.md        ← qué hay que construir
├── SPEC.md                ← cómo construirlo
├── mock/                  ← datos ficticios para desarrollo
│   ├── talleres.ts
│   ├── equipo.ts
│   └── config.ts
├── skills/
│   ├── medianeras-brand/SKILL.md
│   ├── medianeras-content/SKILL.md
│   └── medianeras-cms/SKILL.md
├── src/
│   ├── styles/
│   │   └── tokens.css     ← fuente única de tokens
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   └── index.astro    ← one page
│   └── lib/
│       ├── cms.ts         ← cliente del CMS API
│       └── types.ts       ← tipos compartidos
└── cms/                   ← Payload CMS (subcarpeta o repo separado)
    ├── collections/
    │   ├── Talleres.ts
    │   ├── Equipo.ts
    │   └── Inscripciones.ts
    └── payload.config.ts
```

---

## Reglas obligatorias

### Código
- **Un componente = un archivo.** No mezclar lógica de secciones distintas.
- **Los tokens de color y tipografía SOLO en `tokens.css`.** Nunca hardcodear `#29484C` en un componente.
- **Tipos siempre explícitos.** Si venís del CMS, usá los tipos generados por Payload.
- **Modo mock primero.** Toda función que llame al CMS debe tener un fallback a `mock/`. El flag es `USE_MOCK=true` en `.env.development`.
- **Sin `console.log` en commits.** Usá `logger.ts` si necesitás debug persistente.

### Contenido
- Los textos de la UI que no vengan del CMS van en `src/content/ui.ts` — nunca inline en componentes.
- Las frases de marca están en `skills/medianeras-brand/SKILL.md`. Consultala antes de escribir copy de UI.

### CMS
- **La cliente no es técnica.** El panel del CMS tiene que ser operable sin ningún conocimiento técnico.
- Cada campo del CMS tiene `label` en español y `description` explicativa.
- Los campos opcionales son opcionales de verdad: no rompan la UI si están vacíos.

---

## Flujo de datos (simplificado)

```
Modo desarrollo:
  Astro → mock/talleres.ts → componentes

Modo producción:
  Astro (build) → Payload CMS API → componentes
  Formularios → fetch POST → Payload CMS → inscripcion guardada en DB
```

---

## Skills disponibles

Antes de tomar decisiones en estas áreas, cargá la skill correspondiente:

| Área | Skill | Cuándo usarla |
|---|---|---|
| Colores, tipografía, estética | `medianeras-brand` | Cualquier decisión visual |
| Tipos de contenido, copy, tono | `medianeras-content` | Al escribir textos o definir campos |
| CMS, colecciones, formularios | `medianeras-cms` | Al tocar Payload o lógica de inscripción |

---

## Lo que NO está en scope de Etapa 1

- Pasarela de pago
- Sección Espacios para alquilar
- Material Plus / Tu Cuadro
- Autenticación de usuarios
- Panel de estadísticas de inscripciones

Ver REQUIREMENTS.md para el detalle completo por etapa.
