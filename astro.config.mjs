// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production URL (assumption: the client's current domain). Canonical, OG and sitemap depend on it.
export default defineConfig({
  site: 'https://www.mipueblitomedfordnj.com',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
});
