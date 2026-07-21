/**
 * Prefix a site-relative path with the configured base path (GitHub Pages
 * project sites are served from /AffiliateSite/). All internal hrefs in
 * components and layouts must go through this helper.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!path.startsWith('/')) path = `/${path}`;
  // enforce trailing slash for page routes (trailingSlash: 'always')
  if (!/\.[a-z0-9]+$/i.test(path) && !path.endsWith('/')) path = `${path}/`;
  return `${base}${path}`;
}

/** Canonical article path for a collection entry's frontmatter. */
export function articlePath(contentType: string, category: string, slug: string): string {
  if (contentType === 'roundup') return `/gear/${category}/${slug}/`;
  if (contentType === 'review') return `/reviews/${slug}/`;
  return `/guides/${slug}/`;
}

export function ozToGrams(oz: number): number {
  return Math.round(oz * 28.3495);
}

export function formatWeight(weightOz: number | null): string {
  if (weightOz === null) return 'not published';
  return `${weightOz} oz / ${ozToGrams(weightOz)} g`;
}
