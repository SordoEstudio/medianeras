// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// Astro 5 — SSR para Astro Actions (formulario de inscripción).
// Páginas públicas pre-renderizadas (SSG) vía `export const prerender = true`.
export default defineConfig({
  site: 'https://medianeras.com.ar',
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],
});