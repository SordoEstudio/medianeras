// src/lib/types.ts — tipos compartidos del proyecto.

export type Modalidad = 'presencial' | 'virtual' | 'hibrido';
export type Categoria = 'taller' | 'encuentro' | 'capacitacion' | 'contenido-gratuito' | 'club-lectura';
export type EstadoActividad = 'activo' | 'proximamente' | 'cerrado';

export interface Docente {
  id: string;
  nombre: string;
  bio: string;          // 1-2 oraciones
  foto?: string;        // URL relativa o absoluta
}

export interface FechaActividad {
  fecha: string;        // ISO 8601 date
  hora: string;         // "18:30"
  duracion?: number;    // minutos
}

export interface Actividad {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;        // 2-4 líneas. Plain text, no markdown.
  descripcionLarga?: string;  // Para modal expandido. Markdown permitido.
  categoria: Categoria;
  docente: Docente;           // docente principal / compatibilidad
  docentes?: Docente[];       // cuando la actividad tiene múltiples docentes
  fechas: FechaActividad[];
  modalidad: Modalidad;
  precio?: number;            // undefined = gratuito
  cupos?: number;             // undefined = sin límite
  estado: EstadoActividad;
  imagen?: string;
  destacada: boolean;         // aparece primero en la grilla
  publishedAt: string;        // ISO 8601
}

export interface Testimonio {
  id: string;
  texto: string;
  actividad?: string;         // contexto opcional
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
  mapaEmbed?: string;         // URL embed de Google Maps
  mapaLink?: string;          // URL corta de Google Maps para "Cómo llegar"
}

export interface Inscripcion {
  id: string;
  actividadId: string;
  nombre: string;
  email: string;
  mensaje?: string;
  creadaEn: string;   // ISO 8601
}
