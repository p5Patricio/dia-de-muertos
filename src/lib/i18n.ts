import fs from 'node:fs/promises';
import path from 'node:path';
import {
  detectLocaleFromPath,
  localizePath as localizePathAstro,
} from 'astro-i18next';
import {
  defaultLocale,
  isLocale,
  locales,
  type Locale,
  type TranslationDict,
} from '@lib/i18n-shared';

export {
  defaultLocale,
  getRouteWithoutLocale,
  isLocale,
  localeLabels,
  locales,
  localizePath,
  type Locale,
  type TranslationDict,
} from '@lib/i18n-shared';

export { detectLocaleFromPath, localizePathAstro };

export async function loadTranslations(
  locale: Locale,
): Promise<TranslationDict> {
  const filePath = path.resolve(
    process.cwd(),
    'public/locales',
    locale,
    'translation.json',
  );
  const contents = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(contents) as TranslationDict;
}

export function getCurrentLocale(pathname: string): Locale {
  const detected = detectLocaleFromPath(pathname);
  return isLocale(detected) ? detected : defaultLocale;
}

export function getAlternateLocaleUrls(
  currentLocale: Locale,
  currentPath: string,
): { locale: Locale; url: string }[] {
  return locales.map((locale) => {
    const url = localizePathAstro(currentPath, locale) || '/';
    return { locale, url };
  });
}
