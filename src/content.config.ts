import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = [
  'shelters',
  'sleep-systems',
  'backpacks',
  'cooking',
  'water',
  'clothing',
  'footwear',
  'navigation-safety',
  'tools-repair',
] as const;

const priceBand = z.enum(['$', '$$', '$$$']);

const product = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  /**
   * Registry key into src/data/affiliate-links.json — NOT a raw URL.
   * The <AffiliateLink> component resolves the key to the live monetized URL.
   * integrity-check fails the build if the key is missing from the registry.
   */
  affiliateUrl: z.string().regex(/^[a-z0-9-]+$/, 'affiliateUrl must be a registry key (kebab-case), never a raw URL'),
  affiliateProgram: z.string().min(1),
  priceBand,
  /** Manufacturer-published weight in ounces. null = "not published" — never guess. */
  weightOz: z.number().positive().nullable(),
  keySpecs: z.record(z.string(), z.string()),
  bestFor: z.string().min(1),
  pros: z.array(z.string()).min(2),
  cons: z.array(z.string()).min(1),
  award: z.enum(['top-pick', 'budget-pick', 'lightweight-pick']).nullable().default(null),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(10).max(80),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    description: z.string().min(70).max(180),
    category: z.enum(CATEGORIES),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    author: z.string().min(1),
    primaryKeyword: z.string().min(3),
    secondaryKeywords: z.array(z.string()),
    searchIntent: z.enum(['commercial', 'informational', 'transactional']),
    contentType: z.enum(['roundup', 'review', 'guide']),
    products: z.array(product).default([]),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    /** Site-relative paths of pages this article links to in its body. */
    internalLinks: z.array(z.string().startsWith('/')),
    schemaType: z.enum(['ItemList', 'Product', 'Article']),
    /** Run ID of the agent that produced this article ("seed" for launch content). */
    agentRunId: z.string().min(1),
    experimentTags: z.array(z.string()).default([]),
    /** Path to the research brief this article was written from. Required for commercial content. */
    researchDoc: z.string().optional(),
    /** Which keySpecs key to surface as the comparison table's "key spec" column. */
    keySpecLabel: z.string().optional(),
    /**
     * "The competition": products evaluated but cut, with the honest reason.
     * A standard trust block on high-performing affiliate roundups.
     */
    alsoConsidered: z
      .array(z.object({ name: z.string(), brand: z.string(), reason: z.string() }))
      .default([]),
    /**
     * Layout A/B lever for 04-seo: where the verdict box + comparison table render.
     * 'top' (default, proven pattern) or 'bottom' (before the FAQ).
     */
    verdictPosition: z.enum(['top', 'bottom']).default('top'),
    draft: z.boolean().default(false),
  }).superRefine((data, ctx) => {
    if (data.contentType !== 'guide' && data.products.length < 1) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'roundup/review articles must include at least one product' });
    }
    if (data.contentType === 'guide' && data.products.length > 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'guides are non-commercial: products[] must be empty' });
    }
    if (data.contentType !== 'guide' && !data.researchDoc) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'commercial content must reference its researchDoc (spec traceability, integrity rule 3)' });
    }
  }),
});

export const collections = { articles };
