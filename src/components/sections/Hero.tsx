import { ArrowDown, Flower2, Skull, Music, Images } from 'lucide-react';
import { localizePath, t, type Locale, type TranslationDict } from '@lib/i18n-shared';

interface HeroProps {
  locale: Locale;
  translations: TranslationDict;
  ctaHref: string;
}

export default function Hero({ locale, translations, ctaHref }: HeroProps) {
  const title = t(translations, 'home.hero.title', 'Día de Muertos');
  const subtitle = t(
    translations,
    'home.hero.subtitle',
    'A celebration of life, memory, and color.',
  );
  const overline = t(translations, 'home.hero.overline', 'Mexico');
  const cta = t(translations, 'home.hero.cta', 'Discover the history');
  const scrollLabel = t(translations, 'accessibility.scrollToContent', 'Scroll to content');

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-gradient-to-b from-morado-900 via-background to-background py-20 text-center"
    >
      {/* Decorative layered motifs — purely visual */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cempasuchil-500/10 blur-3xl" />
        {/* Papel picado top border */}
        <div className="absolute left-0 right-0 top-0 flex h-16 items-start justify-center opacity-60">
          {[
            'bg-cempasuchil-500',
            'bg-morado-500',
            'bg-dorado-400',
            'bg-cempasuchil-600',
            'bg-morado-600',
          ].map((colorClass, index) => (
            <div
              key={index}
              className={`${colorClass} mx-1 h-10 w-14 rounded-b-lg shadow-lg`}
              style={{ transform: `translateY(${index % 2 === 0 ? 0 : 8}px)` }}
            />
          ))}
        </div>
        {/* Floating icons */}
        <div
          className="absolute left-[8%] top-[20%] animate-float text-cempasuchil-400/30"
          style={{ animationDelay: '0s', animationDuration: '6s' }}
        >
          <Flower2 className="h-16 w-16" />
        </div>
        <div
          className="absolute right-[10%] top-[28%] animate-float text-dorado-400/25"
          style={{ animationDelay: '1s', animationDuration: '7s' }}
        >
          <Skull className="h-20 w-20" />
        </div>
        <div
          className="absolute bottom-[22%] left-[12%] animate-float text-morado-400/30"
          style={{ animationDelay: '0.5s', animationDuration: '5s' }}
        >
          <Music className="h-14 w-14" />
        </div>
        <div
          className="absolute bottom-[18%] right-[8%] animate-float text-cempasuchil-500/25"
          style={{ animationDelay: '2s', animationDuration: '8s' }}
        >
          <Images className="h-16 w-16" />
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div
          className="mx-auto max-w-4xl animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="inline-block rounded-full border border-dorado-400/40 bg-dorado-400/10 px-4 py-1 text-sm font-medium uppercase tracking-widest text-dorado-300">
            {overline}
          </span>
        </div>

        <h1
          id="hero-title"
          className="font-display mt-6 animate-fade-in-up text-5xl leading-tight text-white drop-shadow-lg md:text-7xl lg:text-8xl"
          style={{ animationDelay: '0.2s' }}
        >
          {title}
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl animate-fade-in-up text-lg text-white/90 md:text-xl"
          style={{ animationDelay: '0.35s' }}
        >
          {subtitle}
        </p>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 animate-fade-in-up sm:flex-row"
          style={{ animationDelay: '0.5s' }}
        >
          <a
            href={ctaHref}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-cempasuchil-500 px-8 text-base font-semibold text-white shadow-lg transition-colors hover:bg-cempasuchil-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {cta}
          </a>
          <a
            href={localizePath('/galeria', locale)}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-8 text-base font-medium text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Images className="mr-2 h-5 w-5" aria-hidden="true" />
            {t(translations, 'nav.gallery', 'Gallery')}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#intro"
        aria-label={scrollLabel}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce rounded-full p-2 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowDown className="h-6 w-6" />
      </a>
    </section>
  );
}
