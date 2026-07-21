import registry from '@data/affiliate-links.json';

export interface AffiliateEntry {
  name: string;
  brand: string;
  program: string;
  url: string;
  fallbackUrl: string;
}

const links = registry.links as Record<string, AffiliateEntry>;

/** Resolve a registry key to its live URL. Throws at build time on unknown keys. */
export function resolveAffiliate(key: string): { entry: AffiliateEntry; href: string; pending: boolean } {
  const entry = links[key];
  if (!entry) {
    throw new Error(
      `Affiliate registry key "${key}" not found in src/data/affiliate-links.json. ` +
        'Add the product to the registry (or flag for manual addition) before publishing.'
    );
  }
  const pending = entry.url === 'PENDING_AFFILIATE_ID';
  const href = pending ? entry.fallbackUrl : entry.url;
  return { entry, href, pending };
}

export function hasAffiliateLinks(products: unknown[] | undefined): boolean {
  return Array.isArray(products) && products.length > 0;
}
