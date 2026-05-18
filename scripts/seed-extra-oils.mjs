import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return env;
}

const env = loadEnv(resolve(__dirname, '../studio/.env'));

const client = createClient({
  projectId: 'lk5dzwr6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

function makeKeyGen() {
  let n = 0;
  return () => `k${++n}`;
}

function buildBlocks(segments) {
  const k = makeKeyGen();
  return segments.map(([style, text]) => ({
    _type: 'block',
    _key: k(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
  }));
}

function toSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const articles = [
  {
    title: 'Pura D\'or Tea Tree Essential Oil Review: Certified Organic Antimicrobial Power',
    excerpt: 'Pura D\'or\'s Tea Tree essential oil delivers USDA-certified organic purity in one of nature\'s most proven antimicrobials — ideal for skin care, natural cleaning, and scalp health without synthetic additives.',
    body: buildBlocks([
      ['normal', 'Tea tree oil is one of the most studied essential oils in the world, and the difference between a quality sourced product and a commodity-grade one is significant. Pura D\'or\'s Tea Tree Essential Oil brings USDA Organic certification to one of aromatherapy\'s most essential workhorse oils — meaning the antimicrobial compounds you depend on come from clean, uncontaminated plant material.'],
      ['h2', 'What Is It?'],
      ['normal', 'Pura D\'or Tea Tree Essential Oil is steam-distilled from the leaves of Melaleuca alternifolia grown to certified organic standards. Pura D\'or is a clean beauty brand known for its commitment to high-quality, organic ingredients — particularly in the hair care and skincare space. Their tea tree oil reflects that same standard: 100% pure, undiluted, and free from synthetic additives or carrier oils.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'The therapeutic activity of tea tree oil centers on terpinen-4-ol — a compound shown in multiple studies to disrupt bacterial and fungal cell membranes. Certified organic sourcing matters here because conventional tea tree farming can involve pesticides that end up concentrated in the distilled oil. The USDA Organic certification on Pura D\'or\'s version ensures you\'re getting a clean, high-terpinen-4-ol oil without residue concerns.'],
      ['normal', 'Pura D\'or\'s oil is GC/MS tested — gas chromatography/mass spectrometry — which verifies the biochemical profile of each batch and screens for adulteration. This level of third-party transparency is a meaningful indicator of quality in the essential oil market.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'For acne and skin breakouts, tea tree oil diluted in a carrier oil (1–2%) applied to affected areas is one of the best-studied natural alternatives to benzoyl peroxide — with comparable efficacy and significantly fewer side effects in published clinical trials. For scalp health and dandruff, adding a few drops to your regular shampoo provides antifungal activity against Malassezia, the yeast responsible for most dandruff.'],
      ['normal', 'As a household cleaner, adding 10–15 drops to a spray bottle with water and white vinegar creates an effective, non-toxic all-purpose cleaner with genuine antimicrobial activity. For nail fungus, diluted tea tree applied twice daily has documented efficacy in clinical studies.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Those with acne-prone skin, dandruff, nail fungus, or anyone building a non-toxic home cleaning kit. Particularly valuable for anyone who wants the full antimicrobial benefits of tea tree from a certified organic source without pesticide residue concerns.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Pura D\'or Tea Tree Essential Oil sets a high standard in the certified organic essential oil space. GC/MS testing, USDA Organic certification, and a clean sourcing reputation make it one of the most trustworthy tea tree oils on the market. For skincare, scalp care, and natural cleaning, this belongs in your toolkit.'],
    ]),
  },
  {
    title: 'Lagunamoon Cedarwood Essential Oil Review: 100% Pure Sleep and Scalp Support at an Accessible Price',
    excerpt: 'Lagunamoon\'s 100% Pure Cedarwood Essential Oil delivers the grounding, sleep-supporting properties of Atlas cedarwood at an everyday price point — a clean, undiluted oil that holds its own against premium alternatives.',
    body: buildBlocks([
      ['normal', 'Cedarwood essential oil is one of the most scientifically credible natural sleep aids available — and Lagunamoon\'s 100% Pure Cedarwood makes that therapeutic access affordable without sacrificing purity. For anyone exploring essential oils for sleep, anxiety, or hair health, this is a dependable and cost-effective entry point.'],
      ['h2', 'What Is It?'],
      ['normal', 'Lagunamoon Cedarwood Essential Oil is steam-distilled from Cedrus atlantica wood, the same species that provides the warm, woody base note prized by perfumers and aromatherapists alike. Lagunamoon positions their oils as 100% pure, undiluted, and uncut — no carrier oil added, no synthetic stretching agents, just the distilled oil from the wood.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Cedarwood oil\'s primary active compound is cedrol, a sesquiterpene with documented sedative and anxiolytic properties. Research published in Planta Medica demonstrated cedrol\'s ability to reduce locomotor activity and increase sleep duration in animal studies, validating the traditional use of cedarwood for calming and sleep induction. The warm, grounding aroma activates the olfactory-limbic pathway that connects scent directly to emotional and physiological states.'],
      ['normal', 'Alongside cedrol, cedarwood contains atlantone and himachalenes — compounds associated with its hair-growth supporting reputation. The original alopecia areata study that popularized essential oils for hair loss included cedarwood as one of the active blend components, and its scalp-stimulating properties have been reported consistently by practitioners since.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'For sleep, diffusing 3–5 drops in the bedroom 20–30 minutes before sleep is the most common and accessible application. The scent signals the nervous system to downshift, and the cedrol inhaled during sleep supports staying in deeper rest phases. Combining with lavender amplifies the calming effect significantly.'],
      ['normal', 'For hair and scalp support, mixing 3–5 drops with a tablespoon of jojoba or coconut oil and massaging into the scalp 2–3 times per week targets circulation and follicle health. Lagunamoon\'s accessible price makes regular scalp massage practice sustainable without feeling like a luxury splurge.'],
      ['normal', 'Emotionally, cedarwood is excellent for grounding during anxiety or overwhelm — applied diluted to the wrists or chest, or diffused during stressful work periods, it provides a centering anchor without sedating cognitive function during the day.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone seeking an affordable, pure cedarwood oil for sleep support, anxiety management, or hair health practice. Also ideal for essential oil beginners who want to explore therapeutic aromatherapy without committing to a premium price point upfront.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Lagunamoon Cedarwood Essential Oil delivers genuine value in a clean, undiluted package. The sleep and hair health benefits of cedarwood are well-documented, and Lagunamoon makes them accessible at a price that encourages daily use rather than careful rationing. A smart addition to any holistic wellness kit.'],
    ]),
  },
];

async function main() {
  console.log('Connecting to Sanity...');

  const categoryId = 'category-physical-health';
  await client.createIfNotExists({
    _id: categoryId,
    _type: 'category',
    title: 'Physical Health',
    slug: { _type: 'slug', current: 'physical-health' },
    description: 'Products, practices, and insights for optimizing your physical wellbeing — skincare, haircare, nutrition, movement, and clean living.',
  });

  for (const article of articles) {
    const slug = toSlug(article.title);
    const docId = `post-${slug}`.slice(0, 80);

    await client.createOrReplace({
      _id: docId,
      _type: 'post',
      title: article.title,
      slug: { _type: 'slug', current: slug },
      excerpt: article.excerpt,
      publishedAt: new Date().toISOString(),
      categories: [{ _type: 'reference', _ref: categoryId }],
      body: article.body,
    });

    console.log(`  Created: ${article.title}`);
  }

  console.log('\nDone — 2 additional articles published to Sanity.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
