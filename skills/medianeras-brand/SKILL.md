---
name: medianeras-brand
description: Identidad visual de Medianeras (Chiare Studio). Activar antes de cualquier decisión de color, tipografía, componente UI o copy de marca. Paleta de 6 colores, Public Sans, blobs orgánicos, íconos florales, tono plural y reflexivo.
---

# SKILL: medianeras-brand
> Activar antes de cualquier decisión visual, de copy o de componente UI.

---

## Identidad

**Proyecto:** Medianeras — espacio cultural de lectura, escritura y pensamiento  
**Diseño:** Chiare Studio  
**Personalidad:** Intelectual pero accesible · Reflexiva · Cercana · No corporativa

---

## Paleta de color

| Token CSS | HEX | Uso principal |
|---|---|---|
| `--color-primary` | `#29484C` | Teal oscuro. Textos principales, fondos de sección oscura, navbar. |
| `--color-secondary` | `#98CBB4` | Verde menta. Línea decorativa bajo logo, acentos sutiles. |
| `--color-cream` | `#FBF5EC` | Crema. Fondo principal del sitio, texto sobre fondos oscuros. |
| `--color-yellow` | `#EAB82B` | Mostaza. Tags de fecha, badges, stickers, highlights. |
| `--color-red` | `#D94F2D` | Rojo-naranja. CTAs, botones primarios, acentos de energía. |
| `--color-olive` | `#B0B846` | Oliva. Elementos vegetales, variante decorativa. |

**Reglas:**
- Fondo principal: `--color-cream`
- Secciones alternadas oscuras: `--color-primary`
- Botón primario: `--color-red` con texto `--color-cream`
- Badge de fecha: `--color-yellow` con texto `--color-primary`
- Nunca usar colores fuera de esta paleta. Nunca hardcodear HEX en componentes.

---

## Tipografía

**Familia única:** Public Sans (Google Fonts, variable)

| Uso | Tamaño | Peso |
|---|---|---|
| Hero / display | `clamp(2.5rem, 6vw, 4rem)` | 800 |
| H1 sección | `clamp(2rem, 4vw, 3rem)` | 700 |
| H2 sub-sección | `clamp(1.5rem, 3vw, 2rem)` | 700 |
| H3 card/taller | `1.375rem` | 700 |
| Body principal | `1rem` | 400 |
| Labels / tags | `0.75rem` | 600 |

**Reglas:**
- El nombre de la marca siempre en **lowercase**: `medianeras`
- Mezcla intencional de peso en titulares: `Agenda **Agosto**`
- Nunca usar otra tipografía

---

## Elementos gráficos

### Blobs orgánicos
- Formas con relleno en el mismo tono del fondo (15-20% más oscuro/claro), sin borde
- Dos morfologías: "hoja/flor" y "duna/horizonte"
- Uso decorativo de fondo, nunca sobre texto importante

### Íconos florales
- Librería de ~30 íconos de flores/hojas/ramas estilo plano
- Colores de la paleta: teal, amarillo, rojo, verde, oliva
- Nunca fotorrealistas, nunca con trazo fino genérico

### Stickers circulares
- Texto rotativo en borde: `AMAMOS LEER`, `CONOCIMIENTO COMPARTIDO`, `BOOK LOVER`
- Ícono floral central
- Usar en decoración de secciones y cards destacadas

### Logo
- Logotipo: `medianeras` en Public Sans lowercase + línea `--color-secondary` debajo
- Ícono: `m` en cuadrado redondeado con borde
- Área de seguridad: 1× altura de la `m` en todos los lados
- Mínimo digital: 120px de ancho
- **Nunca** rotar, deformar, cambiar colores, agregar sombras

---

## Copy y tono

### Voz de la marca
- Hablar en **plural**: "pensemos", "construimos", "nos encontramos"
- Académico pero accesible: nunca tecnicismos innecesarios
- No desde "el experto que enseña", sino desde "pensemos juntos"
- Invitar a la conversación, no proclamar

### Metáforas recurrentes
- Naturaleza + libros: flores, fronteras, puentes, raíces
- Cruce / límite / encuentro como conceptos positivos

### Frases de marca (usar en UI cuando aplique)
```
"Pensar más allá"
"Amamos leer"
"Conocimiento compartido"
"Las medianeras no siempre separan. A veces sostienen lo que florece."
"Entre páginas también florecen encuentros."
"Lo que leemos nos atraviesa. Lo que conversamos nos transforma."
"Cada libro es una frontera compartida."
"Habitar el conocimiento."
"Donde el conocimiento se conecta."
```

### Reglas de copy UI
- CTAs propositivos: "Sumate al taller" > "¡Inscribite ya!"
- Formato de fecha: `12 de agosto · 18:30 h`
- Docente: `Dicta: Nombre Apellido`
- Precio: `$15.000` o `Gratuito` (nunca "GRATIS" en mayúscula)
- Modalidad: `Presencial` / `Virtual` / `Híbrido`
- Error de formulario: mensaje humano, no técnico

---

## Anti-patterns (nunca hacer)

- Fondo blanco puro (`#FFFFFF`) — usar `--color-cream`
- Sombras negras duras — usar `--shadow-card` del token
- Botones en colores que no sean `--color-red` o `--color-primary`
- Tipografía distinta a Public Sans
- Íconos genéricos de UI libraries (Heroicons, Lucide) para elementos decorativos de la marca — usar la librería floral
- Copy en tono "plataforma" o "tech startup"
- Texto en ALL CAPS para el nombre `medianeras`
