// src/lib/format.ts — formateo de fechas, precio y modalidad según marca.
import type { FechaActividad, Modalidad } from './types';

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

const DIAS_CORTO = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

export interface FechaIg {
  dia: number;
  diaSem: string;
  hora: string;
  horaFin: string | null;
}

export function fechaIg(f: FechaActividad): FechaIg {
  const [y, mes, dia] = f.fecha.split('-').map(Number);
  const date = new Date(y!, (mes ?? 1) - 1, dia!);
  let horaFin: string | null = null;
  if (f.duracion) {
    const [h, m] = f.hora.split(':').map(Number);
    const total = (h ?? 0) * 60 + (m ?? 0) + f.duracion;
    horaFin = `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  }
  return { dia: dia!, diaSem: DIAS_CORTO[date.getDay()]!, hora: f.hora, horaFin };
}

/** "12 de agosto · 18:30 h" */
export function formatFecha(f: FechaActividad): string {
  const [, mes, dia] = f.fecha.split('-').map(Number);
  return `${dia} de ${MESES[(mes ?? 1) - 1]} · ${f.hora} h`;
}

/** Primera fecha legible, o '' si no hay. */
export function primeraFecha(fechas: FechaActividad[]): string {
  return fechas.length ? formatFecha(fechas[0]) : '';
}

/** "$15.000" o "Gratuito". */
export function formatPrecio(precio?: number): string {
  if (precio === undefined) return 'Gratuito';
  return `$${precio.toLocaleString('es-AR')}`;
}

const MODALIDAD_LABEL: Record<Modalidad, string> = {
  presencial: 'Presencial',
  virtual: 'Virtual',
  hibrido: 'Híbrido',
};
export function labelModalidad(m: Modalidad): string {
  return MODALIDAD_LABEL[m];
}
