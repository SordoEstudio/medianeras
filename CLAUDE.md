# CLAUDE.md — medianeras

Sitio web de **Medianeras** (espacio cultural de lectura) construido con Astro 5 SSG.
Consume contenido desde **CMS Harvi** (CMS multi-cliente) vía API pública, con fallback a datos locales en `src/data/*.json`.

## Stack

- Astro 5 SSG (`output: 'static'`) — todo el fetch ocurre en build time
- TypeScript — sin React, islands con `<script is:inline>`
- Deploy: Vercel (static)

## CMS Harvi

```
PUBLIC_CMS_API     = https://<dominio-cms>/api/public/v1
PUBLIC_CLIENT_SLUG = medianeras
DOMINIO_PROD       = <dominio-produccion.com>
```

Variables de entorno (`.env` local):
```
PUBLIC_CMS_API=https://<dominio-cms>/api/public/v1
PUBLIC_CLIENT_SLUG=medianeras
PUBLIC_SITE_ORIGIN=http://localhost:4321
```

> `PUBLIC_SITE_ORIGIN` es solo para dev local. En Vercel **no se configura** — el CMS usa el dominio de producción.

Cliente CMS en `src/lib/cms.ts`:
```ts
import { createCMSClient } from './cms/index';
export const cms = createCMSClient({
  baseUrl: import.meta.env.PUBLIC_CMS_API,
  clientSlug: import.meta.env.PUBLIC_CLIENT_SLUG,
  defaultHeaders: { Origin: import.meta.env.PUBLIC_SITE_ORIGIN ?? import.meta.env.SITE },
});
```

## Reglas de integración

- **NUNCA** usar `fetch` directo — siempre `getActividades()` / `getEquipo()` / `getConfig()` / `getTestimonios()` de `src/lib/cms.ts`.
- **NUNCA** hacer fetch en el cliente para contenido — solo en frontmatter `.astro`.
- Cuando `PUBLIC_CMS_API` no está configurado, las funciones sirven `src/data/*.json` directamente.
- Formularios de inscripción: actualmente van por WhatsApp. En el futuro: `cms.activities.register()`.
- Deploy trigger: modo `rebuild` en CMS admin.

## Módulos CMS activos

- [x] Actividades (`cms.activities.list()`) → adaptadas a tipo local `Actividad`
- [x] Testimonios (`cms.forms.testimonials('testimonios')`) → adaptados a tipo local `Testimonio`
- [ ] Equipo → pendiente migrar a `cms.components` tipo `equipo`
- [ ] Config sitio → pendiente migrar a `cms.components` tipo `config_sitio`
- [x] Componentes CMS (`cms.components.list({ page_filter })`) — disponible para uso futuro

## Componentes CMS — mapa de `type` → componente Astro

| `type` en CMS | Componente Astro | `Página` CMS / `page_filter` |
|---|---|---|
| *(pendiente definir)* | | |

## Skills de IA disponibles

- `.claude/skills/cms-harvi-astro.md` — patrones Astro SSG con el CMS
- `.claude/skills/cms-harvi-json-format.md` — prefijos de JSON para componentes CMS
- `.claude/skills/cms-harvi-components.md` — flujo sitio → JSON CMS → consumo tipado

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
