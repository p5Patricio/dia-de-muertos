import { defineCollection, z } from 'astro:content';

const lang = z.enum(['es', 'en']);
const base = z.object({ lang, title: z.string(), description: z.string() });

const element = z.object({ id: z.string(), name: z.string(), summary: z.string() });
const ingredient = z.object({ name: z.string(), amount: z.string().optional() });
const recipe = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(ingredient),
  steps: z.array(z.string()),
});

export const collections = {
  historia: defineCollection({ type: 'content', schema: base }),
  elementos: defineCollection({ type: 'content', schema: base.extend({ items: z.array(element) }) }),
  recetas: defineCollection({ type: 'content', schema: base.extend({ recipes: z.array(recipe) }) }),
};
