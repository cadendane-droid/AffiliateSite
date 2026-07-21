# Image Policy

Applies to every agent (03-publisher assigns imagery; others reference it).

## Allowed
1. **Affiliate-program product imagery** (preferred) — photos a program explicitly licenses to
   affiliates via an approved API/datafeed. Record `sourceUrl` + `credit` in the registry
   `image` field.
2. **Manufacturer product images, visually verified** — a product photo from the maker's own
   product page, used to depict that exact product beside its affiliate link, downloaded to
   `public/images/products/<registry-key>.*`, with `sourceUrl` and `credit` recorded. The
   verification step is mandatory: a human-equivalent visual check that the image shows the
   exact product (og:image scraping returns logos and wrong models — see decision D-002).
   Replace with datafeed imagery when the program approves.
3. **Category placeholder SVGs** in `public/images/placeholders/` — the fallback when no
   verified product image exists. Products without one render an honest "photo pending" note.
4. **Original diagrams** generated from spec data (e.g., a weight-comparison bar chart built
   from the article's own frontmatter numbers). Must be reproducible from sourced data.

## Forbidden — no exceptions
- Publishing any product image whose content was not verified as the exact product
- Any image that depicts or implies *our* first-hand use of a product (staged "field photos,"
  AI-generated hero shots of gear in the wild presented as real, hands holding products)
- Stock photography presented as product photography
- AI-generated images of specific real products (misrepresents the product; spec-accurate
  diagrams are the honest alternative)

Alt text: factual description only ("Durston X-Mid 2 product image, manufacturer photo" or
"placeholder graphic for shelters category") — never fabricated context ("our test setup at
camp").
