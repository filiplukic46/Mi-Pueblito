// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production URL (assumption: the client's current domain). Canonical, OG and sitemap depend on it.
// The GitHub Pages preview build sets SITE_URL and BASE_PATH (see .github/workflows/deploy.yml).
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.mipueblitomedfordnj.com',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
});
