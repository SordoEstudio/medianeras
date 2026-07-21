// src/actions/index.ts — Astro Actions. Formulario de inscripción.
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { crearInscripcion } from '../lib/cms';

export const server = {
  inscribirse: defineAction({
    accept: 'form',
    input: z.object({
      actividadId: z.string().min(1),
      nombre: z.string().min(2, 'Escribí tu nombre completo'),
      email: z.string().email('El email no parece válido'),
      mensaje: z.string().optional(),
    }),
    handler: async (input) => {
      const result = await crearInscripcion(input);
      if (!result.ok) {
        throw new Error(
          'No pudimos registrar tu inscripción. Intentá de nuevo o escribinos por WhatsApp.',
        );
      }
      return { id: result.id };
    },
  }),
};
