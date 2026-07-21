// src/lib/markdown.ts — render mínimo de markdown para textos del CMS.
// Soporta: párrafos (doble salto), **negrita**, *cursiva*. Escapa HTML.

function escapar(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(s: string): string {
  return escapar(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

/** Devuelve HTML de párrafos a partir de texto markdown simple. */
export function mdToHtml(texto: string): string {
  return texto
    .trim()
    .split(/\n{2,}/)
    .map((p) => `<p>${inline(p.trim().replace(/\n/g, '<br>'))}</p>`)
    .join('\n');
}
