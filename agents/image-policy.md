# Image Policy

Applies to every agent (03-publisher assigns imagery; others reference it).

## Allowed
1. **Category placeholder SVGs** in `public/images/placeholders/` — the default for every new
   article. Neutral, text-on-color, obviously not product photography.
2. **Affiliate-program product imagery** — photos a program explicitly licenses to affiliates
   (e.g., via an approved API/datafeed). Store the program name + license basis in a comment in
   the article frontmatter or an adjacent `.license` file.
3. **Original diagrams** generated from spec data (e.g., a weight-comparison bar chart built
   from the article's own frontmatter numbers). Must be reproducible from sourced data.

## Forbidden — no exceptions
- Scraping manufacturer or retailer photos without an affiliate-program license
- Any image that depicts or implies *our* first-hand use of a product (staged "field photos,"
  AI-generated hero shots of gear in the wild presented as real, hands holding products)
- Stock photography presented as product photography
- AI-generated images of specific real products (misrepresents the product; spec-accurate
  diagrams are the honest alternative)

Alt text: factual description only ("Durston X-Mid 2 product image, manufacturer photo" or
"placeholder graphic for shelters category") — never fabricated context ("our test setup at
camp").
