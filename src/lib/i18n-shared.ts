export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';
export const showDefaultLocale = false;

export const localeLabels: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type TranslationDict = Record<string, string | TranslationDict>;

export function t(
  translations: TranslationDict,
  key: string,
  fallback?: string,
): string {
  const parts = key.split('.');
  let current: unknown = translations;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return fallback ?? key;
    }
  }

  return typeof current === 'string' ? current : fallback ?? key;
}

export function getRouteWithoutLocale(pathname: string): string {
  return pathname.replace(/^\/(es|en)(?=\/|$)/, '') || '/';
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.replace(/^\/(es|en)(?=\/|$)/, '') || '/';

  if (locale === defaultLocale && !showDefaultLocale) {
    return normalized;
  }

  if (normalized === '/') {
    return `/${locale}`;
  }

  return `/${locale}${normalized}`;
}
