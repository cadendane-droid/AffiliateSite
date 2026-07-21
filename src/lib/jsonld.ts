import type { CollectionEntry } from 'astro:content';
import { SITE_NAME } from '@data/site';

type Article = CollectionEntry<'articles'>['data'];

const PRICE_BAND_TEXT: Record<string, string> = {
  $: 'budget',
  $$: 'mid-range',
  $$$: 'premium',
};

function productLd(p: Article['products'][number]) {
  return {
    '@type': 'Product',
    name: p.name,
    brand: { '@type': 'Brand', name: p.brand },
    ...(p.weightOz !== null
      ? { weight: { '@type': 'QuantitativeValue', value: p.weightOz, unitCode: 'ONZ' } }
      : {}),
    description: `${p.bestFor} (${PRICE_BAND_TEXT[p.priceBand]} price band)`,
  };
}

export function articleJsonLd(data: Article, canonicalUrl: string): Record<string, unknown>[] {
  const blocks: Record<string, unknown>[] = [];

  const base = {
    '@context': 'https://schema.org',
    headline: data.title,
    description: data.description,
    datePublished: data.publishDate.toISOString(),
    dateModified: data.updatedDate.toISOString(),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: canonicalUrl,
  };

  if (data.schemaType === 'ItemList' && data.products.length > 0) {
    blocks.push({
      ...base,
      '@type': 'Article',
    });
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: data.title,
      itemListElement: data.products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: productLd(p),
      })),
    });
  } else if (data.schemaType === 'Product' && data.products.length > 0) {
    blocks.push({ ...base, '@type': 'Article' });
    blocks.push({ '@context': 'https://schema.org', ...productLd(data.products[0]!) });
  } else {
    blocks.push({ ...base, '@type': 'Article' });
  }

  if (data.faqs.length > 0) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return blocks;
}
