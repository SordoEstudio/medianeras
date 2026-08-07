# Pendientes para publicar — Medianeras

> Estado al 2026-07-26. Sitio funcional en local con datos reales. Faltan los puntos siguientes antes de hacer live.

---

## 🟡 El cliente debe entregar o validar

### Contenido y datos

- [x] **Foto de Perfil** — Sofía aparece con avatar de iniciales. El sitio ya soporta `foto` como URL; solo hace falta subir las imágenes y poner la ruta en `src/data/equipo.json`.
- [ ] **Agregar Redes** - Opcionalmente Sofia puede cargar sus redes profesionales a al card del perfil (ej: Linkedin)
- https://www.linkedin.com/in/sofia-casabella/
- link de ejemplo
- charla en TEDx 
- [ ] **Número de WhatsApp** — Numero de whatsapp del espacio. -Pendiente
- [x] **Confirmar textos institucionales** — los textos de "Quiénes somos", "Historia" y "Filosofía" Sofía debe leer y aprobar que son la versión final.
- [x] **Validar testimonios** — los 8 testimonios están anonimizados como "Participante de Medianeras". Confirmar que se pueden publicar tal cual.

### Decisiones de negocio
- [x] **Revisar modelo de actividades** — confirmar que fechas, precios y cupos de los 7 talleres en `src/data/actividades.json` son correctos y están al día.


- [x] **¿Cómo recibir inscripciones?** — el formulario de inscripción existe pero está en modo simulado. Hay que elegir una de estas dos opciones (ver sección de devs abajo) y notificar a los desarrolladores.
- [x] Validar campos de inscripcion y flujo.
Validar campos de actividades.
- [x] **Dominio** — Confirmado dominio propio: `medianeras.com.ar`

---

## 🔵 Los desarrolladores debemos hacer

### Bloqueantes para publicar

- [x] **Formulario de inscripción — conectar destino real**
Validar un flujo  de inscripciones, que temine en whatsap por el momento.
Validar datos basicos de inscripcion con posibilñidad de agregar (formulario dinamico)
- [x] **Formulario de comentarios — conectar destino real**
El modal "Deja tu comentario" en `SectionTestimonios` muestra pantalla de éxito pero no guarda nada (el `form.addEventListener('submit')` hace `e.preventDefault()` y nada más). 
Validar dats e Implementar en CMS.

- [ ] **Deploy en Vercel**
  El adapter `@astrojs/vercel` ya está configurado. Pendiente:
  - Conectar repositorio en Vercel (si no está hecho).
  - Configurar variables de entorno en el proyecto Vercel (`CMS_URL` si se usa CMS, o las keys del servicio de email).
  - Verificar que el build pasa sin errores.

### Correcciones de correcciones.md

### Mejoras antes del lanzamiento (no bloqueantes pero recomendadas)

- [ ] **Imagen OG / meta social** — el sitio no tiene `og:image` declarada. Conviene agregar una imagen de 1200×630 para compartir en redes.
- [ ] **`descripcionLarga` para actividades restantes** — sin esto el modal de detalle muestra solo la descripción corta, que es poco para actividades de varios encuentros (act-003 Club Harry Potter, act-007 Formación Literatura Infantil, etc.).
- [ ] **Fotos en actividades** — el tipo `Actividad` soporta `imagen` pero ninguna actividad la tiene. No es bloqueante; se puede incorporar después.

---

## Estado actual del sitio

| Sección | Estado |
|---|---|
| Hero | ✅ Completo |
| Quiénes somos | ✅ Completo |
| Equipo (Claudia y Laura) | ⚠️ Falta fotos + decisión de cliente si se muestran |
| Qué hacemos | ✅ Completo |
| Oferta / Propuestas | ✅ Datos reales cargados |
| Testimonios (carrusel) | ✅ Datos reales, anonimizados |
| Formulario comentarios | ❌ UI lista, sin backend |
| Formulario inscripción | ❌ UI lista, sin backend |
| Contacto + mapa | ✅ Completo |
| Footer | ✅ Completo |
| WhatsApp | ❌ Campo vacío en config |
| CMS (Payload) | ⏸ Construido pero no desplegado ni conectado |

Validar campos de talleres:
┌────────────────────┬──────────────────────────────────────────────────|
│       Campo        │                  Ejemplo                         │
├────────────────────┼──────────────────────────────────────────────────┼ 
│ nombre             │ "Medianeras Kids"                                │
├────────────────────┼──────────────────────────────────────────────────┼
│ descripcion        │ 2-4 líneas plain text                            │
├────────────────────┼──────────────────────────────────────────────────|
│ categoria          │ encuentro / club-lectura / taller / capacitacion │
├────────────────────┼──────────────────────────────────────────────────┼
│ audiencia          │ medianeras kids / medianeras juvenil / medianeras|
├────────────────────┼──────────────────────────────────────────────────┼
│ coordina           │ Sofía, Claudia, Laura                            │
├────────────────────┼──────────────────────────────────────────────────┼
│ fechas             │ fecha + hora + duración (min)                    │
├────────────────────┼──────────────────────────────────────────────────┼
│ modalidad          │ presencial / virtual / híbrido                   │
├────────────────────┼──────────────────────────────────────────────────┼
│ precio             │ número en ARS                                    │
└────────────────────┴──────────────────────────────────────────────────┴


La idea es que al ahcer click en inscribirse dejen datos en un formulario (nombre,dni,mail) aqui se mostrara el alias para que la persona pueda ya realizar el pago del evento.
el usuario llene con sus datos, y eso haga dos cosas, uno, pre-inscribirlo en el gestor de contenido del sitio. y otro, derivar a whatsapp para controlar manualmente aqui el pago (en uan proxima etapa se poddria implementar una pasarela de pagos y gestionar als inscripciones automaticamente, manejar cupos, etc)

