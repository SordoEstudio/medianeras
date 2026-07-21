// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// Astro 5 — SSR para Astro Actions (formulario de inscripción).
// Páginas públicas pre-renderizadas (SSG) vía `export const prerender = true`.
export default defineConfig({
  site: 'https://medianeras.com.ar',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap()],
});
