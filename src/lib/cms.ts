// src/lib/cms.ts — CMS Harvi. Sin fallback local. Todo desde la API.
import type { Actividad, Integrante, ConfigSitio, Testimonio } from './types';
import type { Activity, CMSContactItem } from './cms/types';
import { createCMSClient } from './cms/index';

export const cms = createCMSClient({
  baseUrl: import.meta.env.PUBLIC_CMS_API,
  clientSlug: import.meta.env.PUBLIC_CLIENT_SLUG,
  defaultHeaders: {
    Origin: (import.meta.env.PUBLIC_SITE_ORIGIN ?? import.meta.env.SITE) as string,
  },
});

// ── Tipos de data de componentes CMS ─────────────────────────────────────────

interface ContactoData {
  txt_direccion: string;
  lista_contacto: CMSContactItem[];
  _coordenadas: { lat: number; lng: number };
  _mapa_embed?: string;
  _mapa_link?: string;
}

interface QuienesSomosData {
  lista_parrafos_intro: { txt_parrafo: string }[];
  lista_parrafos_historia: { txt_parrafo: string }[];
  txt_tagline?: string;
}

interface SofiaCardData {
  txt_nombre: string;
  txt_rol: string;
  txt_bio: string;
  img_foto_optional?: string;
  lista_contacto?: CMSContactItem[];
}


const CMS_ORIGIN = import.meta.env.PUBLIC_CMS_API?.replace('/api/public/v1', '') ?? '';

function resolveImg(path: string | undefined): string | undefined {
  if (!path) return undefined;
  return path.startsWith('http') ? path : `${CMS_ORIGIN}${path}`;
}

// ── Adapters: tipos CMS Harvi → tipos locales del sitio ──────────────────────

const AUDIENCIA_MAP: Record<string, Actividad['audiencia']> = {
  niños:                'niños',
  kids:                 'niños',
  'medianeras kids':    'niños',
  juvenil:              'juvenil',
  'medianeras juvenil': 'juvenil',
  medianeras:           'adultos',
  adultos:              'adultos',
};

const CMS_CAT_SLUG: Record<string, Actividad['categoria']> = {
  'capacitacion':        'capacitacion',
  'taller':              'taller',
  'taller-de-lectura':   'taller',
  'encuentro':           'encuentro',
  'club-de-lectura':     'club-lectura',
  'club-lectura':        'club-lectura',
  'contenido-gratuito':  'contenido-gratuito',
  'spanglish-book-club': 'club-lectura',
};

function normalizeCatSlug(name: string): Actividad['categoria'] {
  const slug = name.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return CMS_CAT_SLUG[slug] ?? 'encuentro';
}

type CatEntry = { slug: Actividad['categoria']; nombre: string };

function adaptActivity(a: Activity, catMap?: Map<string, CatEntry>): Actividad {
  const audienciaRaw = a.audiencia?.[0];
  const cat = catMap?.get(a.categoria as string);
  return {
    id:              a._id,
    slug:            a._id,
    nombre:          a.nombre,
    descripcion:     a.descripcion_corta,
    categoria:       cat?.slug ?? 'encuentro',
    categoriaNombre: cat?.nombre,
    docente:         { id: '', nombre: a.coordina?.[0] ?? '', bio: '' },
    docentes:        a.coordina?.length
      ? a.coordina.map((n, i) => ({ id: `coord-${i}`, nombre: n, bio: '' }))
      : undefined,
    fechas:          a.fechas.map((f) => ({ fecha: f.fecha, hora: f.hora, duracion: f.duracion_min })),
    modalidad:       a.modalidad,
    precio:          a.precio > 0 ? a.precio : undefined,
    cupos:           a.cupo,
    estado:          a.inscripciones_abiertas ? 'activo' : 'cerrado',
    audiencia:       audienciaRaw ? AUDIENCIA_MAP[audienciaRaw.toLowerCase()] : undefined,
    whatsapp:        a.whatsapp,
    extraFields:     a.extra_fields?.length ? a.extra_fields : undefined,
    destacada:       false,
    publishedAt:     a.createdAt,
  };
}

function adaptTestimonio(t: { id: string; data: Record<string, unknown> }): Testimonio {
  return {
    id:        t.id,
    texto:     (t.data.mensaje ?? t.data.texto ?? '') as string,
    actividad: t.data.actividad as string | undefined,
  };
}

// ── API pública ───────────────────────────────────────────────────────────────

export async function getActividades(): Promise<Actividad[]> {
  try {
    const [{ activities }, categorias] = await Promise.all([
      cms.activities.list({ limit: 100 }),
      cms.categories.list().catch(() => [] as import('./cms/types').Category[]),
    ]);
    const catMap = new Map<string, CatEntry>(
      categorias.map((c) => [c._id, { slug: normalizeCatSlug(c.name), nombre: c.name }]),
    );
    return activities.map((a) => adaptActivity(a, catMap));
  } catch {
    return [];
  }
}

export async function getEquipo(): Promise<Integrante[]> {
  const { components } = await cms.components.list();
  const d = cms.components.getByType<SofiaCardData>(components, 'sofia_card');
  if (!d) return [];
  const contactos = d.lista_contacto ?? [];
  const cl = (icon: string) => contactos.find((c) => c.icon_contacto === icon);
  return [{
    id:        'int-sofia',
    nombre:    d.txt_nombre,
    rol:       d.txt_rol,
    bio:       d.txt_bio,
    foto:      resolveImg(d.img_foto_optional),
    instagram: cl('FaInstagram')?.txt_valor ?? cl('FaInstagram')?.link_destino,
    linkedin:      cl('FaLinkedin')?.link_destino,
    linkedinLabel: cl('FaLinkedin')?.txt_label,
    charlaUrl:     cl('FaYoutube')?.link_destino,
    charlaLabel:   cl('FaYoutube')?.txt_label,
    blogUrl:       cl('FaGlobe')?.link_destino,
    blogLabel:     cl('FaGlobe')?.txt_label,
  }];
}

export async function getConfig(): Promise<ConfigSitio> {
  const { components } = await cms.components.list();

  const c = cms.components.getByType<ContactoData>(components, 'contacto');
  const q = cms.components.getByType<QuienesSomosData>(components, 'quienes_somos');

  const contactos: CMSContactItem[] = c?.lista_contacto ?? [];
  const email     = contactos.find((x) => x.icon_contacto === 'FaEnvelope')?.txt_valor ?? '';
  const waUrl     = contactos.find((x) => x.icon_contacto === 'FaWhatsapp')?.link_destino ?? '';
  const ig        = contactos.find((x) => x.icon_contacto === 'FaInstagram')?.txt_valor ?? '';
  const direccion = contactos.find((x) => x.icon_contacto === 'FaMapMarkerAlt')?.txt_valor ?? (c as any)?.txt_direccion ?? '';

  const quienesSomos = (q?.lista_parrafos_intro ?? []).map((p) => p.txt_parrafo).join('\n\n');
  const historia     = (q?.lista_parrafos_historia ?? []).map((p) => p.txt_parrafo).join('\n\n');

  return {
    quienesSomos,
    historia,
    filosofia:     '',
    emailContacto: email,
    whatsapp:      waUrl.replace('https://wa.me/', ''),
    instagram:     ig,
    direccion,
    coordenadas:   c?._coordenadas ?? { lat: 0, lng: 0 },
    mapaEmbed:     c?._mapa_embed,
    mapaLink:      c?._mapa_link,
  };
}

export async function getTestimonios(): Promise<Testimonio[]> {
  try {
    const result = await cms.forms.testimonials('testimonios', { limit: 50 });
    return result.testimonials.map(adaptTestimonio);
  } catch {
    return [];
  }
}

// ── Inscripciones ─────────────────────────────────────────────────────────────

export interface InscripcionInput {
  actividadId: string;
  nombre: string;
  email: string;
  mensaje?: string;
}

export async function crearInscripcion(input: InscripcionInput): Promise<{ ok: boolean; id?: string }> {
  try {
    await cms.activities.register(input.actividadId, {
      _hp: '',
      nombre: input.nombre,
      telefono: input.email,
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
