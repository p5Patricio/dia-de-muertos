import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@components/ui/dialog';
import type { GalleryItem } from '@/types/media';
import type { TranslationDict } from '@lib/i18n-shared';

interface LightboxProps {
  items: GalleryItem[];
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

export default function Lightbox({ items, translations }: LightboxProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % items.length);
  }, [items.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevious();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, showNext, showPrevious]);

  useEffect(() => {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    const handleClick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest(
        '[data-gallery-index]',
      ) as HTMLButtonElement | null;
      if (!button) return;
      const index = Number(button.dataset.galleryIndex);
      if (Number.isNaN(index)) return;
      setActiveIndex(index);
      setOpen(true);
    };

    grid.addEventListener('click', handleClick);
    return () => grid.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  const activeItem = useMemo(() => items[activeIndex], [items, activeIndex]);

  if (items.length === 0) return null;

  const counter = t(translations, 'gallery.lightbox.counter', '{current} / {total}')
    .replace('{current}', String(activeIndex + 1))
    .replace('{total}', String(items.length));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-[95vw] max-h-[95vh] w-auto border-none bg-transparent p-0 shadow-none"
        style={{
          animation: prefersReducedMotion ? 'none' : undefined,
        }}
        aria-describedby="lightbox-description"
      >
        <DialogTitle className="sr-only">
          {t(translations, 'gallery.lightbox.title', 'Image viewer')}
        </DialogTitle>
        <DialogDescription id="lightbox-description" className="sr-only">
          {activeItem?.description ?? ''}
        </DialogDescription>
        <div className="relative flex max-h-[90vh] flex-col items-center">
          {activeItem && (
            <img
              src={activeItem.fullSrc}
              alt={activeItem.alt}
              className="max-h-[75vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
          )}
          <div className="mt-4 max-w-2xl text-center text-white">
            <p className="font-display text-xl">{activeItem?.title}</p>
            <p className="text-sm text-white/80">{activeItem?.description}</p>
            <p className="mt-2 text-xs text-white/60">{counter}</p>
          </div>
          <div className="absolute inset-y-0 flex w-full items-center justify-between pointer-events-none">
            <button
              type="button"
              ref={prevButtonRef}
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label={t(translations, 'gallery.lightbox.previous', 'Previous image')}
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              ref={nextButtonRef}
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label={t(translations, 'gallery.lightbox.next', 'Next image')}
              className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
