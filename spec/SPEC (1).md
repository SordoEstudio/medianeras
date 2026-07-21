# SPEC.md — Medianeras Web · Especificación Técnica
> Referencia técnica para agentes de código y desarrolladores.
> Leer AGENTS.md y REQUIREMENTS.md primero.

---

## 1. Tipos de datos

### Taller (actividad)

```typescript
// src/lib/types.ts

export type Modalidad = 'presencial' | 'virtual' | 'hibrido';
export type Categoria = 'taller' | 'encuentro' | 'capacitacion' | 'contenido-gratuito';
export type EstadoActividad = 'activo' | 'proximamente' | 'cerrado';

export interface Docente {
  id: string;
  nombre: string;
  bio: string;          // 1-2 oraciones
  foto?: string;        // URL relativa o absoluta
}

export interface Actividad {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;  // 2-4 líneas. Plain text, no markdown.
  descripcionLarga?: string;  // Para modal expandido. Markdown permitido.
  categoria: Categoria;
  docente: Docente;
  fechas: FechaActividad[];
  modalidad: Modalidad;
  precio?: number;      // undefined = gratuito
  cupos?: number;       // undefined = sin límite
  estado: EstadoActividad;
  imagen?: string;
  destacada: boolean;   // aparece primero en la grilla
  publishedAt: string;  // ISO 8601
}

export interface FechaActividad {
  fecha: string;        // ISO 8601 date
  hora: string;        // "18:30"
  duracion?: number;   // minutos
}

export interface Integrante {
  id: string;
  nombre: string;
  rol: string;          // "Co-fundadora", "Docente invitada", etc.
  bio: string;
  foto?: string;
  instagram?: string;
}

export interface ConfigSitio {
  quienesSomos: string;       // Markdown
  historia: string;           // Markdown
  filosofia: string;          // Markdown
  emailContacto: string;
  whatsapp: string;           // número sin formato, ej: "5493412345678"
  instagram: string;          // "@handle"
  direccion: string;
  coordenadas: { lat: number; lng: number };
  fotoFrente?: string;
}

export interface Inscripcion {
  id: string;
  actividadId: string;
  nombre: string;
  email: string;
  mensaje?: string;
  creadaEn: string;   // ISO 8601
}
```

---

## 2. Mock data

> `USE_MOCK=true` en `.env.development` activa estos datos.
> Todo el código que llama al CMS pasa por `src/lib/cms.ts`, que redirige a mock si el flag está activo.

### mock/talleres.ts

```typescript
// mock/talleres.ts
import type { Actividad, Docente } from '../src/lib/types';

const DOCENTES: Record<string, Docente> = {
  laura: {
    id: 'laura-benitez',
    nombre: 'Laura Benítez',
    bio: 'Licenciada en Letras (UBA). Coordina talleres de escritura autobiográfica y ficción breve desde 2018.',
    foto: '/mock/fotos/laura.jpg',
  },
  martin: {
    id: 'martin-quiroga',
    nombre: 'Martín Quiroga',
    bio: 'Arquitecto y ensayista. Investiga la ciudad como texto y los espacios como narradores silenciosos.',
    foto: '/mock/fotos/martin.jpg',
  },
  sofia: {
    id: 'sofia-montalvo',
    nombre: 'Sofía Montalvo',
    bio: 'Editora y lectora compulsiva. Coordina el club de lectura desde que Medianeras abrió sus puertas.',
    foto: '/mock/fotos/sofia.jpg',
  },
  paula: {
    id: 'paula-ferrer',
    nombre: 'Paula Ferrer',
    bio: 'Crítica cultural y columnista. Escribe sobre arte contemporáneo, literatura y procesos creativos.',
    foto: '/mock/fotos/paula.jpg',
  },
};

export const ACTIVIDADES_MOCK: Actividad[] = [
  {
    id: 'act-001',
    slug: 'escritura-en-el-borde-1',
    nombre: 'Escritura en el borde',
    descripcion: 'Un taller para explorar la escritura como espacio de cruce. Trabajaremos a partir de textos breves y ejercicios prácticos que invitan a habitar el límite entre lo íntimo y lo compartido.',
    descripcionLarga: `
## Sobre el taller

La escritura autobiográfica no es confesar: es construir. En este encuentro vamos a trabajar con textos cortos —fragmentos, escenas, apuntes— para explorar qué pasa cuando lo personal se vuelve escritura y la escritura se vuelve algo de todos.

**Dinámica:** cada encuentro combina lectura de referentes y escritura en tiempo real. Los textos producidos se comparten al grupo de forma voluntaria.

**No necesitás experiencia previa.** Solo ganas de escribir y cierta disposición a dejarte sorprender por lo que sale.
    `.trim(),
    categoria: 'taller',
    docente: DOCENTES.laura,
    fechas: [
      { fecha: '2026-08-12', hora: '18:30', duracion: 90 },
      { fecha: '2026-08-19', hora: '18:30', duracion: 90 },
      { fecha: '2026-08-26', hora: '18:30', duracion: 90 },
    ],
    modalidad: 'presencial',
    precio: 15000,
    cupos: 12,
    estado: 'activo',
    destacada: true,
    publishedAt: '2026-07-01T00:00:00Z',
  },
  {
    id: 'act-002',
    slug: 'la-ciudad-como-texto',
    nombre: 'La ciudad como texto',
    descripcion: 'Un recorrido teórico-práctico para pensar la ciudad como texto. Analizaremos fragmentos literarios y arquitectónicos para descubrir cómo los espacios también narran.',
    categoria: 'taller',
    docente: DOCENTES.martin,
    fechas: [
      { fecha: '2026-08-19', hora: '17:00', duracion: 120 },
    ],
    modalidad: 'presencial',
    precio: 12000,
    cupos: 15,
    estado: 'activo',
    destacada: false,
    publishedAt: '2026-07-01T00:00:00Z',
  },
  {
    id: 'act-003',
    slug: 'club-fronteras-compartidas',
    nombre: 'Club de lectura: Fronteras compartidas',
    descripcion: 'Un espacio de diálogo en torno a relatos que abordan la idea de límite, territorio y encuentro. Lectura previa sugerida y conversación abierta.',
    categoria: 'encuentro',
    docente: DOCENTES.sofia,
    fechas: [
      { fecha: '2026-08-14', hora: '19:00', duracion: 90 },
    ],
    modalidad: 'presencial',
    precio: undefined,
    cupos: 20,
    estado: 'activo',
    destacada: true,
    publishedAt: '2026-07-01T00:00:00Z',
  },
  {
    id: 'act-004',
    slug: 'conversaciones-en-la-medianera',
    nombre: 'Conversaciones en la medianera',
    descripcion: 'Un encuentro distendido para intercambiar miradas sobre cultura contemporánea y procesos creativos. Una charla abierta donde las ideas circulan y se construyen en comunidad.',
    categoria: 'encuentro',
    docente: DOCENTES.paula,
    fechas: [
      { fecha: '2026-08-26', hora: '18:00', duracion: 90 },
    ],
    modalidad: 'hibrido',
    precio: undefined,
    estado: 'activo',
    destacada: false,
    publishedAt: '2026-07-01T00:00:00Z',
  },
  {
    id: 'act-005',
    slug: 'escribir-para-comunicar',
    nombre: 'Escribir para comunicar',
    descripcion: 'Una capacitación práctica para docentes, profesionales y cualquiera que necesite escribir mejor en contextos académicos o laborales. Técnicas de claridad, estructura y registro.',
    categoria: 'capacitacion',
    docente: DOCENTES.laura,
    fechas: [
      { fecha: '2026-09-10', hora: '18:00', duracion: 120 },
      { fecha: '2026-09-17', hora: '18:00', duracion: 120 },
    ],
    modalidad: 'virtual',
    precio: 18000,
    cupos: 25,
    estado: 'proximamente',
    destacada: false,
    publishedAt: '2026-07-10T00:00:00Z',
  },
  {
    id: 'act-006',
    slug: 'guia-lectura-critica',
    nombre: 'Guía de lectura crítica',
    descripcion: 'Una guía descargable para leer con más preguntas y mejores herramientas. Incluye ejercicios, referencias y un glosario de términos literarios básicos.',
    categoria: 'contenido-gratuito',
    docente: DOCENTES.sofia,
    fechas: [],
    modalidad: 'virtual',
    precio: undefined,
    estado: 'activo',
    destacada: false,
    publishedAt: '2026-07-01T00:00:00Z',
  },
];
```

### mock/equipo.ts

```typescript
// mock/equipo.ts
import type { Integrante } from '../src/lib/types';

export const EQUIPO_MOCK: Integrante[] = [
  {
    id: 'int-001',
    nombre: 'Valentina Ríos',
    rol: 'Co-fundadora',
    bio: 'Profesora de Literatura y escritora. Empezó Medianeras porque creía que había que hacer de su casa un lugar donde las palabras tuvieran más espacio que los muebles.',
    foto: '/mock/fotos/valentina.jpg',
    instagram: '@vale.rios.letras',
  },
  {
    id: 'int-002',
    nombre: 'Lucía Gómez',
    rol: 'Co-fundadora',
    bio: 'Comunicadora y editora cultural. Lleva años convirtiendo lecturas en conversaciones y conversaciones en comunidad.',
    foto: '/mock/fotos/lucia.jpg',
    instagram: '@luciag_cultura',
  },
];
```

### mock/config.ts

```typescript
// mock/config.ts
import type { ConfigSitio } from '../src/lib/types';

export const CONFIG_MOCK: ConfigSitio = {
  quienesSomos: `
Medianeras nació de una conversación entre dos amigas que compartían libros y se preguntaban por qué no había más espacios para hacer eso en voz alta.

Somos un espacio cultural que funciona desde una casa en [ciudad]. Acá los libros son excusa para pensar, escribir, intercambiar y construir algo juntos.
  `.trim(),

  historia: `
Todo empezó en 2022, cuando Valentina y Lucía organizaron el primer encuentro de lectura en el living de casa. Vinieron ocho personas. Ninguna se conocía. Todas volvieron.

Desde entonces no paramos. Lo que empezó como un club de lectura se fue transformando en un espacio más amplio: talleres, capacitaciones, charlas, encuentros con autores. Siempre con el mismo espíritu: que el conocimiento sea algo que se comparte, no que se acumula.
  `.trim(),

  filosofia: `
Creemos en la formación interdisciplinaria, en el pensamiento crítico y en la idea de que aprender juntos es siempre más interesante que aprender solos.

No hablamos desde un lugar de "experto que enseña", sino desde: *pensemos esto juntos*.
  `.trim(),

  emailContacto: 'hola@medianeras.com.ar',
  whatsapp: '5493412345678',
  instagram: '@medianeras',
  direccion: 'Calle Los Libros 1234, Ciudad, Provincia',
  coordenadas: { lat: -31.4167, lng: -64.1833 },
  fotoFrente: '/mock/fotos/frente.jpg',
};
```

---

## 3. CMS API — cliente con fallback a mock

```typescript
// src/lib/cms.ts
import type { Actividad, Integrante, ConfigSitio } from './types';

const USE_MOCK = import.meta.env.USE_MOCK === 'true';
const CMS_URL  = import.meta.env.CMS_URL || 'http://localhost:3001';

// ── Actividades ──────────────────────────────────────────────────────────────

export async function getActividades(): Promise<Actividad[]> {
  if (USE_MOCK) {
    const { ACTIVIDADES_MOCK } = await import('../../mock/talleres');
    return ACTIVIDADES_MOCK;
  }
  const res = await fetch(`${CMS_URL}/api/actividades?limit=100&where[estado][not_equals]=borrador`);
  if (!res.ok) throw new Error(`CMS error: ${res.status}`);
  const data = await res.json();
  return data.docs as Actividad[];
}

export async function getActividadBySlug(slug: string): Promise<Actividad | null> {
  const todas = await getActividades();
  return todas.find(a => a.slug === slug) ?? null;
}

// ── Equipo ───────────────────────────────────────────────────────────────────

export async function getEquipo(): Promise<Integrante[]> {
  if (USE_MOCK) {
    const { EQUIPO_MOCK } = await import('../../mock/equipo');
    return EQUIPO_MOCK;
  }
  const res = await fetch(`${CMS_URL}/api/equipo?limit=20`);
  const data = await res.json();
  return data.docs as Integrante[];
}

// ── Config ───────────────────────────────────────────────────────────────────

export async function getConfig(): Promise<ConfigSitio> {
  if (USE_MOCK) {
    const { CONFIG_MOCK } = await import('../../mock/config');
    return CONFIG_MOCK;
  }
  const res = await fetch(`${CMS_URL}/api/globals/config`);
  const data = await res.json();
  return data as ConfigSitio;
}

// ── Inscripciones (POST) ─────────────────────────────────────────────────────

export interface InscripcionInput {
  actividadId: string;
  nombre: string;
  email: string;
  mensaje?: string;
}

export async function crearInscripcion(input: InscripcionInput): Promise<{ ok: boolean; id?: string }> {
  if (USE_MOCK) {
    // Simular latencia y éxito
    await new Promise(r => setTimeout(r, 600));
    return { ok: true, id: `mock-${Date.now()}` };
  }
  const res = await fetch(`${CMS_URL}/api/inscripciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) return { ok: false };
  const data = await res.json();
  return { ok: true, id: data.doc.id };
}
```

---

## 4. Tokens CSS

```css
/* src/styles/tokens.css — importar en Layout.astro */

:root {
  /* Paleta Medianeras (Chiare Studio) */
  --color-primary:   #29484C;  /* teal oscuro */
  --color-secondary: #98CBB4;  /* verde menta */
  --color-cream:     #FBF5EC;  /* crema */
  --color-yellow:    #EAB82B;  /* mostaza */
  --color-red:       #D94F2D;  /* rojo-naranja */
  --color-olive:     #B0B846;  /* oliva */

  /* Semántica */
  --bg-site:         var(--color-cream);
  --bg-dark:         var(--color-primary);
  --text-main:       var(--color-primary);
  --text-muted:      #6B7280;
  --text-on-dark:    var(--color-cream);
  --cta-bg:          var(--color-red);
  --cta-text:        var(--color-cream);
  --tag-fecha-bg:    var(--color-yellow);
  --tag-fecha-text:  var(--color-primary);
  --accent-line:     var(--color-secondary);

  /* Tipografía */
  --font-sans:       'Public Sans', system-ui, sans-serif;
  --text-display:    clamp(2.5rem, 6vw, 4rem);
  --text-h1:         clamp(2rem, 4vw, 3rem);
  --text-h2:         clamp(1.5rem, 3vw, 2rem);
  --text-h3:         1.375rem;
  --text-body-lg:    1.125rem;
  --text-body:       1rem;
  --text-sm:         0.875rem;
  --text-xs:         0.75rem;

  /* Espaciado */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.5rem;
  --space-6:  2rem;
  --space-7:  3rem;
  --space-8:  4rem;
  --space-9:  6rem;
  --space-10: 8rem;

  /* Layout */
  --container-max:     1200px;
  --container-px:      var(--space-6);
  --section-py:        var(--space-10);

  /* Radios */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   24px;
  --radius-pill: 999px;
  --radius-card: 16px;

  /* Sombras */
  --shadow-card: 0 2px 16px rgba(41, 72, 76, 0.08);
  --shadow-modal: 0 8px 40px rgba(41, 72, 76, 0.18);

  /* Transiciones */
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   400ms ease;
}

@media (max-width: 768px) {
  :root {
    --container-px:  var(--space-5);
    --section-py:    var(--space-8);
  }
}
```

---

## 5. Colecciones Payload CMS

```typescript
// cms/collections/Talleres.ts
import type { CollectionConfig } from 'payload';

export const Talleres: CollectionConfig = {
  slug: 'actividades',
  labels: { singular: 'Actividad', plural: 'Actividades' },
  admin: {
    useAsTitle: 'nombre',
    description: 'Talleres, encuentros, capacitaciones y contenido gratuito.',
    defaultColumns: ['nombre', 'categoria', 'estado', 'fechas'],
  },
  fields: [
    { name: 'nombre', type: 'text', label: 'Nombre de la actividad', required: true },
    {
      name: 'categoria',
      type: 'select',
      label: 'Categoría',
      required: true,
      options: [
        { label: 'Taller', value: 'taller' },
        { label: 'Encuentro', value: 'encuentro' },
        { label: 'Capacitación', value: 'capacitacion' },
        { label: 'Contenido gratuito', value: 'contenido-gratuito' },
      ],
    },
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      required: true,
      defaultValue: 'activo',
      options: [
        { label: 'Activo (visible en el sitio)', value: 'activo' },
        { label: 'Próximamente (visible pero sin inscripción)', value: 'proximamente' },
        { label: 'Cerrado (sin cupos)', value: 'cerrado' },
        { label: 'Borrador (no visible)', value: 'borrador' },
      ],
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción corta',
      admin: { description: 'Se muestra en la card. Máximo 3 líneas.' },
      required: true,
    },
    {
      name: 'descripcionLarga',
      type: 'richText',
      label: 'Descripción completa',
      admin: { description: 'Se muestra al abrir el detalle de la actividad. Podés usar texto con formato.' },
    },
    {
      name: 'docente',
      type: 'relationship',
      label: 'Docente a cargo',
      relationTo: 'equipo',
      required: true,
    },
    {
      name: 'fechas',
      type: 'array',
      label: 'Fechas y horarios',
      fields: [
        { name: 'fecha', type: 'date', label: 'Fecha', required: true },
        { name: 'hora', type: 'text', label: 'Hora (ej: 18:30)', required: true },
        { name: 'duracion', type: 'number', label: 'Duración (minutos)', admin: { description: 'Opcional' } },
      ],
    },
    {
      name: 'modalidad',
      type: 'select',
      label: 'Modalidad',
      required: true,
      options: [
        { label: 'Presencial', value: 'presencial' },
        { label: 'Virtual', value: 'virtual' },
        { label: 'Híbrido (presencial + virtual)', value: 'hibrido' },
      ],
    },
    {
      name: 'precio',
      type: 'number',
      label: 'Precio (ARS)',
      admin: { description: 'Dejá vacío si la actividad es gratuita.' },
    },
    {
      name: 'cupos',
      type: 'number',
      label: 'Cupos disponibles',
      admin: { description: 'Dejá vacío si no hay límite de cupos.' },
    },
    {
      name: 'destacada',
      type: 'checkbox',
      label: 'Destacar esta actividad',
      defaultValue: false,
      admin: { description: 'Las actividades destacadas aparecen primero en el sitio.' },
    },
    {
      name: 'imagen',
      type: 'upload',
      label: 'Imagen de la actividad',
      relationTo: 'media',
      admin: { description: 'Opcional. Si no subís imagen, se usa una imagen genérica del espacio.' },
    },
  ],
};
```

```typescript
// cms/collections/Inscripciones.ts
import type { CollectionConfig } from 'payload';

export const Inscripciones: CollectionConfig = {
  slug: 'inscripciones',
  labels: { singular: 'Inscripción', plural: 'Inscripciones' },
  admin: {
    useAsTitle: 'nombre',
    description: 'Personas que se inscribieron desde el sitio. Solo lectura.',
    defaultColumns: ['nombre', 'email', 'actividad', 'createdAt'],
  },
  access: {
    create: () => true,   // API pública para el formulario
    read: ({ req }) => !!req.user,  // Solo admin puede ver
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'nombre', type: 'text', label: 'Nombre completo', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'actividad', type: 'relationship', relationTo: 'actividades', label: 'Actividad', required: true },
    { name: 'mensaje', type: 'textarea', label: 'Mensaje (opcional)' },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        // TODO Etapa 1: enviar email de confirmación vía Resend
        // TODO Etapa 1: notificar a emailContacto de config
      }
    ]
  }
};
```

---

## 6. Astro Action (formulario de inscripción)

```typescript
// src/actions/index.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { crearInscripcion } from '../lib/cms';

export const server = {
  inscribirse: defineAction({
    accept: 'form',
    input: z.object({
      actividadId: z.string().min(1),
      nombre: z.string().min(2, 'Escribí tu nombre completo'),
      email: z.string().email('El email no parece válido'),
      mensaje: z.string().optional(),
    }),
    handler: async (input) => {
      const result = await crearInscripcion(input);
      if (!result.ok) {
        throw new Error('No pudimos registrar tu inscripción. Intentá de nuevo o escribinos por WhatsApp.');
      }
      return { id: result.id };
    }
  })
};
```

---

## 7. Secciones de la One Page

```
index.astro
  └── Layout.astro
        ├── <Navbar />            — fija, anclas, hamburguesa mobile
        ├── <SectionHero />       — frase de marca + CTA a "qué ofrecemos"
        ├── <SectionQuienes />    — equipo, historia, foto del espacio
        ├── <SectionQueHacemos /> — 4 áreas con íconos florales
        ├── <SectionOferta />     — filtro + grilla de cards de actividades
        │     └── <ActividadCard />
        │           └── <ModalInscripcion /> (dialog nativo)
        ├── <SectionContacto />   — mapa, dirección, links de contacto
        └── <Footer />
```

### Jerarquía de componentes clave

```
SectionOferta
  props: actividades: Actividad[]
  estado local: categoriaActiva (Categoria | 'todas')

  FiltroCategoria
    props: activa, onChange

  ActividadCard
    props: actividad: Actividad
    emits: onInscribirse(actividadId)

  ModalInscripcion
    props: actividad: Actividad | null, onClose
    usa: Astro Action `inscribirse`
    estados: idle | loading | success | error
```

---

## 8. Variables de entorno

```bash
# .env.development
USE_MOCK=true
CMS_URL=http://localhost:3001
PUBLIC_GOOGLE_MAPS_KEY=   # opcional en desarrollo

# .env.production
USE_MOCK=false
CMS_URL=https://cms.medianeras.com.ar
PUBLIC_GOOGLE_MAPS_KEY=AIzaSy...
PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 9. Checklist pre-deploy Etapa 1

- [ ] `USE_MOCK=false` en producción
- [ ] Payload CMS corriendo en Railway con DB PostgreSQL
- [ ] Variables de entorno seteadas en Cloudflare Pages
- [ ] Al menos 3 actividades reales cargadas en el CMS
- [ ] Equipo real cargado (fotos, bios)
- [ ] Config del sitio completa (dirección, email, WhatsApp, Instagram)
- [ ] Email de notificación de inscripciones probado end-to-end
- [ ] Lighthouse mobile ≥ 90
- [ ] robots.txt bloqueando `/admin`
- [ ] Google Search Console verificado
- [ ] Schema.org `LocalBusiness` validado con Rich Results Test
