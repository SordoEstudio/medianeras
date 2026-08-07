# MEDIANERAS — Design Tokens & Directivas de Sistema Visual
> Generado para Spec Driven Development · Harvi Digital · Julio 2026  
> Fuente: Manual de Marca Chiare Studio + Sistema Visual MEDIANERAS_SISTEMAVISUAL

---

## 1. COLOR TOKENS

### Paleta Principal

| Token | Nombre | HEX | RGB | CMYK | Uso |
|---|---|---|---|---|---|
| `--color-primary` | Verde oscuro / Teal | `#29484C` | 41, 72, 76 | 90,45,50,50 | Fondo oscuro, texto sobre claro, logo principal |
| `--color-secondary` | Verde menta | `#98CBB4` | 152, 203, 180 | 50,0,38,0 | Acentos, líneas decorativas, subrayados de logo |
| `--color-cream` | Crema / Off-white | `#FBF5EC` | 251, 245, 236 | 0,4,9,0 | Fondo principal del sitio, fondos de sección |
| `--color-yellow` | Amarillo mostaza | `#EAB82B` | 234, 184, 43 | 0,30,95,0 | Highlights, badges, stickers, fechas de talleres |
| `--color-red` | Rojo-naranja | `#D94F2D` | 217, 79, 45 | 0,80,85,0 | CTAs principales, acentos de energía, bold copy |
| `--color-olive` | Verde oliva | `#B0B846` | 176, 184, 70 | 40,15,90,0 | Elementos vegetales, variante alternativa |

### Semántica de Color

```css
:root {
  /* Paleta */
  --color-primary:   #29484C;
  --color-secondary: #98CBB4;
  --color-cream:     #FBF5EC;
  --color-yellow:    #EAB82B;
  --color-red:       #D94F2D;
  --color-olive:     #B0B846;

  /* Fondos */
  --bg-default:      var(--color-cream);
  --bg-dark:         var(--color-primary);
  --bg-accent:       var(--color-red);

  /* Texto */
  --text-primary:    var(--color-primary);
  --text-on-dark:    var(--color-cream);
  --text-highlight:  var(--color-red);
  --text-accent:     var(--color-yellow);

  /* UI */
  --cta-bg:          var(--color-red);
  --cta-text:        var(--color-cream);
  --cta-hover-bg:    var(--color-primary);
  --tag-bg:          var(--color-yellow);
  --tag-text:        var(--color-primary);
  --underline-logo:  var(--color-secondary);
}
```

### Patrones de Uso de Color (de las imágenes)

- **Fondo principal del sitio:** `--color-cream` (#FBF5EC)
- **Header/nav:** `--color-primary` (teal oscuro) o `--color-cream`
- **Bloques alternativos de sección:** intercalar `--color-primary` y `--color-cream`
- **CTAs / botones primarios:** `--color-red` con texto `--color-cream`
- **Tags de fecha/taller:** píldora `--color-yellow` con texto `--color-primary`
- **Línea decorativa bajo logo:** `--color-secondary` (verde menta)
- **Bloques de color en grilla:** sistema de 4 colores rotantes — teal, rojo, crema, verde

---

## 2. TIPOGRAFÍA

### Familia

| Token | Familia | Variante | Uso |
|---|---|---|---|
| `--font-primary` | Public Sans | Variable (100–900) | Todo el sitio |

```css
:root {
  --font-primary: 'Public Sans', system-ui, sans-serif;
}
```

> **Import:** Google Fonts — `https://fonts.google.com/specimen/Public+Sans`

### Escala Tipográfica

| Token | px/rem | Weight | Uso |
|---|---|---|---|
| `--text-display` | 64px / 4rem | 800 ExtraBold | Hero headline |
| `--text-h1` | 48px / 3rem | 700 Bold | Títulos de sección |
| `--text-h2` | 32px / 2rem | 700 Bold | Sub-sección, nombre del mes (Agenda) |
| `--text-h3` | 22px / 1.375rem | 700 Bold | Títulos de taller/evento |
| `--text-body-lg` | 18px / 1.125rem | 400 Regular | Copy de presentación |
| `--text-body` | 16px / 1rem | 400 Regular | Copy general |
| `--text-body-sm` | 14px / 0.875rem | 400 Regular | Descripción de talleres |
| `--text-label` | 12px / 0.75rem | 600 SemiBold | Tags, badges, stickers |
| `--text-nav` | 15px / 0.9375rem | 400–500 | Navegación |

### Estilo Tipográfico Visual (del sistema de marca)
- Titulares en lowercase (`medianeras`, `agenda marzo`) — **nunca ALL CAPS para el nombre de marca**
- Mix intencional: peso regular + bold en mismo titular (`Agenda **Marzo**`)
- Stickers circulares con texto en mayúscula rotado (`AMAMOS LEER · AMAMOS LEER`)
- Tagline `Pensar más allá` en bold italic o bold display

---

## 3. FORMAS & ELEMENTOS GRÁFICOS

### Formas Orgánicas (Blobs)
- Dos morfologías principales identificadas en el sistema visual:
  - **Blob tipo hoja/flor abstracta** (izquierda de cada par): figura con brazos redondeados, evoca una hoja de monstera o flor estilizada
  - **Blob tipo paisaje/duna** (derecha de cada par): forma curva horizontal, evoca horizonte o duna
- Se usan como fondos/decorativos en el mismo tono del color base (variación de opacidad ~15-20%)
- **Nunca con borde o stroke**; siempre fill sutil sobre fondo

### Íconos Vegetales / Florales
- Librería de ~30 íconos de flores, hojas, ramas en estilo plano-editorial
- Colores aplicados: teal, amarillo, rojo, verde, verde oliva
- Uso: en grillas, headers de sección, stickers, separadores
- Estilo: trazo grueso orgánico o silueta sólida, nunca foto-realista

### Stickers Circulares
- Formato: círculo con texto rotativo en borde + ícono floral central
- Variantes de texto: `AMAMOS LEER`, `CONOCIMIENTO COMPARTIDO`, `BOOK LOVER`
- Versiones: con fondo claro (sobre oscuro) y con fondo oscuro (sobre claro)
- Diámetro recomendado: mínimo 80px digital

### Logo
- **Logotipo principal:** `medianeras` en Public Sans lowercase, con línea verde menta debajo
- **Ícono:** `m` dentro de cuadrado redondeado con borde
- Área de seguridad: igual al alto de la `m` en todos los lados
- Mínimo digital: 120px de ancho
- **No** alterar colores, proporciones, rotación ni agregar sombras

---

## 4. ESPACIADO & LAYOUT

```css
:root {
  /* Espaciado base (escala 8pt) */
  --space-1:  4px;
  --space-2:  8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  /* Layout */
  --container-max: 1200px;
  --container-padding: var(--space-6);  /* 32px desktop */
  --container-padding-mobile: var(--space-5); /* 24px mobile */

  /* Sección */
  --section-padding-y: var(--space-10); /* 128px desktop */
  --section-padding-y-mobile: var(--space-8); /* 64px mobile */

  /* Border radius */
  --radius-sm:   6px;
  --radius-md:  12px;
  --radius-lg:  24px;
  --radius-pill: 999px;  /* Para tags y botones */
  --radius-card: 16px;
}
```

---

## 5. COMPONENTES BASE

### Botón CTA Principal
```
Background:  --color-red
Color:       --color-cream
Font:        --font-primary, 15px, weight 600
Padding:     12px 28px
Border-radius: --radius-pill
Hover:       background → --color-primary
Transition:  200ms ease
```

### Tag / Badge de Fecha
```
Background:  --color-yellow
Color:       --color-primary
Font:        --font-primary, 13px, weight 600
Padding:     4px 14px
Border-radius: --radius-pill
```

### Card de Taller
```
Background:  --color-cream
Border:      none (o sutil 1px --color-secondary a 30%)
Padding:     32px
Border-radius: --radius-card
Incluye:     ícono floral, tag de fecha, título bold, descripción, botón CTA
```

### Sección Header (estructura)
```
Label superior:  texto pequeño uppercase, --color-secondary o --color-red
Título:          h2, --color-primary o --color-cream (según fondo)
Línea decorativa: 2px solid --color-secondary, ancho fijo ~40px
```

---

## 6. DIRECTIVAS DE COPY & TONO

### Personalidad de Voz
- **Intelectual pero accesible** — no condescendiente
- **Reflexiva y cercana** — habla "desde adentro", no desde un estrado
- **En plural** — usa "pensemos", "construimos", "nos encontramos"
- **Nunca tecnicismos** — "escribir para comunicar" > "producción discursiva"

### Recursos Lingüísticos Clave
- Metáforas de **naturaleza + libros**: "las medianeras no siempre separan, a veces sostienen lo que florece"
- Concepto de **cruce / frontera / puente**: "espacio de cruce entre teoría y práctica"
- **Preguntas abiertas**: "¿Qué libro te cambió la manera de pensar algo?"
- Taglines: `Pensar más allá`, `Amamos leer`, `Conocimiento compartido`, `Book Lover`

### Frases de Marca (Brand Copy)
```
"Las medianeras no siempre separan. A veces sostienen lo que florece."
"Entre páginas también florecen encuentros."
"Lo que leemos nos atraviesa. Lo que conversamos nos transforma."
"Cada libro es una frontera compartida."
"Pensar más allá del límite."
"Donde el conocimiento se conecta."
"Habitar el conocimiento."
```

### Reglas de Copy para Web
- Titulares: breves, con peso emocional y conceptual
- CTAs: propositivos, no imperativos agresivos → "Sumate al taller" > "¡Inscribite ya!"
- Descripciones de talleres: 2-3 líneas máximo, en primera persona plural
- Fechas y datos: formato `16 de octubre · 18:00 h · Dicta: Nombre Apellido`

---

## 7. MOTION & INTERACCIÓN

- **Transiciones:** suaves, 200-300ms ease-in-out
- **Hover en cards:** sutil elevación (box-shadow) o leve scale (1.02)
- **Scroll:** sin parallax agresivo; el contenido respira
- **Blob decorativos:** pueden tener animación muy sutil de morphing (keyframes lentos, 8-12s)
- **No:** animaciones que distraigan del contenido cultural/editorial

---

## 8. STACK TÉCNICO (referencia SDD)

| Capa | Tecnología |
|---|---|
| Framework | Astro SSG |
| Estilos | CSS custom properties + módulos Astro |
| CMS | Custom Harvestech (gestión de talleres) |
| Fuentes | Google Fonts — Public Sans |
| Formularios | CMS propio con integración WhatsApp |
| Deploy | Railway / Cloudflare (por definir) |
| SEO | Básico: meta tags, OG, Schema.org (LocalBusiness + Event) |

---

## 9. CHEKLIST DE CONSISTENCIA VISUAL

- [ ] ¿Usás solo los 6 colores de la paleta?
- [ ] ¿El logo tiene su área de seguridad respetada?
- [ ] ¿El fondo principal es `--color-cream` con secciones alternas en `--color-primary`?
- [ ] ¿Los CTAs son `--color-red` con texto `--color-cream`?
- [ ] ¿Las fechas de talleres usan el tag amarillo?
- [ ] ¿Los íconos florales son de la librería de marca (no genéricos)?
- [ ] ¿El copy usa metáforas de naturaleza/libros y habla en plural?
- [ ] ¿La tipografía es 100% Public Sans?
- [ ] ¿El logo está en lowercase?
