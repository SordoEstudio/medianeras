// src/content/ui.ts — fuente de verdad para textos fijos de la interfaz.
// Los textos que vienen del CMS NO van acá. Solo strings de UI.

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
    'club-lectura': 'Club de lectura',
  },
  filtrosAudiencia: {
    todas: 'Todas las edades',
    niños: 'Niños (3–10)',
    juvenil: 'Juvenil (11+)',
    adultos: 'Adultos',
  },
  filtrosCosto: {
    todos: 'Todos',
    gratuito: 'Gratuitos',
    pago: 'De pago',
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
    successMsg:
      'Te escribimos al mail que dejaste para confirmar los detalles. Cualquier duda, escribinos por WhatsApp.',
    errorMsg:
      'No pudimos registrar tu inscripción. Intentá de nuevo o escribinos por WhatsApp.',
  },
  queHacemos: {
    titulo: 'Cuatro maneras de encontrarnos',
    areas: [
      {
        icono: 'flor' as const,
        nombre: 'Lectura',
        texto: 'Leemos juntos para que cada libro deje de ser un objeto y se vuelva una conversación.',
      },
      {
        icono: 'margarita' as const,
        nombre: 'Pensamiento',
        texto: 'Pensamos en voz alta, sin apuro, desde la pregunta más que desde la certeza.',
      },
      {
        icono: 'rama' as const,
        nombre: 'Comunicación',
        texto: 'Escribir para comunicar: encontrar las palabras justas para lo que queremos decir.',
      },
      {
        icono: 'hoja' as const,
        nombre: 'Cultura',
        texto: 'Habitamos la cultura contemporánea como un territorio vivo que se construye entre todos.',
      },
    ],
  },
  empty: {
    sinActividades: (categoria: string) =>
      `No hay ${categoria} disponibles por el momento. Seguinos en Instagram para enterarte de las próximas.`,
  },
} as const;
