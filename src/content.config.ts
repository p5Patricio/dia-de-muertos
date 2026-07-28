import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const i18nCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/i18n' }),
  schema: z.record(z.string(), z.string()),
});

export const collections = {
  i18n: i18nCollection,
};
