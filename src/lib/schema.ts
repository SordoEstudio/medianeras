// src/lib/schema.ts — generadores de JSON-LD Schema.org (R08).
import type { Actividad, ConfigSitio } from './types';

export function localBusinessSchema(config: ConfigSitio, site: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'medianeras',
    description: 'Espacio cultural de lectura, escritura y pensamiento.',
    url: site,
    email: config.emailContacto,
    telephone: `+${config.whatsapp}`,
    address: { '@type': 'PostalAddress', streetAddress: config.direccion },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.coordenadas.lat,
      longitude: config.coordenadas.lng,
    },
    sameAs: [`https://instagram.com/${config.instagram.replace('@', '')}`],
  };
}

/** Event por actividad publicada (con al menos una fecha). */
export function eventSchema(a: Actividad, site: string) {
  const f = a.fechas[0];
  if (!f) return null;
  const startDate = `${f.fecha}T${f.hora}:00`;
  const modalidad =
    a.modalidad === 'virtual'
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : a.modalidad === 'hibrido'
        ? 'https://schema.org/MixedEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode';

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: a.nombre,
    description: a.descripcion,
    startDate,
    eventAttendanceMode: modalidad,
    eventStatus: 'https://schema.org/EventScheduled',
    organizer: { '@type': 'Organization', name: 'medianeras', url: site },
    performer: { '@type': 'Person', name: a.docente.nombre },
    ...(a.precio !== undefined && {
      offers: {
        '@type': 'Offer',
        price: a.precio,
        priceCurrency: 'ARS',
        availability: a.estado === 'cerrado'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
      },
    }),
  };
}
