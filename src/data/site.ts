export const SITE_NAME = 'Ounce Ledger';
export const SITE_TAGLINE = 'Backpacking gear, weighed and verified.';
export const SITE_PROMISE =
  'Every piece of backpacking gear here is evaluated by the numbers — verified weight, packed size, and durability evidence — so you can build a lighter pack without gambling on marketing copy.';

/**
 * Email capture is stubbed until a provider is chosen.
 * Replace with a real endpoint (Buttondown, ConvertKit, etc.) and wire the
 * form in EmailCapture.astro to POST to it.
 */
export const TODO_EMAIL_PROVIDER = 'TODO_EMAIL_PROVIDER';

export interface CategoryMeta {
  slug: string;
  title: string;
  blurb: string;
  /** Hub-page intro: what actually matters when buying in this category. */
  intro: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    slug: 'shelters',
    title: 'Shelters',
    blurb: 'Tents, tarps, and bivies you carry on your back.',
    intro:
      'A backpacking shelter is a three-way trade between weight, livable space, and weather protection — and manufacturers only advertise the two their product wins. We list trail weight (what you actually carry) alongside packaged weight, note whether the pitch needs trekking poles, and flag single-wall condensation behavior that spec sheets never mention. Floor dimensions are quoted from manufacturer drawings, not marketing "sleeps 2" claims.',
  },
  {
    slug: 'sleep-systems',
    title: 'Sleep Systems',
    blurb: 'Sleeping bags, quilts, and pads rated honestly.',
    intro:
      'Sleep systems are where cold, miserable nights come from — usually because a "20°F" bag was a survival rating, not a comfort rating. We report ISO/EN comfort and limit ratings separately when published, list fill power and fill weight rather than trusting loft claims, and give pad R-values from the ASTM standard test. Weight is quoted for the size actually tested, not the shortest one in the lineup.',
  },
  {
    slug: 'backpacks',
    title: 'Backpacks',
    blurb: 'Packs from ultralight framebags to load haulers.',
    intro:
      'Pack choice follows everything else: buy the pack last, after you know your base weight. What matters is verified empty weight, realistic max comfortable load (not the marketing max), torso-length sizing range, and fabric durability evidence from owner reports. We treat removable-feature weights (brain, frame sheet, hip belt) explicitly, because "2 lb pack" often means "3 lb pack as shipped."',
  },
  {
    slug: 'cooking',
    title: 'Cooking',
    blurb: 'Stoves, pots, and fuel strategy for the trail.',
    intro:
      'Backcountry kitchens are judged in grams and boil times — but wind performance is the spec that decides whether you eat hot food, and it rarely appears on the box. We compare burner weight, published boil times with the test conditions attached, simmer control, and pot-stability geometry. Fuel type trade-offs (canister vs. alcohol vs. esbit) are covered in guides, not buried in product blurbs.',
  },
  {
    slug: 'water',
    title: 'Water',
    blurb: 'Filters, purifiers, and carry systems.',
    intro:
      'Every backcountry filter sold today will stop bacteria and protozoa; the honest differences are flow rate as the filter clogs, freeze vulnerability, field cleanability, and the threading/compatibility ecosystem it locks you into. We report manufacturer-rated filter life with the caveat it deserves, and we treat "virus-rated" claims as the niche spec they are for North American backpacking.',
  },
  {
    slug: 'clothing',
    title: 'Clothing',
    blurb: 'Layers that earn their weight in your pack.',
    intro:
      'Clothing is the easiest place to carry a pound you never wear. We evaluate insulation by fill weight and shell fabric rather than brand mythology, rain gear by hydrostatic head and breathability numbers where published, and base layers by fabric weight (gsm). The question for every garment: what does it do that a layer you already own does not?',
  },
  {
    slug: 'footwear',
    title: 'Footwear',
    blurb: 'Trail runners, boots, and what the miles do to them.',
    intro:
      'The trail-runner-versus-boot argument is settled by your pack weight, your ankles, and your terrain — not by anyone\'s marketing. We list verified single-shoe weights by size where published, stack height and drop, and the owner-reported durability patterns (upper blowouts, midsole packout mileage) that determine real cost per mile.',
  },
  {
    slug: 'navigation-safety',
    title: 'Navigation & Safety',
    blurb: 'Maps, satellite messengers, headlamps, first aid.',
    intro:
      'This is the category where failure modes matter more than features. We evaluate satellite messengers by subscription cost structure and antenna performance reports, headlamps by tested runtime at a stated brightness (not peak-lumen marketing), and first-aid kits by what is actually inside them versus their weight. Redundancy recommendations are explicit about what is safety-critical and what is preference.',
  },
  {
    slug: 'tools-repair',
    title: 'Tools & Repair',
    blurb: 'Trowels, knives, and field-repair kits.',
    intro:
      'Small items are where base weight quietly bloats: a 7 oz knife doing a 0.7 oz knife\'s job. We compare tools by the task they must survive — digging in rooty soil, cutting cord, patching a pad at 2 a.m. — with verified weights and materials. Multi-tools are evaluated against carrying the two single-purpose items they replace.',
  },
];

export const categoryMeta = (slug: string): CategoryMeta => {
  const meta = CATEGORY_META.find((c) => c.slug === slug);
  if (!meta) throw new Error(`Unknown category: ${slug}`);
  return meta;
};
