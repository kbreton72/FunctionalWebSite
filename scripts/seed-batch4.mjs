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
    title: 'Merle Norman Foundation Primer Plus SPF 15 Review: The Smart Base That Does Three Jobs at Once',
    excerpt: 'Merle Norman\'s Foundation Primer Plus SPF 15 primes, protects, and perfects in one step — a multitasking base that smooths texture, extends makeup wear, and delivers daily UV protection without adding extra layers to your routine.',
    body: buildBlocks([
      ['normal', 'Merle Norman has been a trusted name in American cosmetics since 1931 — a brand built on skin-first beauty philosophy and studio-tested formulations. Their Foundation Primer Plus SPF 15 distills that philosophy into a single step: a primer that prepares the skin, a base that protects it from UV damage, and a smoothing treatment that extends everything you apply over it.'],
      ['h2', 'What Is It?'],
      ['normal', 'Foundation Primer Plus SPF 15 is a lightweight, skin-prepping primer with built-in broad-spectrum UV protection. It bridges the gap between your skincare routine and your makeup application — smoothing fine lines and pores, creating an even canvas for foundation, and providing SPF 15 daily sun protection that requires no additional sunscreen step for moderate daily exposure.'],
      ['h2', 'Key Benefits & Performance'],
      ['normal', 'The primer\'s texture is silky and fast-absorbing, creating a smooth surface that foundation adheres to evenly. Pores appear minimized and fine lines are filled in temporarily, which means foundation sits more flatly on the skin and photographs more naturally. The SPF 15 protection covers everyday UV exposure — commuting, running errands, indoor-near-window exposure — without the white cast or heaviness of a standalone sunscreen layered under makeup.'],
      ['normal', 'Merle Norman formulates with skin conditioning agents that support moisture retention throughout the day, which prevents the mid-day dry patch and cakey foundation look that unprimed skin is prone to. The result is makeup that looks as fresh at 4pm as it did at 8am.'],
      ['h2', 'How to Use'],
      ['normal', 'Apply a small amount to a clean, moisturized face after your skincare routine and before foundation. Allow 60 seconds to set fully before applying foundation. The formula plays well with both liquid and powder foundations, and with full-coverage and light-coverage approaches equally.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone who wants to streamline their morning makeup routine without sacrificing skin prep or UV protection. Particularly valuable for those who find a three-product routine (moisturizer, sunscreen, primer) too time-consuming and want to condense intelligently without giving up results.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Merle Norman Foundation Primer Plus SPF 15 earns its place as a smart, multi-benefit base product. It does what primers promise and adds the practical bonus of daily sun protection. A time-efficient, skin-smart addition to any daily makeup routine.'],
    ]),
  },
  {
    title: 'Merle Norman Knockout Nudes Review: Wearable Neutrals Engineered for Every Skin Tone',
    excerpt: 'Merle Norman\'s Knockout Nudes collection delivers the warmth, depth, and dimension that make a nude look truly flattering — carefully calibrated neutral shades that work with your skin tone rather than disappearing into it.',
    body: buildBlocks([
      ['normal', 'Nude makeup has a common failure mode: "nude" as a color category was built for a narrow range of skin tones, leaving most people wearing shades that either wash them out or read as the wrong kind of neutral. Merle Norman\'s Knockout Nudes collection addresses this with a range of warm, dimensional neutrals designed to flatter across skin tones rather than defaulting to a single beige standard.'],
      ['h2', 'What Is It?'],
      ['normal', 'Merle Norman Knockout Nudes is a coordinated collection of neutral-toned cosmetics — encompassing lip colors and eye shades — built around the concept of effortless, everyday color. The collection is designed for looks that appear polished and intentional without reading as heavily made up: the kind of makeup that makes people ask if you\'re wearing anything at all, then realize you look exceptionally well-rested.'],
      ['h2', 'The Shade Philosophy'],
      ['normal', 'Where many neutral collections trend pink or cool-beige, Knockout Nudes leans warm — with honey, caramel, mocha, and rose-mauve tones that add life to the face rather than draining it. This warm-neutral approach photographs beautifully and works across fair to deep skin tones, adapting to each complexion\'s undertone rather than flattening it.'],
      ['normal', 'The lip shades in the collection walk the line between MLBB (my-lips-but-better) and statement neutral — substantial enough to see at distance, comfortable enough to forget you\'re wearing. The eye shades blend seamlessly and build from a sheer wash of color to deeper definition without hard edges.'],
      ['h2', 'Merle Norman Quality'],
      ['normal', 'Merle Norman formulates for wear and skin comfort — products that hold up through a full day without requiring constant touch-ups and that feel pleasant to wear hour after hour. The Knockout Nudes collection reflects this: pigment is buildable but not powdery, and the formula doesn\'t settle into fine lines or feather beyond the lip line.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone building a versatile everyday makeup wardrobe centered on neutrals that genuinely flatter. Particularly useful for those who have struggled to find nudes that don\'t make them look washed out, and for anyone who wants a complete coordinated look from a single trusted brand.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Merle Norman Knockout Nudes delivers on the promise of nudes that actually work — warm-toned, flattering across skin tones, and formulated with the wear quality Merle Norman has refined over nine decades. A collection worth building around.'],
    ]),
  },
  {
    title: 'Young Living Savvy Minerals Makeup Review: Essential Oil-Infused Beauty With a Clean Conscience',
    excerpt: 'Young Living\'s Savvy Minerals is a complete mineral makeup line infused with essential oils — delivering full-coverage, long-wearing color with a commitment to ingredient transparency that sets it apart in the clean beauty cosmetics space.',
    body: buildBlocks([
      ['normal', 'The clean beauty movement has transformed skincare — but cosmetics have been slower to follow. Heavy metals in eyeshadow, synthetic fragrance in lip color, and petroleum derivatives in foundation remain common even in products marketed as "natural." Young Living\'s Savvy Minerals line closes that gap: a complete makeup system built on mineral pigments and enhanced with the essential oils that are the brand\'s hallmark.'],
      ['h2', 'What Is It?'],
      ['normal', 'Savvy Minerals is Young Living\'s proprietary cosmetics line, offering foundation, blush, bronzer, eyeshadow, mascara, lipstick, and accessories — all formulated without talc, bismuth oxychloride, synthetic dyes, artificial fragrances, parabens, or phthalates. The formulas are enhanced with Young Living\'s essential oils, which serve both aromatic and skin-benefit functions.'],
      ['h2', 'Key Features & Performance'],
      ['normal', 'The mineral foundation is the centerpiece of the line — a finely milled powder that provides buildable coverage from sheer to full without caking or settling into fine lines. The shade range has expanded significantly since launch and now accommodates a meaningful spectrum of skin tones. The mineral base is non-comedogenic and appropriate even for acne-prone skin, which is rarely the case with conventional liquid foundations.'],
      ['normal', 'Eyeshadow pigmentation is a genuine differentiator in the clean makeup category — mineral shadows are notorious for being sheer and difficult to blend. Savvy Minerals shadows offer better-than-expected pigment payoff and blendability, particularly in the deeper shades. The essential oil infusion creates a scent experience during application that turns makeup into a sensory ritual rather than a purely cosmetic act.'],
      ['normal', 'Mascara and lip products round out a full-face capability. The mascara holds up through a full day without flaking — a common pain point in clean formulas. Lip colors offer rich pigment in a wide range of wearable shades with moisturizing plant oil bases.'],
      ['h2', 'The Clean Makeup Standard'],
      ['normal', 'Savvy Minerals carries Young Living\'s Seed to Seal quality philosophy into cosmetics — every ingredient is evaluated with the same transparency applied to their essential oils. For anyone who has scrutinized food and supplement labels for years but accepted conventional cosmetics as necessary compromises, Savvy Minerals offers a way to close that gap completely.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone building a fully clean, non-toxic beauty routine from face wash to mascara. Particularly compelling for existing Young Living customers who want ingredient continuity across their entire personal care routine, and for makeup wearers who have been searching for a mineral line that doesn\'t sacrifice performance for purity.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Savvy Minerals is one of the most complete clean makeup lines available — covering every face category with transparent, mineral-based formulas enhanced by real essential oils. It has genuine performance, genuine purity, and the backing of a brand that applies the same sourcing standards to cosmetics as they do to therapeutics. A landmark in clean beauty.'],
    ]),
  },
  {
    title: 'Sunny Skin Powder Bronzer Review: A Buildable, Sun-Kissed Glow Without the Sun Damage',
    excerpt: 'Sunny Skin\'s Powder Bronzer delivers the warmth and dimension of a natural tan in a finely milled, buildable powder formula — a clean, lightweight alternative to liquid self-tanners that photographs beautifully and wears all day.',
    body: buildBlocks([
      ['normal', 'A convincing bronzed look is one of makeup\'s most democratizing tricks — it adds warmth, dimension, and the appearance of outdoor health to any complexion, any time of year. Sunny Skin\'s Powder Bronzer achieves this with a finely milled, buildable powder that delivers a natural tan effect without the streak risk of liquid formulas or the sun damage of actual tanning.'],
      ['h2', 'What Is It?'],
      ['normal', 'Sunny Skin Powder Bronzer is a mineral-based bronzing powder designed to add warmth and a sun-kissed glow to the face and décolletage. The formula is finely milled for seamless blendability, buildable from a sheer veil of warmth to a deeper, more defined sun-bronzed effect depending on application pressure and technique.'],
      ['h2', 'Shade & Finish'],
      ['normal', 'The shade palette is warm-toned — honey, amber, and golden brown tones that read as natural sun warmth rather than orange or red, which are the most common failure modes of bronzers that don\'t suit most skin tones. The finish is semi-matte with just enough natural sheen to mimic the genuine luminosity of sun-kissed skin, without crossing into glittery or overtly shimmer territory.'],
      ['normal', 'The powder base is talc-free and non-comedogenic — important for a product applied to the face regularly. Mineral pigments provide the color without synthetic dyes or heavy metals, making Sunny Skin a clean-label option for anyone who has moved away from conventional cosmetics.'],
      ['h2', 'Application Tips'],
      ['normal', 'Apply with a large, fluffy bronzer brush using the "3" technique — sweeping along the forehead hairline, temples, and jaw to mimic where the sun naturally hits the face. Build gradually: it\'s far easier to add warmth than to correct over-application. For a more contoured effect, apply more densely under the cheekbones and along the jawline.'],
      ['normal', 'Sunny Skin\'s powder layered over a mineral foundation creates a complete, natural-looking complexion with depth and dimension — no separate contouring step required for most everyday looks.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone who wants a warm, healthy-looking complexion year-round without self-tanner hassle or UV exposure. Works across fair to medium-deep skin tones and particularly flattering on those with warm or neutral undertones.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Sunny Skin Powder Bronzer is a clean, wearable, and genuinely flattering bronzing option. The mineral formula, buildable intensity, and natural warm-tone palette make it one of the most accessible clean bronzers available for everyday sun-kissed results.'],
    ]),
  },
  {
    title: 'T3 Featherweight StyleMax Hair Dryer Review: Professional Ionic Drying That Protects Every Strand',
    excerpt: 'The T3 Featherweight StyleMax is the professional ionic hair dryer that delivers salon-quality results at home — custom heat automation, four precision attachments, and lightweight engineering that reduces heat damage while cutting dry time in half.',
    body: buildBlocks([
      ['normal', 'Most people underestimate how much their hair dryer is working against their hair health. Conventional dryers use aggressive, uncontrolled heat that dehydrates the hair shaft, lifts the cuticle, and contributes to long-term brittleness and breakage. The T3 Featherweight StyleMax is built on a different philosophy: that professional results and hair health aren\'t competing goals — they\'re achieved together through smarter technology.'],
      ['h2', 'What Is It?'],
      ['normal', 'The T3 Featherweight StyleMax is a professional-grade ionic hair dryer featuring Custom Heat Automation — T3\'s proprietary technology that monitors and adjusts heat output in real time to maintain the optimal drying temperature throughout the session. It ships with four attachments: two concentrators, a diffuser, and a smoothing comb, making it a complete hair drying system rather than a single-function tool.'],
      ['h2', 'The Technology'],
      ['normal', 'Ionic technology is the foundation. Conventional dryers heat air without addressing the static and positive charge buildup that causes frizz and cuticle lifting. Ionic dryers emit negatively charged ions that neutralize the positive charge in wet hair, sealing the cuticle as the hair dries and breaking down water molecules into smaller droplets that evaporate faster. The result: significantly less heat exposure needed per drying session, which is the most meaningful reduction in heat damage possible.'],
      ['normal', 'Custom Heat Automation is the T3 differentiator — a sensor system that prevents temperature spikes at the nozzle, maintaining consistent, controlled heat rather than the fluctuating output of standard dryers. Hair dried at consistent, lower optimal temperature maintains more moisture and experiences less protein degradation than hair dried with the high-peak temperatures of conventional motors.'],
      ['normal', 'Five heat settings and three speed settings allow customization from a gentle warm air rough-dry to a precise high-heat finishing pass, covering every hair type and drying phase. At 1875 watts, it dries efficiently despite its featherweight build — fatigue from arm position during drying is genuinely reduced compared to heavier salon dryers.'],
      ['h2', 'The Attachment System'],
      ['normal', 'The dual concentrators allow precision styling — a narrow stream for sleek blowouts and a wider stream for general drying. The diffuser is a standout for curly and wavy hair: it disperses airflow to dry curls without disturbing their pattern, preventing the frizz that direct airflow causes. The smoothing comb simultaneously detangles and dries, cutting blowout time for straight styles significantly.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone who blow-dries regularly and wants professional results with less heat damage over time. Particularly valuable for color-treated, chemically processed, fine, or damaged hair that is most vulnerable to heat stress. Also for those with curly or wavy hair who have struggled to achieve a consistent, frizz-free result with conventional dryers.'],
      ['h2', 'Final Verdict'],
      ['normal', 'The T3 Featherweight StyleMax is the hair dryer that hair professionals and hair-health-conscious individuals consistently reach for. Custom heat automation, genuine ionic technology, four precision attachments, and a weight that makes extended drying comfortable — it represents what hair care tools should be when engineered to support hair health rather than simply to be fast.'],
    ]),
  },
  {
    title: 'T3 CurlWrap Automatic Rotating Curling Iron Review: Effortless Waves for Every Hair Type',
    excerpt: 'The T3 CurlWrap\'s auto-rotating ceramic barrel takes the technique out of curling — nine heat settings, an ion generator, and a longer barrel that creates consistent, natural-looking waves and curls with almost no learning curve.',
    body: buildBlocks([
      ['normal', 'Curling irons have a steep technique requirement — the angle, the tension, the timing, the direction all determine whether you get a beautiful wave or a tangled, uneven result. The T3 CurlWrap Automatic Rotating Curling Iron removes that variable. Its auto-rotating ceramic barrel does the wrapping for you, producing consistent curls and waves without the hand positioning that conventional irons demand.'],
      ['h2', 'What Is It?'],
      ['normal', 'The T3 CurlWrap is an automatic rotating curling iron with a longer-than-standard barrel designed to accommodate more hair per pass and create natural-looking, flowing waves rather than tight, spring-like curls. Two timer settings control how long the barrel holds hair before releasing, allowing adjustment from loose beach waves to more defined curls. Nine heat settings cover fine, delicate hair through coarse, thick hair with precision.'],
      ['h2', 'The Auto-Rotating Technology'],
      ['normal', 'The barrel rotates automatically when triggered, wrapping hair around itself without any twisting motion from the user. This solves the single biggest challenge of traditional curling: the awkward hand rotation that results in uneven tension and inconsistent curl size throughout the head. With the CurlWrap, every pass produces the same result — which means a full head of curls looks cohesive rather than like a collection of individual experiments.'],
      ['normal', 'Two rotation directions (left and right) allow alternating curl direction for a more natural, lived-in wave pattern. Alternating direction is the technique professional stylists use to create the dimensional, undone look that single-direction curling cannot achieve — the CurlWrap makes this accessible to anyone.'],
      ['h2', 'Ceramic Barrel & Ion Generator'],
      ['normal', 'The ceramic barrel distributes heat evenly across its surface, eliminating the hot spots that cause uneven styling and localized heat damage. Ceramic also emits far-infrared heat — a gentler form of heat that penetrates the hair shaft from within rather than heating the outer cuticle first, resulting in less surface damage and more lasting style.'],
      ['normal', 'The integrated ion generator produces negative ions during styling that seal the cuticle and reduce static, resulting in finished curls that are smooth and shiny rather than frizzy — the hallmark of a quality ionic styling tool.'],
      ['h2', 'The Longer Barrel Advantage'],
      ['normal', 'T3\'s CurlWrap barrel is longer than standard curling irons, allowing longer sections of hair to be styled per pass. This reduces overall styling time on medium to long hair and naturally creates a longer wave pattern — which is the most flattering and versatile curl result for most hair lengths.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone who wants consistent, professional-looking waves and curls without mastering traditional curling iron technique. Particularly valuable for beginners, those with long or thick hair that is time-consuming to style, and anyone who has struggled to produce cohesive results with a conventional iron.'],
      ['h2', 'Final Verdict'],
      ['normal', 'The T3 CurlWrap Automatic Rotating Curling Iron earns its premium position in the styling tool market. Auto-rotation delivers consistency, ceramic and ionic technology protect hair health, and the longer barrel reduces styling time while producing the loose, dimensional wave pattern that is the most sought-after result in modern hair styling.'],
    ]),
  },
  {
    title: 'L\'ange Le Curl Dual-Wand Curling Iron Review: Two Barrels, Endless Possibilities',
    excerpt: 'L\'ange\'s Le Curl delivers salon versatility at home — a dual-wand curling system with titanium-infused barrels, consistent ionic heat, and the flexibility to create everything from tight ringlets to loose, effortless waves in one tool.',
    body: buildBlocks([
      ['normal', 'L\'ange has built a loyal following by delivering professional-quality styling tools without the professional price tag. Le Curl is one of their most popular offerings — a curling iron system designed around barrel versatility, consistent heat, and the ionic technology that separates genuinely hair-healthy styling tools from those that just get the job done.'],
      ['h2', 'What Is It?'],
      ['normal', 'L\'ange Le Curl is a curling wand or curling iron (depending on configuration) from the L\'ange professional hair tools line. The tool features titanium-infused barrel technology, adjustable heat settings, and an ion generator that works throughout the styling session to minimize frizz and protect the hair\'s natural moisture balance. The design accommodates multiple styling approaches — from precise, defined curls to casual, undone waves.'],
      ['h2', 'Titanium-Infused Barrel Technology'],
      ['normal', 'Titanium heats faster and distributes heat more evenly than ceramic alone, reaching styling temperature in significantly less time while maintaining consistent heat across the full barrel length. The titanium-infused surface creates a smooth glide plane that hair moves over without catching or snagging — reducing the mechanical damage that is a significant but overlooked source of hair breakage from styling tools.'],
      ['normal', 'Even heat distribution is the critical performance factor in curling barrel design. Cold spots produce under-curled sections that fall quickly; hot spots overheat localized areas and cause disproportionate damage. Titanium\'s thermal conductivity eliminates both failure modes, producing curls that hold longer and are created with less cumulative heat exposure.'],
      ['h2', 'Ionic Technology'],
      ['normal', 'The integrated ion generator emits negative ions throughout styling, neutralizing the static charge that causes frizz and lifting the cuticle. Hair styled with ionic tools consistently finishes smoother and shinier than the same hair styled with non-ionic equivalents — the ions seal the cuticle at the point of styling, locking in the curl shape and the shine simultaneously.'],
      ['h2', 'Styling Range'],
      ['normal', 'The heat range and barrel diameter together determine the styling range. Le Curl\'s settings accommodate fine hair that needs low heat and delicate handling through thick, coarse hair that requires sustained high heat to take a set. The wand configuration (no clamp) creates a more natural, softer curl than clamp-based irons — the technique involves wrapping hair around the barrel manually, which gives the styler more control over tension and therefore curl size and shape.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone who wants professional curling results with hair-healthy ionic and titanium technology at an accessible price point. Particularly well-suited for those transitioning from conventional drugstore curling irons who want a meaningful performance and hair-health upgrade without the investment of the top-tier professional market.'],
      ['h2', 'Final Verdict'],
      ['normal', 'L\'ange Le Curl delivers genuine professional curling performance — fast heat, even distribution, ionic frizz control, and a smooth titanium surface that respects the hair through every styling session. For anyone building a quality home styling toolkit, it represents outstanding value at its price point.'],
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

  console.log('\nDone — all 7 articles published to Sanity.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
