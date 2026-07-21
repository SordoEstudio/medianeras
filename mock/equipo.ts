// mock/equipo.ts — importa datos reales desde src/data/equipo.json
import type { Integrante } from '../src/lib/types';
import equipoData from '../src/data/equipo.json';

export const EQUIPO_MOCK: Integrante[] = equipoData as Integrante[];
