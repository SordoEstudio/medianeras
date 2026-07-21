# REQUIREMENTS.md — Medianeras Web
> Requerimientos funcionales. Cada ítem es un checkbox de aceptación.
> Estado: `[ ]` pendiente · `[x]` completo · `[~]` en progreso

---

## Etapa 1 — MVP (julio 2026)

### R01 · Sección: Quiénes somos
- [ ] Mostrar nombre y foto de cada fundadora
- [ ] Mostrar descripción breve del espacio (texto configurable desde CMS)
- [ ] Mostrar historia breve del proyecto (texto configurable desde CMS)
- [ ] Mostrar concepto "espacio cultural en casa" con imagen del local
- [ ] Diseño con impronta humana y cercana (no corporativa)

### R02 · Sección: Qué hacemos
- [ ] Mostrar filosofía de trabajo (texto configurable desde CMS)
- [ ] Mostrar las 4 áreas de propuesta: lectura, pensamiento, comunicación, cultura
- [ ] Cada área con ícono de la librería floral de la marca
- [ ] Tono narrativo visible en el copy (no descriptivo funcional)

### R03 · Sección: Qué ofrecemos (FOCO COMERCIAL)
- [ ] Filtro por categoría: Talleres / Encuentros / Capacitaciones / Contenido gratuito
- [ ] Card por actividad con: nombre, descripción corta, docente, fecha, modalidad, botón de inscripción
- [ ] Estado de actividad: activo / próximamente / cerrado (sin cupos)
- [ ] Badge de fecha con estilo de la marca (fondo amarillo)
- [ ] Indicador de modalidad: presencial / virtual / híbrido
- [ ] Botón de inscripción abre modal de formulario (sin redirección)
- [ ] Si no hay actividades en una categoría: mensaje amigable (no error)

### R04 · Formulario de inscripción
- [ ] Campos: nombre completo, email, actividad (pre-seleccionada), mensaje opcional
- [ ] Validación client-side antes de enviar
- [ ] Envío al CMS vía Astro Action
- [ ] Respuesta de éxito con mensaje de la marca (no "Formulario enviado")
- [ ] Respuesta de error con mensaje claro y no técnico
- [ ] Notificación por email a la dirección configurada en CMS (Resend o similar)
- [ ] Sin captcha en MVP (agregar si hay spam)

### R05 · Sección: Dónde nos ubicás
- [ ] Foto del frente del local (desde CMS)
- [ ] Mapa con geolocalización (embed Google Maps o Leaflet)
- [ ] Dirección
- [ ] Email (clickeable: `mailto:`)
- [ ] Teléfono / WhatsApp (clickeable: `wa.me/`)
- [ ] Instagram (link a perfil)

### R06 · Navegación y estructura
- [ ] Navbar fija con anclas a cada sección
- [ ] Logo de Medianeras en navbar
- [ ] Menú hamburguesa en mobile
- [ ] Scroll suave entre secciones
- [ ] Footer con datos de contacto y redes

### R07 · CMS — Panel de administración
- [ ] Colección Talleres: alta, edición, baja de actividades
- [ ] Colección Equipo: gestión de integrantes/docentes
- [ ] Colección Config: textos generales del sitio (quiénes somos, filosofía, etc.)
- [ ] Colección Inscripciones: lista de inscriptos por actividad (read-only para la cliente)
- [ ] Panel en `/admin` protegido por usuario/contraseña
- [ ] Cada campo con label en español y descripción explicativa
- [ ] Preview antes de publicar (deseable en MVP, obligatorio en Etapa 2)

### R08 · Performance y SEO
- [ ] Lighthouse Performance ≥ 90 en mobile
- [ ] Meta tags: title, description, OG image por sección
- [ ] Favicon y PWA manifest básico
- [ ] Schema.org: `LocalBusiness` + `Event` por cada actividad publicada
- [ ] Google Analytics 4 (con consentimiento básico)
- [ ] Sitemap XML generado en build
- [ ] robots.txt: bloquear `/admin`

### R09 · Adaptación mobile
- [ ] Mobile-first: diseño base en 375px, breakpoints en 768px y 1200px
- [ ] Imágenes con `srcset` y formatos webp/avif
- [ ] No hay scroll horizontal en ningún viewport
- [ ] Touch targets mínimos de 44px

---

## Etapa 2 — Expansión (post-lanzamiento)

- [ ] Sección Espacios: imágenes y detalles de los 2 ambientes para alquilar
- [ ] Formulario de consulta de disponibilidad de espacios
- [ ] Sección Material Plus: catálogo de material pago con CTA
- [ ] Sección Tu Cuadro: ilustraciones personalizadas con precios y CTA
- [ ] Preview en CMS antes de publicar
- [ ] Panel de resumen de inscripciones por actividad

## Etapa 3 — Monetización online

- [ ] Pasarela de pago (Mercado Pago o similar) para talleres
- [ ] Pasarela de pago para ilustraciones y material
- [ ] Envío automático de material por email al pagar
- [ ] Carrito de compras (evaluar)
- [ ] Área privada para compradores (acceso a descargas)
