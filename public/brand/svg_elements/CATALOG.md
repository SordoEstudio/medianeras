# Catálogo SVG — Elementos de Marca Medianeras

Extraídos del sistema visual Chiare Studio (.ai originales en `spec/`).
Usar como `<img src="/brand/svg_elements/...">` o inline.

---

## Círculos con texto (circle/)

Todos ~243×243px. Composición: fondo crema, letras rojas en borde, planta teal al centro, detalles amarillo/verde.

| Archivo | Texto circular | Uso actual |
|---------|----------------|------------|
| `circle/amamos_leer.svg` | AMAMOS LEER | Hero — decoración principal |
| `circle/amamos_leer_2.svg` | AMAMOS LEER (variante) | Disponible |
| `circle/book_lover.svg` | BOOK LOVER | Disponible |
| `circle/conocimiento.svg` | CONOCIMIENTO | Disponible |
| `circle/conocimineto_2.svg` | CONOCIMIENTO (variante) | Disponible |
| `circle/path3381.svg` | MEDIANERAS / marca | SectionQuienes — card Sofía |

---

## Formas orgánicas (raíz)

Un solo path por archivo. Sin texto. Usar como manchas decorativas de fondo o flotantes.

### Teal oscuro `#01464b` → `var(--color-primary)`

| Archivo | Tamaño aprox. | Forma |
|---------|---------------|-------|
| `path3271.svg` | 114×168 | Curva tipo letra |
| `path3277.svg` | 189×168 | Blob ancho tipo planta |
| `path3283.svg` | 134×118 | Blob compacto |
| `path3291.svg` | 149×168 | Multi-curva |
| `path3319.svg` | 144×168 | Blob orgánico |
| `path3323.svg` | 78×168 | Blob estrecho |

### Rojo-naranja `#f84e26` → `var(--color-red)`

| Archivo | Tamaño aprox. | Forma |
|---------|---------------|-------|
| `path3257.svg` | 78×168 | Forma estrecha vertical |
| `path3267.svg` | 185×114 | Mancha horizontal |
| `path3281.svg` | 62×168 | Curva angosta |
| `path3303.svg` | 178×168 | Blob grande |
| `path3327.svg` | 159×168 | Forma orgánica |

### Amarillo `#fab800` → `var(--color-yellow)`

| Archivo | Tamaño aprox. | Forma |
|---------|---------------|-------|
| `path3261.svg` | 156×145 | Blob redondeado | ← Hero flor-1 |
| `path3273.svg` | 208×168 | Blob ancho |
| `path3279.svg` | 105×168 | Forma ondulada |
| `path3317.svg` | 56×168 | Forma alta y fina |
| `path3325.svg` | 206×168 | Blob complejo grande |

### Menta `#50cc90` → `var(--color-secondary)`

| Archivo | Tamaño aprox. | Forma |
|---------|---------------|-------|
| `path3259.svg` | 121×168 | Forma ondulada | ← Hero flor-2 |
| `path3265.svg` | 85×142 | Multi-parte |
| `path3289.svg` | 104×168 | Curva orgánica |
| `path3313.svg` | 121×168 | Forma compleja |
| `path3315.svg` | 188×168 | Blob grande |
| `path3321.svg` | 118×168 | Curva suave |

### Oliva/sage `#adb838` → `var(--color-olive)`

| Archivo | Tamaño aprox. | Forma |
|---------|---------------|-------|
| `path3269.svg` | 68×168 | Forma vertical fina |
| `path3275.svg` | 41×168 | Elemento muy delgado |
| `path3285.svg` | 139×136 | Blob cuadrado | ← Hero flor-3 |
| `path3287.svg` | 166×168 | Forma vertical ondulada |
| `path3377.svg` | 161×168 | Forma compleja |

---

## Mapa de tokens a colores SVG

```
var(--color-primary)   → #01464b (teal oscuro)
var(--color-secondary) → #50cc90 (menta)
var(--color-yellow)    → #fab800
var(--color-olive)     → #adb838
var(--color-red)       → #f84e26
var(--color-cream)     → #fcf4eb (fondo círculos)
```

---

## Componentes reemplazados

| Componente inventado | Reemplazado por |
|----------------------|-----------------|
| `Sticker.astro` en SectionQuienes | `circle/path3381.svg` |
| `Sticker.astro` en SectionHero | `circle/amamos_leer.svg` |
| `FloralIcon` decorativo Hero flor--1 (amarillo) | `path3261.svg` |
| `FloralIcon` decorativo Hero flor--2 (menta) | `path3259.svg` |
| `FloralIcon` decorativo Hero flor--3 (oliva) | `path3285.svg` |

## Componentes inventados que quedan

| Componente | Motivo |
|------------|--------|
| `FloralIcon.astro` | Íconos funcionales de categoría en ActividadCard y SectionQueHacemos |
| `Sticker.astro` | Ya sin uso activo (puede eliminarse cuando se confirme) |
