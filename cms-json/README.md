# cms-json/

JSON listos para cargar en CMS Harvi admin → Componentes web.
Un archivo por sección. El objeto `data` es lo que se pega en "Editar datos".

## Cómo cargar cada archivo

1. Admin → **Componentes web** → **Nuevo componente**
2. Completar con los campos del wrapper: `name`, `key`, `page`, `type`
3. **Editar datos** → pegar solo el objeto `data` (no el wrapper completo)
4. **Publicar**

## Componentes CMS

| Archivo | `type` | `page` en CMS | `page_filter` en código | Componente Astro |
|---|---|---|---|---|
| `hero.json` | `hero` | `Inicio` | `'Inicio'` | `SectionHero.astro` |
| `quienes-somos.json` | `quienes_somos` | `Quiénes somos` | `'Quiénes somos'` | `SectionQuienes.astro` |
| `sofia-card.json` | `sofia_card` | `Quiénes somos` | `'Quiénes somos'` | `SectionQuienes.astro` |
| `que-hacemos.json` | `que_hacemos` | `Qué hacemos` | `'Qué hacemos'` | `SectionQueHacemos.astro` |
| `contacto.json` | `contacto` | `Contacto` | `'Contacto'` | `SectionContacto.astro` + `Footer.astro` |
| `frases-marquesina.json` | `frases_marquesina` | `Global` | `'Global'` | `Marquee.astro` |

> **contacto** es la única fuente de verdad para email, WhatsApp, Instagram, dirección y mapa.
> Lo consumen tanto `SectionContacto` como `Footer` — editar en un solo lugar.

## Módulos nativos (NO son componentes CMS — no cargar acá)

| Módulo | Endpoint | Función en sitio |
|---|---|---|
| Actividades / propuestas | `GET /activities` | `getActividades()` |
| Testimonios | `GET /forms/testimonios/testimonials` | `getTestimonios()` |

> **Testimonios:** crear formulario con slug `testimonios`, campos `nombre` (text) y `mensaje` (textarea).
> Cada respuesta nueva llega con `visible: false`. Desde Formularios → Respuestas, usar ⭐ para aprobarla.

## Campos internos (prefijo `_`)

Los campos que empiezan con `_` (`_audiencia`, `_coordenadas`, `_mapa_embed`, `_mapa_link`) se guardan en el CMS pero **no aparecen en el formulario dinámico** de edición. Son config interna usada por el componente Astro.

## Pendiente: adaptar componentes Astro para consumir desde CMS

Cuando los componentes estén cargados en el CMS, reemplazar en `src/lib/cms.ts` y en cada componente:
- `getConfig()` → `cms.components.getByType<ContactoData>(components, 'contacto')`
- `getEquipo()` / sofia → `cms.components.getByType<SofiaCardData>(components, 'sofia_card')`
- `SectionHero`, `SectionQueHacemos`, `Marquee` → recibir props desde CMS components
