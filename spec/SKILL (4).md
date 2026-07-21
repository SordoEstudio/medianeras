# SKILL: medianeras-content
> Activar al definir campos de CMS, escribir copy de UI, o modelar tipos de contenido.

---

## Tipos de contenido y su propósito

### Actividad (taller / encuentro / capacitación / contenido gratuito)
El objeto central del sitio. Una actividad es cualquier propuesta que Medianeras ofrece al público.

**Campos y su lógica:**
- `nombre`: breve y con carácter. Ej: "Escritura en el borde", no "Taller de escritura autobiográfica n°3"
- `descripcion` (corta): 2-3 líneas. Qué se hace, no qué se aprende. En segunda persona plural.
- `descripcionLarga`: para el modal. Puede incluir dinámica, qué traer, nivel requerido.
- `categoria`: las 4 categorías son fijas. No crear nuevas sin consultarlo.
- `fechas`: puede ser una sola fecha o múltiples encuentros de un mismo ciclo.
- `precio`: `undefined` = gratuito. El campo vacío en el CMS = gratuito en el sitio.
- `estado`: controla visibilidad e interacción. `borrador` = nunca visible en el sitio.
- `destacada`: máximo 2-3 actividades destacadas a la vez.

### Integrante del equipo
Fundadoras, docentes habituales, colaboradores recurrentes.
- `rol`: libre pero consistente. Ej: "Co-fundadora", "Docente", "Docente invitada".
- `bio`: 1-2 oraciones en tercera persona. Tono cálido, no curricular.
- `foto`: portrait de perfil. Cuadrada o ligeramente vertical. Sin fondos de estudio.

### Config del sitio
Un único Global en el CMS. Textos que cambian rara vez pero que la cliente debe poder editar sin tocar código.
- `quienesSomos`, `historia`, `filosofia`: Markdown. Aceptan formato básico (negrita, cursiva, párrafos).
- Datos de contacto: siempre actualizados. Son los que se muestran en la sección de contacto.

---

## Categorías de actividades

| Valor | Label UI | Descripción |
|---|---|---|
| `taller` | Talleres | Ciclos con encuentros múltiples, hay producción (escribir, leer, ejercitar) |
| `encuentro` | Encuentros | Eventos únicos: charlas, clubs de lectura, conversatorios |
| `capacitacion` | Capacitaciones | Formación con enfoque profesional o académico |
| `contenido-gratuito` | Contenido gratuito | PDFs descargables, guías, recursos sin inscripción |

---

## Datos mock disponibles

**Actividades:** 6 actividades ficticias en `mock/talleres.ts`
- 2 talleres activos (con precio, cupos, múltiples fechas)
- 2 encuentros activos (gratuitos, una fecha)
- 1 capacitación próximamente (virtual, con precio)
- 1 contenido gratuito (PDF descargable)

**Equipo:** 2 integrantes en `mock/equipo.ts`
- Valentina Ríos (co-fundadora)
- Lucía Gómez (co-fundadora)

**Config:** datos de ejemplo en `mock/config.ts`
- Dirección: `[ciudad]` como placeholder
- Coordenadas: referencia genérica (reemplazar con real al lanzar)
- Textos: redactados en el tono de la marca, listos para usar como base

---

## Placeholders para imágenes mock

Hasta tener fotos reales del espacio, usar:
```
/mock/fotos/frente.jpg       → foto del frente del local
/mock/fotos/interior.jpg     → interior del espacio
/mock/fotos/valentina.jpg    → retrato co-fundadora 1
/mock/fotos/lucia.jpg        → retrato co-fundadora 2
/mock/fotos/laura.jpg        → retrato docente
/mock/fotos/martin.jpg       → retrato docente
/mock/fotos/sofia.jpg        → retrato docente
/mock/fotos/paula.jpg        → retrato docente
```

Generar placeholders con `https://placehold.co/400x400/29484C/FBF5EC?text=Foto` durante desarrollo.

---

## Strings de UI (no vienen del CMS)

```typescript
// src/content/ui.ts — fuente de verdad para textos fijos de la interfaz

export const UI = {
  nav: {
    quienes: 'Quiénes somos',
    queHacemos: 'Qué hacemos',
    oferta: 'Propuestas',
    contacto: 'Contacto',
  },
  filtros: {
    todas: 'Todas',
    taller: 'Talleres',
    encuentro: 'Encuentros',
    capacitacion: 'Capacitaciones',
    'contenido-gratuito': 'Contenido gratuito',
  },
  actividad: {
    gratuito: 'Gratuito',
    sinCupos: 'Sin cupos disponibles',
    proximamente: 'Próximamente',
    inscribirse: 'Sumate',
    descargar: 'Descargar gratis',
    presencial: 'Presencial',
    virtual: 'Virtual',
    hibrido: 'Híbrido',
    dicta: 'Dicta:',
  },
  modal: {
    titulo: (nombre: string) => `Inscripción — ${nombre}`,
    submitIdle: 'Confirmar inscripción',
    submitLoading: 'Enviando...',
    successTitle: 'Ya estás anotada',
    successMsg: 'Te escribimos al mail que dejaste para confirmar los detalles. Cualquier duda, escribinos por WhatsApp.',
    errorMsg: 'No pudimos registrar tu inscripción. Intentá de nuevo o escribinos por WhatsApp.',
  },
  empty: {
    sinActividades: (categoria: string) => `No hay ${categoria} disponibles por el momento. Seguinos en Instagram para enterarte de las próximas.`,
  },
};
```
