import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { applyTheme, getInitialTheme, persistTheme, toggleTheme, type Theme } from '@lib/theme';
import { getRouteWithoutLocale, localeLabels, localizePath, type Locale } from '@lib/i18n-shared';
import type { TranslationDict } from '@lib/i18n-shared';

interface HeaderProps {
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

export default function Header({ locale, translations }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    const next = toggleTheme(theme);
    setTheme(next);
    applyTheme(next);
    persistTheme(next);
  };

  const route = typeof window !== 'undefined' ? getRouteWithoutLocale(window.location.pathname) : '/';

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.history', href: '/historia' },
    { key: 'nav.elements', href: '/elementos' },
    { key: 'nav.gallery', href: '/galeria' },
    { key: 'nav.music', href: '/musica' },
    { key: 'nav.videos', href: '/videos' },
    { key: 'nav.recipes', href: '/recetas' },
  ];

  const localizedHref = (href: string, targetLocale: Locale) => localizePath(href, targetLocale);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a
          href={localizedHref('/', locale)}
          className="font-display text-xl tracking-wide text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {t(translations, 'site.title', 'Día de Muertos')}
        </a>

        <nav aria-label={t(translations, 'accessibility.mainNavigation', 'Main navigation')} className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={localizedHref(item.href, locale)}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {t(translations, item.key, item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex" role="group" aria-label={t(translations, 'language.select', 'Select language')}>
            {(['es', 'en'] as Locale[]).map((targetLocale) => (
              <a
                key={targetLocale}
                href={localizedHref(route, targetLocale)}
                aria-current={locale === targetLocale ? 'true' : undefined}
                className={`inline-flex h-10 min-w-[44px] items-center justify-center rounded px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  locale === targetLocale
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }`}
              >
                {localeLabels[targetLocale]}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={handleThemeToggle}
            aria-label={t(translations, 'theme.toggle', 'Toggle theme')}
            className="inline-flex h-10 w-10 items-center justify-center rounded text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={t(
              translations,
              isMobileMenuOpen ? 'accessibility.closeMenu' : 'accessibility.openMenu',
              isMobileMenuOpen ? 'Close menu' : 'Open menu',
            )}
            className="inline-flex h-10 w-10 items-center justify-center rounded text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <nav aria-label={t(translations, 'accessibility.mainNavigation', 'Main navigation')} className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={localizedHref(item.href, locale)}
                    className="block rounded px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(translations, item.key, item.key)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4" role="group" aria-label={t(translations, 'language.select', 'Select language')}>
              {(['es', 'en'] as Locale[]).map((targetLocale) => (
                <a
                  key={targetLocale}
                  href={localizedHref(route, targetLocale)}
                  aria-current={locale === targetLocale ? 'true' : undefined}
                  className={`inline-flex h-10 min-w-[44px] flex-1 items-center justify-center rounded px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    locale === targetLocale
                      ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {localeLabels[targetLocale]}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
