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

// Per-document key generator
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

// Slug helper
function toSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ─── Articles ────────────────────────────────────────────────────────────────

const articles = [
  {
    title: 'MyChelle Dermaceuticals Fruit Enzyme Scrub Review: Brighter Skin Without the Harsh Chemicals',
    excerpt: 'Looking for a gentle exfoliator that actually delivers? MyChelle\'s Fruit Enzyme Scrub uses papaya and pineapple enzymes to dissolve dead skin cells and reveal a luminous complexion — all without synthetic abrasives or toxic ingredients.',
    body: buildBlocks([
      ['normal', 'When it comes to clean beauty exfoliation, few products balance efficacy and gentleness as well as the MyChelle Dermaceuticals Strengthen Fruit Enzyme Scrub. Using the natural power of fruit-derived enzymes, this scrub brightens skin without the micro-tears that can come from harsher physical exfoliants.'],
      ['h2', 'What Is It?'],
      ['normal', 'The Fruit Enzyme Scrub is part of MyChelle\'s Strengthen collection, designed to gently resurface skin using enzymatic action. Instead of relying on abrasive particles, this formula breaks down and lifts away dead skin cells the way nature intended — through enzymatic digestion.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Papain (from papaya) and bromelain (from pineapple) are the stars here. These proteolytic enzymes naturally digest dead skin protein, making them ideal for chemical exfoliation without the potential irritation of AHAs or BHAs. The formula is also enriched with vitamin C precursors that support brightening over time.'],
      ['normal', 'MyChelle is committed to clean formulations — free from parabens, phthalates, artificial fragrance, and cruelty-free. The entire line is non-GMO verified, which aligns perfectly with a holistic, toxin-conscious lifestyle.'],
      ['h2', 'What We Love'],
      ['normal', 'The texture strikes the right balance: creamy enough to feel nourishing, with just enough physical texture for a satisfying cleanse alongside the enzymatic action. Skin feels noticeably smoother and looks more luminous after use, especially around areas prone to dullness. It rinses cleanly without residue.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'This scrub is ideal for normal to dry or sensitive skin types who want regular exfoliation without risk of irritation. It\'s also a great choice for anyone transitioning from conventional beauty products who wants proven results from clean ingredients.'],
      ['h2', 'Final Verdict'],
      ['normal', 'The MyChelle Dermaceuticals Fruit Enzyme Scrub delivers on brightening and smoothing while staying true to clean, non-toxic standards. If you want visibly glowing skin without synthetic chemicals, this one earns a permanent spot on your shelf.'],
    ]),
  },
  {
    title: 'Dr. Organic Calendula Shampoo Review: Soothing Care for Sensitive Scalps',
    excerpt: 'Dr. Organic\'s Calendula Shampoo is a gentle, botanically-rich formula designed to calm irritation and restore balance to sensitive scalps — using one of nature\'s most trusted healing plants.',
    body: buildBlocks([
      ['normal', 'Calendula has been used in natural medicine for centuries, and for good reason. Its anti-inflammatory, soothing properties make it one of the best botanicals for sensitive skin — and Dr. Organic has harnessed it beautifully in this gentle, certified organic shampoo.'],
      ['h2', 'What Is It?'],
      ['normal', 'Dr. Organic\'s Calendula Shampoo is a mild, sulfate-free formula built around certified organic calendula extract. It\'s designed for sensitive scalps and hair types that react poorly to conventional shampoos loaded with synthetic detergents and fragrance.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Calendula officinalis extract is the headline ingredient — known for its ability to reduce scalp redness, inflammation, and irritation. It pairs with gentle cleansing agents derived from coconut and corn to remove buildup without stripping the scalp\'s natural oil balance. No SLS, no parabens, no artificial colors.'],
      ['h2', 'What We Love'],
      ['normal', 'The lather is light and pleasant without being overwhelming. Hair feels clean but not squeaky-dry after washing — a common complaint with harsher shampoos. The calendula scent is subtle and natural, not synthetic. It\'s also cruelty-free and vegan-certified.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone with a sensitive, dry, or easily irritated scalp will benefit most. It\'s also a good choice for color-treated hair since gentle cleansers preserve pigment longer than sulfate-heavy alternatives.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Dr. Organic\'s Calendula Shampoo is a reliable, botanically sound choice for scalp-sensitive individuals who want clean ingredients without sacrificing performance. A solid addition to any natural hair care routine.'],
    ]),
  },
  {
    title: 'California Baby Calendula Shampoo & Body Wash Review: The Gentlest Clean for Your Whole Family',
    excerpt: 'California Baby\'s Calendula Shampoo & Body Wash is one of the most trusted gentle cleansers on the market — plant-based, tear-free, and safe enough for the most sensitive skin in your family.',
    body: buildBlocks([
      ['normal', 'California Baby has been a staple in natural parenting circles for decades, and the Calendula Shampoo & Body Wash is one of their most beloved formulas. Originally created with babies in mind, it\'s gentle enough for the whole family — especially those with eczema-prone or reactive skin.'],
      ['h2', 'What Is It?'],
      ['normal', 'This 2-in-1 shampoo and body wash uses calendula and chamomile as its botanical base, creating a calming, non-irritating cleanse. The formula is plant-based, fragrance-free-option available, and designed to be mild enough for daily use on newborns through adults.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Calendula extract soothes and reduces redness, while chamomile adds an additional layer of anti-inflammatory support. The cleansing base is derived entirely from plants — no SLS, no parabens, no synthetic fragrance, no phthalates. It\'s also certified vegan and cruelty-free.'],
      ['normal', 'For families navigating eczema, psoriasis, or general skin sensitivity, this kind of transparent, minimal formulation is not just a preference — it\'s a necessity.'],
      ['h2', 'What We Love'],
      ['normal', 'The formula doesn\'t sting eyes, which makes it genuinely tear-free rather than just marketed that way. It rinses completely without leaving a film, and the mild botanical scent is comforting without being overpowering. One bottle handles both hair and body, which simplifies routines.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Families with babies, toddlers, or anyone with sensitive skin, eczema, or allergies to synthetic fragrance. Also excellent for adults who prefer an ultra-minimal, non-toxic daily cleanser.'],
      ['h2', 'Final Verdict'],
      ['normal', 'California Baby Calendula Shampoo & Body Wash is the gold standard for gentle family cleansing. Trustworthy ingredients, proven gentleness, and a track record that spans decades. It belongs in every natural home.'],
    ]),
  },
  {
    title: 'Dr. Bronner\'s Lavender Organic Shaving Soap Review: A Close Shave the Clean Way',
    excerpt: 'Dr. Bronner\'s Lavender Organic Shaving Soap delivers a smooth, irritation-free shave using certified organic oils and lavender — no synthetic lubricants, no hidden chemicals, just a genuinely close and calming shave.',
    body: buildBlocks([
      ['normal', 'Dr. Bronner\'s has been a leader in certified organic personal care since before "clean beauty" was a category. Their Lavender Organic Shaving Soap carries that same philosophy into the shave — offering a rich, lubricating lather from organic plant oils that protects skin during every pass of the blade.'],
      ['h2', 'What Is It?'],
      ['normal', 'This is a traditional bar shaving soap made with certified organic coconut, hemp, and jojoba oils, scented with pure lavender essential oil. It works with a shaving brush to build a dense, cushioning lather that allows for a close, comfortable shave.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Organic coconut oil creates the rich cleansing lather. Hemp seed oil and jojoba oil provide slip and post-shave moisture, reducing the need for a separate aftershave. Lavender essential oil isn\'t just for scent — it has genuine antibacterial and skin-calming properties that help prevent post-shave irritation and ingrown hairs.'],
      ['normal', 'The formula is certified Fair Trade, USDA organic, and Leaping Bunny certified. Every ingredient is accounted for — no mystery synthetics.'],
      ['h2', 'What We Love'],
      ['normal', 'The lather is genuinely luxurious — dense, slick, and long-lasting. The lavender scent is real and grounding, not synthetic and sharp. Skin feels moisturized after shaving rather than stripped, which is the highest compliment a shave product can earn.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone looking to replace conventional shaving cream or gel with a clean, certified organic option. Especially beneficial for those with sensitive skin or razor burn who have struggled with conventional shave products.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Dr. Bronner\'s Lavender Organic Shaving Soap is proof that clean formulations don\'t require compromise. It delivers a genuinely excellent shave while aligning completely with a non-toxic, holistically minded lifestyle.'],
    ]),
  },
  {
    title: 'Mill Creek Botanicals Jojoba Conditioner Review: Balance, Moisture, and Botanical Brilliance',
    excerpt: 'Mill Creek Botanicals\' Jojoba Balancing Conditioner uses one of nature\'s most skin-compatible oils to hydrate and balance all hair types — leaving hair soft, manageable, and free from synthetic buildup.',
    body: buildBlocks([
      ['normal', 'Jojoba oil is technically a liquid wax that closely mimics the sebum your scalp naturally produces — which makes it uniquely effective at conditioning hair without leaving it greasy or weighed down. Mill Creek Botanicals has built their Jojoba Balancing Formula Conditioner around this remarkable ingredient.'],
      ['h2', 'What Is It?'],
      ['normal', 'This is a lightweight, plant-based conditioner designed to hydrate and balance hair without disrupting its natural moisture equilibrium. The Balancing Formula name signals its core mission: to work with your hair\'s natural chemistry rather than overriding it with heavy synthetic conditioning agents.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Jojoba oil is the centerpiece — it penetrates the hair shaft to hydrate from within while also coating the cuticle for smoothness and shine. Supporting botanicals include aloe vera for added moisture and scalp soothing, and wheat protein to strengthen the hair shaft and reduce breakage over time.'],
      ['normal', 'The formula avoids parabens, artificial color, and unnecessary synthetic fragrance. Mill Creek has been making botanical personal care products for over 40 years — a longevity that speaks to the reliability of their formulas.'],
      ['h2', 'What We Love'],
      ['normal', 'It distributes evenly through hair and rinses out cleanly without leaving residue. Hair feels soft but not coated — a crucial distinction for those who\'ve been burned by heavy silicone conditioners that create buildup over time. It works particularly well for straight to wavy hair types.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Those with normal to fine hair who want reliable moisture without heaviness. Also excellent for oily scalp types who still need moisture at the ends — jojoba\'s balancing properties make it safe to use close to the roots without causing grease.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Mill Creek Botanicals Jojoba Conditioner is an underrated gem in the natural hair care space. It\'s effective, clean, and affordable — three things that don\'t always come together. Highly recommended for anyone building a botanical hair care routine.'],
    ]),
  },
  {
    title: 'Mad Hippie Jelly Cleanser Review: Gentle, Hydrating, and Actually Fun to Use',
    excerpt: 'Mad Hippie\'s Jelly Cleanser is a unique, jiggly gel-to-lather formula that cleanses skin thoroughly while keeping it hydrated — making it one of the most enjoyable clean beauty cleansers we\'ve tried.',
    body: buildBlocks([
      ['normal', 'Cleansers tend to get overlooked in skincare routines — they\'re on for thirty seconds and rinsed off, so why does it matter? Because a stripping, drying cleanser sets the wrong foundation for everything that follows. Mad Hippie\'s Jelly Cleanser takes the opposite approach: it cleans without compromising the skin barrier.'],
      ['h2', 'What Is It?'],
      ['normal', 'The Jelly Cleanser is a gel-textured face wash that transforms into a light lather when activated with water. The jelly consistency is genuinely delightful — it has a bouncy, almost playful texture that makes the cleansing ritual feel intentional rather than perfunctory.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Hyaluronic acid is built into the formula, which is unusual for a cleanser and genuinely smart — even as it removes impurities, it\'s simultaneously supporting your skin\'s hydration. Antioxidant botanicals including green tea and vitamin E help neutralize environmental damage accumulated during the day.'],
      ['normal', 'The formula is free from sulfates, parabens, synthetic fragrance, and artificial color. Mad Hippie is committed to ingredient transparency and lists everything clearly.'],
      ['h2', 'What We Love'],
      ['normal', 'Skin feels genuinely clean but never tight after using this. The absence of that dry, squeaky-clean feeling is the benchmark we use to judge a gentle cleanser — and this one passes easily. The texture also means you use less product per wash since it spreads effortlessly.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Dry, normal, or sensitive skin types will love this most. It\'s also a smart choice for anyone who double-cleanses, as its gentleness makes it ideal for the second cleanse step after an oil cleanser removes makeup.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Mad Hippie\'s Jelly Cleanser is clever, clean, and genuinely enjoyable to use. It treats cleansing as the first act of skincare rather than a pre-step, and that philosophy shows in the results. A standout in the crowded clean cleanser category.'],
    ]),
  },
  {
    title: 'Aromatia Rosemary Hair Thickening Conditioner Review: Natural Volume You Can Actually Feel',
    excerpt: 'Aromatia\'s Rosemary Hair Thickening Conditioner combines one of herbalism\'s most studied hair-growth botanicals with a conditioning base that adds real volume and thickness — without silicones or synthetic volumizing agents.',
    body: buildBlocks([
      ['normal', 'Rosemary has emerged as one of the most studied natural ingredients for hair health, with research suggesting it can be as effective as minoxidil for certain types of hair thinning. Aromatia\'s Rosemary Hair Thickening Conditioner brings that botanical credibility into a daily-use conditioner designed to build density over time.'],
      ['h2', 'What Is It?'],
      ['normal', 'This is a thickening conditioner formulated with rosemary extract as its active botanical. It\'s designed for regular use by those experiencing fine, thinning, or lackluster hair, with the goal of gradually improving both scalp circulation and hair shaft diameter.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Rosemary extract (Rosmarinus officinalis) is the cornerstone. It\'s been shown to stimulate scalp circulation, which supports the delivery of nutrients to hair follicles — the foundational mechanism behind healthy hair growth. Peppermint extract often accompanies rosemary in thickening formulas for its own circulation-enhancing effects, and the tingling sensation signals real scalp stimulation.'],
      ['normal', 'The conditioner base is free from sulfates, parabens, and silicones — which is important for a thickening product, since silicones are notorious for creating the illusion of volume while eventually causing buildup that weighs hair down.'],
      ['h2', 'What We Love'],
      ['normal', 'Hair feels noticeably fuller after the first few uses, and the scalp tingling from rosemary and peppermint gives immediate sensory confirmation that the product is working. The scent is herbaceous and invigorating — more spa than salon.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone with fine, thinning, or flat hair who wants a botanical approach to adding volume and supporting hair health. Particularly valuable for those noticing increased shedding or reduced density who want to address it naturally before turning to pharmaceutical options.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Aromatia\'s Rosemary Hair Thickening Conditioner is one of the more credible natural thickening products on the market — backed by an ingredient with real research behind it. For anyone on a holistic hair health journey, this is a worthwhile daily ritual.'],
    ]),
  },
  {
    title: 'Rahua Aloe Vera Shampoo Review: Luxury Amazon Botanicals for Your Hair',
    excerpt: 'Rahua\'s Aloe Vera Shampoo blends rare Amazonian rahua oil with soothing aloe vera for a cleansing experience that feels genuinely indulgent — sustainably sourced, deeply nourishing, and unlike anything else in the clean beauty space.',
    body: buildBlocks([
      ['normal', 'Rahua is one of the most respected names in luxury clean beauty, and their Aloe Vera Shampoo exemplifies why. Built around ungurahua oil — a rare Amazonian botanical used by indigenous communities for generations — this shampoo brings a level of hair nourishment that is difficult to find in conventional formulas.'],
      ['h2', 'What Is It?'],
      ['normal', 'Rahua\'s Aloe Vera Shampoo is a gentle clarifying and moisturizing shampoo that combines the brand\'s signature rahua (ungurahua) oil with aloe vera as a co-star hydrator. It cleanses thoroughly while leaving hair visibly smoother and shinier with regular use.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Rahua oil (from the ungurahua palm) is extraordinarily rich in omega-9 fatty acids, which are chemically compatible with the protein structure of the hair shaft. This means the oil penetrates rather than sitting on top of hair, delivering moisture deep into the cortex. Aloe vera complements this with its humectant properties, drawing atmospheric moisture into the hair and scalp.'],
      ['normal', 'Rahua is deeply committed to sustainability — their rahua oil is wild-harvested by Amazonian communities using traditional methods, providing meaningful economic support to indigenous people while preserving the rainforest ecosystem.'],
      ['h2', 'What We Love'],
      ['normal', 'The lather is gentle but effective. Hair feels clean without any of the stripped, coarse texture that some natural shampoos leave behind. Over time, hair becomes noticeably more manageable, shinier, and less prone to frizz. The scent is lush and botanical — like stepping into a rainforest.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Those with dry, damaged, color-treated, or coarse hair will see the most dramatic results. Also ideal for anyone who wants to invest in a premium product that aligns with both personal wellness and global sustainability values.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Rahua Aloe Vera Shampoo is a luxury product that earns its price point through ingredient quality, ethical sourcing, and genuine performance. If you\'re ready to treat your hair with Amazonian botanicals that have stood the test of centuries, this is where to start.'],
    ]),
  },
  {
    title: 'Acure Ultra Hydrating Conditioner Review: Deep Moisture Without the Markup',
    excerpt: 'Acure\'s Ultra Hydrating Conditioner proves that plant-based, clean beauty doesn\'t have to break the bank — delivering serious moisture with argan oil and vegan silk protein at an everyday price.',
    body: buildBlocks([
      ['normal', 'Acure has built a loyal following by delivering genuinely effective clean beauty at accessible prices, and their Ultra Hydrating Conditioner is one of the best examples of this philosophy in action. It\'s a workhorse product that keeps hair moisturized, manageable, and healthy-looking without costing a small fortune.'],
      ['h2', 'What Is It?'],
      ['normal', 'The Ultra Hydrating Conditioner is a rich, cream-based conditioner designed to deeply moisturize dry, coarse, or thirsty hair. It uses a blend of plant-based hydrators and proteins to replenish moisture and strengthen the hair shaft with every use.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Argan oil is the headline ingredient — rich in vitamin E and fatty acids, it smooths the cuticle, reduces frizz, and adds shine. Vegan silk protein (from plants rather than silkworms) helps repair minor surface damage and adds a soft, silky texture that synthetic silicones mimic but can\'t match for long-term hair health. Pumpkin seed oil and cocoa butter round out the moisture profile.'],
      ['normal', 'Acure\'s formula is 100% vegan, cruelty-free, sulfate-free, paraben-free, and formulated without synthetic fragrance or harsh chemicals. It\'s certified by the Leaping Bunny program.'],
      ['h2', 'What We Love'],
      ['normal', 'The texture is substantial enough to genuinely detangle and soften hair, but it rinses out completely without leaving heaviness behind. It works particularly well on naturally curly or wavy hair that tends toward dryness. The price-to-performance ratio is outstanding — it competes with products that cost three times as much.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Dry, curly, wavy, or coarse hair types who want consistent daily moisture without the investment of a luxury brand. Also ideal for anyone new to clean beauty who wants a reliable, affordable entry point.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Acure Ultra Hydrating Conditioner is the rare clean beauty product that overdelivers at its price point. Effective ingredients, ethical formulation, and accessibility make it a no-brainer for anyone building a holistic hair care routine on any budget.'],
    ]),
  },
  {
    title: 'Avalon Organics Biotin B-Complex Thickening Shampoo Review: Feed Your Follicles',
    excerpt: 'Avalon Organics\' Biotin B-Complex Thickening Shampoo addresses hair thinning at the follicle level — using clinically recognized nutrients to strengthen, volumize, and support healthy hair growth from the inside out.',
    body: buildBlocks([
      ['normal', 'Biotin\'s reputation as a hair health nutrient is well-earned, and Avalon Organics has formulated a shampoo that puts it to work topically — alongside a full B-vitamin complex and botanical thickeners that deliver noticeable volume with every wash.'],
      ['h2', 'What Is It?'],
      ['normal', 'This is a thickening shampoo from Avalon Organics, a brand with over 25 years in botanical personal care. The Biotin B-Complex line is specifically designed for fine, thinning, or limp hair, with the goal of strengthening the hair shaft and supporting scalp health to encourage fuller-looking hair.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Biotin (vitamin B7) is the anchor ingredient — it supports keratin infrastructure, the protein that gives hair its structure and strength. A full B-vitamin complex (B1, B2, B3, B5, B6, B12) supports scalp cellular health and energy metabolism, which underlies all hair follicle activity.'],
      ['normal', 'Botanical supporting cast includes wheat protein for immediate shaft thickening, saw palmetto extract which has been studied for its role in blocking DHT (a hormone linked to hair thinning), and nourishing plant oils for scalp health. The formula is NSF-certified organic, free from parabens, and cruelty-free.'],
      ['h2', 'What We Love'],
      ['normal', 'Hair feels thicker and bouncier immediately after washing — the wheat protein delivers on that promise quickly. With continued use, there\'s a genuine improvement in density and strand strength, particularly noticeable in reduced breakage during combing. The shampoo lathers generously despite being sulfate-free.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone experiencing fine, thinning, or flat hair — whether from age, hormonal changes, nutritional gaps, or styling damage. It\'s also suitable for those in early stages of hair thinning who want a proactive, natural approach before exploring more intensive interventions.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Avalon Organics Biotin B-Complex Thickening Shampoo is one of the most comprehensive natural thickening shampoos available. It addresses hair density from multiple angles — structurally, nutritionally, and botanically — while remaining committed to clean, certified organic formulation. A strong choice for anyone serious about long-term hair health.'],
    ]),
  },
  {
    title: 'Dr. Bronner\'s Peppermint Pure Castile Soap Review: The 18-in-1 That Actually Earns It',
    excerpt: 'Dr. Bronner\'s Peppermint Pure Castile Soap has been a clean living staple for generations — a single, certified organic soap that genuinely replaces dozens of conventional products while leaving your skin (and home) free of synthetic chemicals.',
    body: buildBlocks([
      ['normal', 'If there\'s one product that has defined the clean living movement for the past half century, it\'s Dr. Bronner\'s Pure Castile Soap. The peppermint variety is the most iconic — invigorating, versatile, and backed by a certified organic formula that has remained honest and effective since 1948.'],
      ['h2', 'What Is It?'],
      ['normal', 'Dr. Bronner\'s Pure Castile Soap is a concentrated, plant-based liquid soap made from organic oils. The peppermint version uses pure peppermint essential oil for its characteristic cooling tingle. "18-in-1" refers to the soap\'s documented versatility: it can be used as a body wash, shampoo, face wash, laundry soap, dish soap, household cleaner, pet shampoo, and more.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'The base is built from certified organic coconut, palm kernel, olive, hemp, and jojoba oils — a combination that creates a soap that cleanses effectively while remaining gentle on skin. Organic peppermint oil provides the signature tingle that signals improved circulation and leaves skin feeling genuinely refreshed.'],
      ['normal', 'The formula is USDA certified organic, certified Fair Trade, and cruelty-free. It contains no synthetic preservatives, no detergents, no foaming agents, and no artificial fragrance. The ingredient list is short, readable, and traceable to its source.'],
      ['h2', 'What We Love'],
      ['normal', 'The peppermint tingle is real and invigorating — it wakes up a shower routine in a way no synthetic soap can replicate. A small amount goes a long way since it\'s highly concentrated, making it genuinely economical despite the upfront price. The versatility is also real: diluted, it cleans almost everything in a home without introducing synthetic chemicals into your environment.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone committed to reducing synthetic chemicals in their home and personal care routine. Particularly valuable for families who want one trusted, certified organic product that handles multiple cleaning needs. Also excellent for minimalists, travelers, and outdoor enthusiasts who want to carry one product for many uses.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Dr. Bronner\'s Peppermint Pure Castile Soap is not hype — it\'s the real thing, and it has been for over 75 years. If you\'re building a non-toxic home and personal care routine, this is the foundational product to start with. Buy one bottle, use it everywhere, feel better about everything you\'re washing.'],
    ]),
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Connecting to Sanity...');

  // Upsert Physical Health category
  const categoryId = 'category-physical-health';
  await client.createOrReplace({
    _id: categoryId,
    _type: 'category',
    title: 'Physical Health',
    slug: { _type: 'slug', current: 'physical-health' },
    description: 'Products, practices, and insights for optimizing your physical wellbeing — skincare, haircare, nutrition, movement, and clean living.',
  });
  console.log('Category upserted: Physical Health');

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

  console.log('\nDone — all 11 articles published to Sanity.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
