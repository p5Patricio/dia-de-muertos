# Día de Muertos Website

A static, bilingual, desktop-first website that celebrates the Mexican tradition of **Día de Muertos**. It shares history, cultural elements, recipes, image galleries, music, and videos with accessibility, performance, and respect for the tradition in mind.

## Tech Stack

- [Astro](https://astro.build/) — static site generator with static output
- [TypeScript](https://www.typescriptlang.org/) — strict type checking
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) — accessible UI primitives
- [astro-i18next](https://github.com/yasseraedy/astro-i18next) — bilingual routing and translations
- [React](https://react.dev/) — interactive islands for the audio player, lightbox, and theme toggle

## Quick Start

> Node.js 18+ is recommended.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) (the dev server port may vary). The default entry redirects to `/es/`.

Build the production site:

```bash
npm run build
```

Preview the static build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

Format files:

```bash
npm run format
```

## Project Structure

```
public/            # Static assets, fonts, and translation files
src/
  assets/          # Images imported by Astro (empty in scaffold)
  components/
    layout/        # Header, Footer
    media/         # GalleryGrid, Lightbox, AudioPlayer, VideoGrid
    sections/      # Home page sections (Hero, SectionPreview)
    ui/            # shadcn/ui primitives (Button, Card, Dialog)
  content/         # MDX content for historia, elementos, recetas
  content.config.ts
  data/            # JSON data for gallery, tracks, videos
  layouts/         # Layout.astro global shell
  lib/             # i18n, theme, and Tailwind utilities
  pages/           # Astro routes
  styles/          # Global CSS, fonts, and content-body styles
  types/           # Shared TypeScript interfaces
```

## Routing and Locales

The site uses locale prefixes:

- `/es/` — Spanish
- `/en/` — English
- `/` — redirects to `/es/`

Each page under `src/pages/[lang]/` is rendered for both locales. `astro-i18next` generates `hreflang` and canonical links automatically.

## Adding Content

### Pages

Create a new page under `src/pages/[lang]/`. Add `getStaticPaths()` with `{ lang: 'es' }` and `{ lang: 'en' }`. Wrap the page in `Layout.astro` and pass `title`, `description`, and `locale`.

### Translations

UI strings live in:

```
public/locales/es/translation.json
public/locales/en/translation.json
```

Add a key to both files. Spanish is the default locale; if a key is missing in English, it falls back to the translation key name.

### MDX Content (Historia, Elementos, Recetas)

Content collections are defined in `src/content.config.ts`.

1. Create or edit a file in `src/content/<collection>/<lang>.mdx`.
2. Include the required frontmatter (`lang`, `title`, `description`).
3. Add the `slug` mapping to the collection schema if needed.

Example `src/content/historia/en.mdx`:

```mdx
---
lang: en
title: History
description: Origins, evolution, and meaning of Día de Muertos.
---

## A new section

Write prose here.
```

### Images for the Gallery

Edit `src/data/gallery.json`. Each entry needs:

- `src` — thumbnail URL
- `fullSrc` — full-size image URL
- `alt` — descriptive alternative text
- `title` — short title shown in the lightbox
- `description` — longer caption
- `category` — category label

Use optimized images (`src/assets/images/` or an external CDN). Placeholder images should be replaced with permissive or self-hosted assets before production.

### Recipes

Edit `src/content/recetas/<lang>.mdx`. The `recipes` frontmatter array supports `id`, `name`, `description`, `ingredients` (`name`, optional `amount`), and `steps`.

### Music Tracks

Edit `src/data/tracks.json`. Each track needs `id`, `title`, `artist`, and `src` (audio URL). Replace placeholder URLs with permissive or self-hosted audio files.

### Videos

Edit `src/data/videos.json`. Each entry needs `id`, `title`, `description`, `category`, and `embedUrl`. The grid uses a click-to-load facade so embedded iframes do not load until the user chooses them.

## Contributing

1. Open a new branch from the latest `slice/N-*` branch.
2. Keep changes focused and under the 400-line review budget when possible.
3. Run `npm run lint` and `npm run build` before committing.
4. Ensure all interactive elements are keyboard accessible, have visible focus indicators, and respect `prefers-reduced-motion`.
5. Write a clear [Conventional Commit](https://www.conventionalcommits.org/) message.
6. Open a PR against the previous slice branch in the feature-branch chain.

## Asset and License Notes

- This project uses **placeholder images** from `placehold.co` and a placeholder audio track from Wikimedia Commons. They are for development only.
- Before publishing, replace all media with **open, permissive, or self-created assets** that respect the tradition and its communities.
- Fonts are loaded from Google Fonts via `font-display: swap`. Self-host them if you need to avoid external requests.
- Do not commit copyrighted images, audio, or video without explicit permission.

## Accessibility and Performance

- Keyboard navigation: skip-to-content link, focus-visible rings, and keyboard controls for the lightbox and audio player.
- ARIA labels: all icon buttons, language switcher, and media controls are labelled.
- Alt text: every image in the gallery has descriptive `alt` text.
- Reduced motion: the global CSS resets animation and transitions when `prefers-reduced-motion: reduce` is active. The lightbox also respects this preference.
- Touch targets: header and footer controls are sized to at least `44×44px`.
- Images: use `loading="lazy"` and `decoding="async"` for below-the-fold images.
- Lazy video embeds: the video grid only loads an iframe after the user clicks the play facade.
- Static output: only the audio player and lightbox hydrate as client islands; the rest of the page is static HTML.

Target Lighthouse scores: ≥ 90 in Performance, Accessibility, Best Practices, and SEO.

## License

The source code is provided under the license declared in the project repository. All media placeholders must be replaced with assets you have the right to use and distribute.
