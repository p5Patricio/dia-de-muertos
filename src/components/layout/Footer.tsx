import { localeLabels, localizePath, type Locale } from '@lib/i18n-shared';
import type { TranslationDict } from '@lib/i18n-shared';

interface FooterProps {
  locale: Locale;
  translations: TranslationDict;
}

function t(translations: TranslationDict, key: string, fallback: string): string {
  const parts = key.split('.');
  let current: unknown = translations;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return fallback;
    }
  }
  return typeof current === 'string' ? current : fallback;
}

export default function Footer({ locale, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const sitemap = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.history', href: '/historia' },
    { key: 'nav.elements', href: '/elementos' },
    { key: 'nav.gallery', href: '/galeria' },
    { key: 'nav.music', href: '/musica' },
    { key: 'nav.videos', href: '/videos' },
    { key: 'nav.recipes', href: '/recetas' },
  ];

  const localizedHref = (href: string, targetLocale: Locale) => localizePath(href, targetLocale);

  const copyright = t(translations, 'footer.copyright', '© {year} Día de Muertos. All rights reserved.').replace('{year}', String(currentYear));

  return (
    <footer className="border-t border-border bg-muted/30 py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="font-display text-lg text-foreground">
              {t(translations, 'site.title', 'Día de Muertos')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(translations, 'footer.credits', 'Made with respect and love for the tradition.')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t(translations, 'footer.sitemap', 'Sitemap')}
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {sitemap.map((item) => (
                <li key={item.key}>
                  <a
                    href={localizedHref(item.href, locale)}
                    className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {t(translations, item.key, item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t(translations, 'language.select', 'Select language')}
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {(['es', 'en'] as Locale[]).map((targetLocale) => (
                <li key={targetLocale}>
                  <a
                    href={localizedHref('/', targetLocale)}
                    aria-current={locale === targetLocale ? 'true' : undefined}
                    className={`inline-flex min-h-[44px] items-center text-sm transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      locale === targetLocale
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {localeLabels[targetLocale]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
