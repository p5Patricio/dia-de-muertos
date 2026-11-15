Inicializa un proyecto web llamado "Día de Muertos" - un tributo visual y cultural a la tradición mexicana del Día de Muertos. Este proyecto debe ser visualmente IMPACTANTE y de alta calidad.

## Objetivo

Crear una página web estática, visualmente impresionante, que:
- Presente una galería de ilustraciones sobre la celebración
- Cuente la historia y significado de esta tradición mexicana
- Explique los elementos culturales (altares, ofrendas, calaveras, cempasúchil, etc.)
- Incluya música tradicional y videos relacionados
- Comparta recetas tradicionales (ofrendas, pan de muerto, etc.)
- Soporte múltiples idiomas (Español e Inglés mínimo)
- Tenga modo oscuro y claro
- Sea accesible y rápida de cargar
- Use imágenes de Pinterest como inspiración visual
- Diseño desktop-first con experiencia responsiva en móviles
- Enfoque prioritario en performance y accesibilidad
- Estilo visual 100% inspirado en el Día de Muertos mexicano

## Stack Tecnológico

- Framework: Astro (última versión estable)
- Lenguaje: TypeScript
- Estilos: Tailwind CSS con configuración personalizada
- Componentes UI: shadcn/ui (componentes estéticos y personalizables)
- Animaciones: Framer Motion (animaciones de componentes), GSAP (animaciones complejas y scroll-triggered), Lenis (smooth scrolling)
- Efectos visuales: Aceternity UI o Magic UI (efectos impactantes de código abierto)
- Imágenes: Optimización automática de Astro + lazy loading
- Contenido: MDX para combinar Markdown con componentes
- i18n: astro-i18next para soporte multiidioma
- Tema: Sistema de dark/light mode con persistencia

## Estructura del Proyecto

```
/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui personalizados
│   │   ├── sections/        # Secciones de página (hero, galería, historia)
│   │   ├── layout/          # Header, Footer, Navigation, ThemeToggle, LanguageSwitcher
│   │   ├── media/           # Componentes de video, audio, galería
│   │   └── effects/         # Componentes con animaciones especiales
│   ├── layouts/
│   │   └── Layout.astro     # Layout principal con theme provider
│   ├── pages/
│   │   ├── index.astro      # Página principal
│   │   ├── historia.astro   # Historia de la tradición
│   │   ├── galeria.astro    # Galería de ilustraciones
│   │   ├── elementos.astro  # Elementos culturales
│   │   ├── musica.astro     # Música tradicional
│   │   ├── videos.astro     # Videos relacionados
│   │   └── recetas.astro    # Recetas tradicionales
│   ├── content/
│   │   ├── historia/        # Archivos MDX con contenido
│   │   ├── recetas/         # Recetas en MDX
│   │   └── i18n/            # Archivos de traducción (es.json, en.json)
│   ├── assets/
│   │   ├── images/          # Ilustraciones y fotos
│   │   ├── videos/          # Videos locales
│   │   ├── audio/           # Música tradicional
│   │   └── icons/           # Iconos decorativos
│   ├── styles/
│   │   └── global.css       # Estilos globales con Tailwind + paleta personalizada
│   └── lib/
│       ├── i18n.ts          # Configuración de internacionalización
│       └── theme.ts         # Lógica de tema oscuro/claro
├── public/
│   └── fonts/               # Fuentes personalizadas
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── components.json          # Configuración de shadcn/ui
└── package.json
```

## Características Técnicas

### 1. Diseño Visual Impactante

- Hero section: Efecto parallax o animación de entrada impactante
- Galería: Grid con efectos hover, lightbox, lazy loading
- Transiciones: Animaciones suaves entre secciones
- Scroll animations: Elementos que aparecen con scroll (fade-in, slide-up)
- Efectos especiales: Partículas, gradientes animados, glow effects
- Tipografía: Fuentes elegantes que evoquen la tradición mexicana

### 2. Estilo Visual - Día de Muertos

El diseño debe estar 100% inspirado en el Día de Muertos mexicano:
- Patrones decorativos tradicionales (papel picado, calaveras, flores)
- Elementos visuales de altares y ofrendas
- Colores vibrantes tradicionales (naranja cempasúchil, morado, dorado)
- Ilustraciones y motivos mexicanos auténticos
- Tipografía que refleje el carácter festivo y solemne de la tradición
- Texturas y fondos que evoquen la estética mexicana
- Iconografía personalizada (calaveras, mariposas, flores de cempasúchil)

### 3. Componentes de Código Abierto

Usar componentes de estas librerías (buscar en GitHub):
- shadcn/ui: Base de componentes (botones, cards, dialogs, etc.)
- Aceternity UI: Efectos visuales impactantes (text effects, backgrounds, buttons)
- Magic UI: Animaciones y efectos mágicos
- Tremor: Componentes de datos si necesitas mostrar información estructurada
- Tailwind UI: Patrones de diseño (adaptar, no copiar literal)

### 4. Diseño Desktop-First (Prioridad Desktop)

**Enfoque principal: Desktop/Laptop**
- Diseño optimizado para pantallas de 1024px y superiores
- Breakpoints: lg (1024px), xl (1280px), 2xl (1536px) como puntos principales
- Aprovechar espacio horizontal para layouts multi-columna
- Navegación horizontal completa en desktop
- Galería: 3-6 columnas en desktop con efectos hover elaborados
- Hero section: layouts complejos con elementos decorativos
- Animaciones y efectos completos en desktop
- Tipografía grande y espaciado generoso
- Sidebar o elementos laterales cuando sea apropiado

**Adaptación responsiva para móviles (secundario pero funcional)**
- Breakpoints: sm (640px), md (768px) para adaptación descendente
- Navegación hamburguesa en móvil
- Galería: 1-2 columnas en móvil
- Simplificar animaciones complejas en móvil para mejor performance
- Touch-friendly: botones mínimo 44x44px
- Imágenes responsive con srcset
- Testing en dispositivos reales o emuladores
- El diseño móvil debe ser usable y funcional, pero no la prioridad de diseño

### 5. Performance (Prioridad Alta)

- Zero JavaScript innecesario (client:only cuando sea estrictamente necesario)
- Lazy loading para imágenes y videos (loading="lazy")
- Optimización automática de imágenes (WebP, AVIF, responsive sizes)
- Code splitting por ruta (automático en Astro)
- Prefetching de páginas cercanas (viewport links)
- Critical CSS inline, resto diferido
- Font loading optimizado (font-display: swap, preload)
- Bundle size monitoring
- Lighthouse score objetivo: 90+ en todas las categorías
- Core Web Vitals optimizados (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### 6. Accesibilidad (Prioridad Alta)

- ARIA labels en todos los componentes interactivos
- Navegación completa por teclado (tab order lógico)
- Skip links para saltar al contenido principal
- Contraste WCAG AA mínimo (4.5:1 para texto normal, 3:1 para texto grande)
- Alt text descriptivo en todas las imágenes
- Roles ARIA apropiados (navigation, main, article, etc.)
- Focus visible en todos los elementos interactivos
- Screen reader testing (VoiceOver, NVDA)
- No depender solo de color para transmitir información
- Text resize support (hasta 200% sin romper layout)
- Reduced motion support (prefers-reduced-motion)
- Language attributes correctos (lang="es", lang="en")

### 7. Sistema Multiidioma (i18n)

- Soporte para Español (por defecto) e Inglés
- Switcher de idioma en el header (con banderas o códigos)
- URLs con prefijo de idioma (/es/historia, /en/history)
- Traducciones en archivos JSON separados
- SEO con hreflang tags
- Fallback a español si falta traducción
- Formato de fechas y números localizado

### 8. Tema Oscuro/Claro

- Toggle en el header (icono de sol/luna)
- Persistencia en localStorage
- Transición suave entre temas (300ms)
- Paleta de colores adaptada para ambos modos
- Respetar preferencia del sistema (prefers-color-scheme)
- Sin flash de tema incorrecto en carga

### 9. Multimedia

- Música: Player de audio custom con controles estilizados, playlist, play/pause/volume
- Videos: Embebidos de YouTube/Vimeo o videos locales con controles custom, lazy load
- Galería: Lightbox con navegación (prev/next), zoom, descripción, keyboard navigation

## Paleta de Colores (Tailwind Config)

```javascript
colors: {
  cempasuchil: {
    DEFAULT: '#FF6B35',
    light: '#FF8C5A',
    dark: '#CC5529',
  },
  morado: {
    DEFAULT: '#7B2D8E',
    light: '#9B4DB0',
    dark: '#5C1F6B',
  },
  dorado: {
    DEFAULT: '#FFD700',
    light: '#FFE55C',
    dark: '#CCB000',
  },
  // Extender para dark mode
}
```

## Contenido Inicial

Crear páginas placeholder con estructura básica para:
1. Home: Hero impactante con animación, introducción, preview de secciones
2. Historia: Timeline interactivo o narrativa con imágenes
3. Galería: Grid masonry o carousel con lightbox
4. Elementos: Cards con iconos y descripciones de cada elemento
5. Música: Player con lista de canciones tradicionales
6. Videos: Grid de videos embebidos con categorías
7. Recetas: Cards con imágenes, ingredientes, y pasos

## Comandos a Ejecutar

1. Inicializar proyecto Astro con TypeScript
2. Instalar Tailwind CSS y configurar con paleta personalizada
3. Instalar e inicializar shadcn/ui
4. Instalar dependencias de animación (framer-motion, gsap, lenis)
5. Instalar astro-i18next para multiidioma
6. Crear estructura de carpetas completa
7. Configurar layout principal con theme provider y language switcher
8. Crear las 7 páginas básicas con contenido placeholder
9. Configurar estilos globales con paleta personalizada
10. Agregar README.md explicando el proyecto y cómo contribuir

## Notas Importantes

- Las imágenes de Pinterest son solo para inspiración, no para uso directo
- El diseño debe ser desktop-first con experiencia responsiva en móviles
- Priorizar performance y accesibilidad sobre efectos visuales
- Usar componentes de código abierto con licencias permisivas
- Documentar cómo agregar contenido nuevo (imágenes, recetas, etc.)
- El estilo visual debe ser 100% inspirado en el Día de Muertos mexicano
- Testing en múltiples dispositivos y navegadores
- Validación HTML y CSS sin errores

El proyecto debe quedar listo para empezar a agregar contenido real inmediatamente y debe verse PROFESIONAL e IMPACTANTE desde el primer día, con performance excelente y accesibilidad completa.
