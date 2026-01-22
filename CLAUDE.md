# CLAUDE.md - Project Context for Claude Code

## Project Overview

**VK4Y** is a free, browser-based photo downloader for VK.com (VKontakte). The application runs 100% client-side with no server processing, ensuring user privacy. Users can authenticate with VK, select albums, and download photos as ZIP files.

**Live Site:** https://morovinger.github.io/vk4y/

## Tech Stack

- **Framework:** Nuxt 3 (SSR disabled, client-only SPA)
- **UI:** Vue 3 + Vuetify 3 (Material Design 2)
- **Language:** TypeScript
- **Styling:** LESS
- **i18n:** @nuxtjs/i18n (Russian default, English available)
- **Build:** Vite via Nuxt
- **Deployment:** GitHub Pages (gh-pages)

## Project Structure

```
vk4y/
├── pages/
│   ├── index.vue          # Main download page (URL input, album selection, ZIP creation)
│   └── about.vue          # FAQ/About page
├── components/
│   ├── album/             # Album-related components
│   │   ├── AlbumUrlForm.vue
│   │   ├── AlbumSelector.vue
│   │   ├── DownloadActions.vue
│   │   └── MetadataSettings.vue
│   ├── common/
│   │   ├── error.vue
│   │   └── StatusDisplay.vue
│   └── VkAuth.vue         # VK OAuth component
├── services/
│   └── vkPhotoService.ts  # VK API interaction (albums, photos, metadata)
├── composables/
│   └── useGlobalError.ts  # Global error state
├── plugins/
│   └── globalToken.ts     # VK auth token from cookies
├── types/
│   └── global.d.ts        # TypeScript interfaces (Album, Photo, PhotoMetadata)
├── layouts/
│   └── default.vue        # App shell with nav drawer
├── assets/
│   └── style.less         # Global styles
└── public/                # Static assets (favicon, og-image, robots.txt)
```

## Key Files

- **nuxt.config.ts** - App configuration, modules, SEO settings
- **i18n.config.ts** - All translation strings (Russian/English)
- **services/vkPhotoService.ts** - Core VK API service class
- **pages/index.vue** - Main application logic and ZIP creation

## Common Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Production build
npm run generate   # Static site generation
npm run lint       # ESLint check
npm run lint:fix   # Auto-fix lint issues
npm run deploy     # Deploy to GitHub Pages
```

## Environment Variables

Create `.env` file based on `.env.example`:
```
NUXT_PUBLIC_VK_APP_ID=6656971
```

## VK API Integration

- Uses VK Open API SDK loaded from `https://vk.com/js/api/openapi.js`
- API Version: 5.199
- Auth token stored in cookie: `vk_app_{appId}`
- Key methods in `vkPhotoService.ts`:
  - `getUserAlbums()` - Fetch album list or specific album
  - `getUserPhotos()` - Recursive pagination for 1000+ photos
  - `extractLargestImages()` - Select best quality image
  - `getPhotoMetadata()` - Fetch likes, comments, tags

## Special Album IDs

- `-6` = Wall photos
- `-7` = Profile photos
- `saved` = Saved photos (not downloadable due to VK permissions)

## Architecture Notes

- **ZIP batching:** Albums with 1500+ photos split into multiple ZIPs
- **Memory management:** Uses `URL.revokeObjectURL()` for cleanup
- **No server-side:** All processing happens in browser
- **Progress tracking:** Real-time percentage during download

## Coding Conventions

- Vue 3 Composition API with `<script setup>`
- Component imports explicit (not auto-imported)
- i18n keys in `i18n.config.ts` for all UI text
- Vuetify components prefixed with `v-`
- TypeScript strict mode

## Testing

Currently no test suite. When adding tests:
- Use Vitest for unit tests
- Use Playwright/Cypress for e2e
- Mock VK API responses

## Deployment

GitHub Pages deployment via `gh-pages` package:
- Base URL: `/vk4y/`
- Assets directory: `assets` (not `_assets` for GH Pages compatibility)
- Run `npm run generate && npm run deploy`
