// mock/talleres.ts — importa datos reales desde src/data/actividades.json
import type { Actividad } from '../src/lib/types';
import actividadesData from '../src/data/actividades.json';

export const ACTIVIDADES_MOCK: Actividad[] = actividadesData as Actividad[];
