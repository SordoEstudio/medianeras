// mock/testimonios.ts — importa datos reales desde src/data/testimonios.json
import type { Testimonio } from '../src/lib/types';
import testimoniosData from '../src/data/testimonios.json';

export const TESTIMONIOS_MOCK: Testimonio[] = testimoniosData as Testimonio[];
