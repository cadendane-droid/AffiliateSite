export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
}

/**
 * NOTE: Replace with a real, named human before serious scale. A real author
 * identity (name, photo, history) is both an honesty measure and an E-E-A-T
 * signal. The collective byline below is honest about the process but should
 * not be a permanent substitute for a person who stands behind the site.
 */
export const AUTHORS: Author[] = [
  {
    slug: 'ounce-ledger-editors',
    name: 'Caden Orner',
    role: 'Research & Editorial',
    bio: 'Ounce Ledger reviews are produced by a structured research pipeline: we aggregate manufacturer specifications, verified owner reviews, and published third-party lab and field testing, then synthesize them under a fixed methodology with automated integrity checks. We do not field-test gear ourselves, and no article on this site will ever claim otherwise. Every spec we print traces to a recorded source; anything we could not verify is labeled "not published."',
  },
];

export const getAuthor = (slug: string): Author => {
  const a = AUTHORS.find((x) => x.slug === slug);
  if (!a) throw new Error(`Unknown author: ${slug}`);
  return a;
};
