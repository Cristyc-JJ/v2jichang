import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://v2raytizi.com',
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark-default' } }
});
