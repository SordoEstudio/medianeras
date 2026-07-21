// mock/config.ts — importa datos reales desde src/data/config.json
import type { ConfigSitio } from '../src/lib/types';
import configData from '../src/data/config.json';

export const CONFIG_MOCK: ConfigSitio = configData as ConfigSitio;
