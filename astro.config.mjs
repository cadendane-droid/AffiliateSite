// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project-site defaults. Override with SITE_URL / BASE_PATH env
// vars once a custom domain (ounceledger.com) is pointed at the site.
const SITE = process.env.SITE_URL ?? 'https://cadendane-droid.github.io';
const BASE = process.env.BASE_PATH ?? '/AffiliateSite';
const basePrefix = BASE.replace(/\/$/, '');

/**
 * Rewrite site-relative hrefs in markdown/MDX bodies (e.g. "/guides/foo/") to
 * include the deploy base path, so internal links survive GitHub Pages
 * project hosting without authors ever writing the base by hand.
 */
function rehypeBaseLinks() {
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && basePrefix && !href.startsWith(`${basePrefix}/`)) {
        node.properties.href = `${basePrefix}${href}`;
      }
    }
    (node.children ?? []).forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
