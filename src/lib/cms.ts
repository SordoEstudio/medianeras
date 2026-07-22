// src/lib/cms.ts — cliente del CMS con fallback a mock.
// Nunca llamar a la API directamente desde componentes. Siempre vía estas funciones.
import type { Actividad, Integrante, ConfigSitio, Testimonio } from './types';

const CMS_URL  = import.meta.env.CMS_URL;
const USE_MOCK = import.meta.env.USE_MOCK === 'true' || !CMS_URL;

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
  return todas.find((a) => a.slug === slug) ?? null;
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

// ── Testimonios ──────────────────────────────────────────────────────────────

export async function getTestimonios(): Promise<Testimonio[]> {
  if (USE_MOCK) {
    const { TESTIMONIOS_MOCK } = await import('../../mock/testimonios');
    return TESTIMONIOS_MOCK;
  }
  const res = await fetch(`${CMS_URL}/api/globals/testimonios`);
  const data = await res.json();
  return data.docs as Testimonio[];
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
    await new Promise((r) => setTimeout(r, 600));
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
