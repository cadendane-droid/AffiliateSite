import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_NAME, SITE_TAGLINE } from '../data/site';
import { articlePath } from '../lib/url';

export async function GET(context) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: SITE_NAME,
    description: SITE_TAGLINE,
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publishDate,
      link: `${base}${articlePath(a.data.contentType, a.data.category, a.data.slug)}`,
    })),
  });
}
