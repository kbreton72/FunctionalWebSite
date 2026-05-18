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
    title: 'Heritage Store Organic Castor Oil Review: The Original Multi-Use Beauty Oil',
    excerpt: 'Heritage Store\'s Organic Castor Oil is one of the most versatile and time-tested beauty staples available — thick, pure, and cold-pressed for maximum potency in lash growth, hair thickening, skin hydration, and lymphatic support.',
    body: buildBlocks([
      ['normal', 'Castor oil has been used medicinally and cosmetically for over four thousand years — from ancient Egypt to Ayurvedic practice to modern clean beauty. Heritage Store is one of the original natural beauty companies in the United States, founded in 1969 and rooted in the health philosophy of Edgar Cayce. Their Organic Castor Oil is cold-pressed, hexane-free, and USDA certified organic — the standard the product deserves.'],
      ['h2', 'What Is It?'],
      ['normal', 'Heritage Store Organic Castor Oil is 100% pure, cold-pressed castor oil from Ricinus communis beans. Cold-pressing preserves the ricinoleic acid content and natural fatty acid profile that make castor oil therapeutically active. The oil is thick and golden, with a mild, nutty scent — exactly what unrefined castor oil should be.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Eyelash and eyebrow growth is the use that has propelled castor oil into mainstream beauty. Ricinoleic acid — the primary fatty acid in castor oil, comprising up to 90% of its composition — is believed to support the prostaglandin E2 receptor that influences hair follicle activity. Nightly application to lash lines and brow arches with a clean spoolie is a widely reported practice with consistent anecdotal results.'],
      ['normal', 'For scalp and hair, castor oil\'s density makes it an excellent overnight treatment for dry, brittle, or thinning hair. Massaged into the scalp and left for several hours, it deeply nourishes follicles and conditions the hair shaft. Its antimicrobial properties also help address dandruff-related scalp imbalances.'],
      ['normal', 'As a skin moisturizer, castor oil is particularly effective for rough, dry, or cracked areas — heels, elbows, lips, and hands. Its occlusive properties lock in moisture while the ricinoleic acid provides anti-inflammatory support. Castor oil packs — warm oil applied to the abdomen with a cloth compress — are a traditional practice for supporting lymphatic circulation and liver detox pathways.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone interested in natural lash and brow enhancement, scalp health, deep skin moisturizing, or traditional castor oil pack therapies. Heritage Store\'s organic certification makes it appropriate for the most sensitive skin and lash-line applications.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Heritage Store Organic Castor Oil is one of the most justifiably hyped natural beauty staples. It does what it claims, it has centuries of use behind it, and Heritage Store\'s organic certification and clean sourcing make it the version to trust. A foundational product for any holistic beauty kit.'],
    ]),
  },
  {
    title: 'Argentyn 23 Professional Bio-Active Silver Hydrosol Daily+ Immune Support Review',
    excerpt: 'Argentyn 23\'s Professional Bio-Active Silver Hydrosol is the clinical standard in colloidal silver — a nano-particle silver suspension with demonstrated antimicrobial activity used by integrative practitioners worldwide for immune support.',
    body: buildBlocks([
      ['normal', 'Colloidal silver has a complicated reputation in the natural health world — mostly because low-quality products have set a low bar. Argentyn 23 is the exception. Developed to a pharmaceutical standard and used by integrative medicine practitioners worldwide, it represents the highest quality silver hydrosol available to consumers — and the Daily+ formulation makes immune support a simple, daily practice.'],
      ['h2', 'What Is It?'],
      ['normal', 'Argentyn 23 Professional Bio-Active Silver Hydrosol is a true silver hydrosol — meaning the silver particles are suspended in pharmaceutical-grade purified water at 23 parts per million. Unlike ionic silver solutions or true colloids with larger particles, the hydrosol format delivers bio-active silver at a particle size that is bioavailable and effective at very low concentrations. The Daily+ formulation is designed for ongoing immune maintenance rather than acute use.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Silver has a well-documented history as an antimicrobial agent predating antibiotics. Research on nano-particle silver demonstrates broad-spectrum activity against bacteria, certain viruses, and fungi. The mechanism involves silver ions interacting with the respiratory enzymes and DNA of microbial cells — a mode of action that pathogens have difficulty developing resistance to, unlike conventional antibiotics.'],
      ['normal', 'For immune maintenance, daily sublingual use of small amounts (1–3 teaspoons) between meals allows the silver to be absorbed directly into the bloodstream through the oral mucosa. During periods of increased immune demand — travel, cold and flu season, high stress — many integrative practitioners recommend increasing frequency rather than dose.'],
      ['normal', 'Topically, the hydrosol is applied directly to minor cuts, scrapes, and skin irritations to support antimicrobial protection and wound healing. It can also be used as a nasal rinse, throat gargle, or eye wash in appropriate dilutions under practitioner guidance.'],
      ['h2', 'Quality Standard'],
      ['normal', 'Argentyn 23 is manufactured to Current Good Manufacturing Practice (cGMP) pharmaceutical standards — a significantly higher bar than most dietary supplements. Third-party testing verifies particle size, concentration, and purity. This is the colloidal silver product that integrative MDs and naturopathic physicians actually recommend by name.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Those building a natural immune support protocol, frequent travelers, anyone during cold and flu season, and people interested in integrative alternatives to conventional antimicrobials under appropriate practitioner guidance.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Argentyn 23 Daily+ is in a different category than the generic colloidal silver products crowding supplement shelves. The pharmaceutical manufacturing standard, nano-particle bioavailability, and practitioner endorsements make it the credible choice for anyone serious about clean, effective immune support.'],
    ]),
  },
  {
    title: 'Andreas Seed Oils Organic Black Cumin Oil Review: The Seed That Heals Everything',
    excerpt: 'Andreas Seed Oils\' Organic Black Cumin oil brings one of history\'s most revered healing seeds into a cold-pressed, organic oil — delivering the anti-inflammatory, immune-modulating, and respiratory benefits of Nigella sativa in their most bioavailable form.',
    body: buildBlocks([
      ['normal', 'The Prophet Muhammad reportedly said of black seed: "In the black seed is a cure for everything except death." Modern science has done considerable work validating that ancient claim. Nigella sativa — black cumin — has accumulated one of the most impressive bodies of research of any botanical supplement, and Andreas Seed Oils delivers it in cold-pressed, certified organic form.'],
      ['h2', 'What Is It?'],
      ['normal', 'Andreas Seed Oils Organic Black Cumin Oil is cold-pressed from certified organic Nigella sativa seeds. Andreas Seed Oils is a specialty producer focused exclusively on seed oils, pressing small batches to order to ensure freshness and maximum nutrient retention. Their black cumin oil is unrefined, unfiltered, and packaged in dark glass to protect the delicate compounds from light degradation.'],
      ['h2', 'Key Compounds & Why They Work'],
      ['normal', 'Thymoquinone is the primary active compound in black cumin oil — and it is one of the most studied natural compounds in modern pharmacological research. Published studies document anti-inflammatory, antioxidant, antimicrobial, and anti-tumor properties. Thymoquinone works by inhibiting inflammatory pathways (including NF-κB, the master regulator of inflammation) and by modulating immune function in both directions — calming overactive immune responses and stimulating under-responsive ones.'],
      ['normal', 'The oil is also rich in essential fatty acids (linoleic and oleic acid), thymol, and carvacrol — compounds with their own antimicrobial and antioxidant contributions. The combination creates a multi-mechanism anti-inflammatory and immune support profile that no single synthetic compound can replicate.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'As a daily supplement, one teaspoon of black cumin oil taken internally — straight, in smoothies, or drizzled on food — provides consistent anti-inflammatory and immune-modulating support. Research documents benefits for allergy and asthma management, metabolic health, blood pressure regulation, and skin conditions including eczema and psoriasis when taken regularly.'],
      ['normal', 'Topically, black cumin oil applied to the skin addresses inflammatory skin conditions, supports wound healing, and provides antifungal activity against common scalp and skin yeasts. It has a distinctive, peppery, slightly bitter aroma — not the most pleasant standalone skin oil, but very effective blended with lighter carrier oils.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone managing chronic inflammation, seasonal allergies, asthma, skin conditions, or immune imbalance. Also highly relevant for those exploring longevity and anti-inflammatory nutrition protocols who want botanical support beyond standard omega-3 supplementation.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Andreas Seed Oils Organic Black Cumin Oil is one of the most justified "superfood" claims in the botanical supplement space. The research is substantial, the seed quality matters enormously, and Andreas\'s small-batch cold-pressing practice delivers the freshest, most therapeutically active version of this remarkable oil.'],
    ]),
  },
  {
    title: 'Young Living Thieves Whitening Toothpaste Review: Clean Teeth, Toxic-Free Mouth',
    excerpt: 'Young Living\'s Thieves Essential Oil-Infused Whitening Toothpaste replaces fluoride, SLS, and artificial whiteners with a plant-based formula built around their legendary Thieves blend — supporting oral health the clean way.',
    body: buildBlocks([
      ['normal', 'The mouth is one of the most direct pathways into the body, which makes conventional toothpaste ingredients — fluoride in high concentrations, sodium lauryl sulfate, artificial whiteners, and synthetic preservatives — a meaningful concern for anyone living holistically. Young Living\'s Thieves Whitening Toothpaste addresses that concern with a clean-label formula built around their iconic Thieves essential oil blend.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Thieves Whitening Toothpaste is a fluoride-free, SLS-free toothpaste infused with Young Living\'s Thieves blend — a combination of clove, lemon, cinnamon bark, eucalyptus, and rosemary essential oils modeled on the legendary herbal formula used by 15th-century spice traders. It cleans, freshens, and whitens using plant-derived abrasives and antimicrobial botanicals.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'The Thieves essential oil blend is the antimicrobial backbone of this formula. Clove oil contains eugenol — one of the most studied natural antibacterial compounds with documented activity against Streptococcus mutans, the primary bacteria responsible for tooth decay. Eucalyptus contributes 1,8-cineole, and cinnamon bark adds cinnamaldehyde — both with their own significant antimicrobial properties against oral pathogens.'],
      ['normal', 'Whitening is achieved with naturally derived calcium carbonate and hydrated silica, physical abrasives that polish stains without the aggressive chemical bleaching of peroxide-based whiteners. Peppermint and spearmint oils provide the clean, fresh mouthfeel that most users associate with "clean teeth."'],
      ['normal', 'The formula is free from fluoride, SLS, artificial colors, artificial sweeteners, and synthetic preservatives. It\'s sweetened with xylitol, which not only provides pleasant sweetness but has documented ability to inhibit S. mutans from adhering to tooth enamel.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone transitioning away from conventional toothpaste to a cleaner oral care routine. Particularly valuable for those concerned about fluoride exposure, SLS sensitivity (canker sore sufferers often find SLS to be a trigger), or anyone wanting antimicrobial oral support from proven botanical sources.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Thieves Whitening Toothpaste is one of the most complete natural toothpaste formulas available. It doesn\'t require compromise — it cleans well, whitens gradually, freshens breath effectively, and does all of it without a single ingredient that conflicts with a holistic lifestyle. A genuine upgrade to the twice-daily ritual.'],
    ]),
  },
  {
    title: 'Primarily Pure Lavender Deodorant Review: Natural Odor Protection That Actually Works',
    excerpt: 'Primarily Pure\'s Lavender Deodorant proves that natural deodorant doesn\'t have to mean compromising on protection — a clean, aluminum-free formula with lavender and botanicals that handles odor without blocking the body\'s natural detox pathways.',
    body: buildBlocks([
      ['normal', 'Natural deodorant has a reputation problem — mostly earned by early formulas that worked for an hour and left white marks on dark shirts. Primarily Pure has quietly become one of the most trusted names in genuinely effective natural deodorant, and their Lavender formula exemplifies why. It\'s a product that converts skeptics.'],
      ['h2', 'What Is It?'],
      ['normal', 'Primarily Pure Lavender Deodorant is an aluminum-free, propylene glycol-free, paraben-free cream deodorant in a twist-up stick format. The brand is a small-batch, handcrafted operation committed to using only ingredients that are safe, transparent, and effective — a philosophy that shows in every aspect of this product.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'The odor-fighting core of this formula is baking soda (sodium bicarbonate), which neutralizes the acidic compounds produced by skin bacteria — the actual source of body odor. Arrowroot powder absorbs surface moisture to reduce the damp environment bacteria thrive in without blocking sweat glands the way aluminum compounds do.'],
      ['normal', 'Organic coconut oil and shea butter provide the base, both of which have their own antimicrobial properties that complement the baking soda\'s odor-neutralizing action. Organic lavender essential oil adds genuine antimicrobial support alongside its calming, floral scent. The formula also includes vitamin E as an antioxidant skin conditioner.'],
      ['normal', 'Crucially, this is a deodorant, not an antiperspirant — it allows the body to sweat naturally, which is a healthy and necessary detoxification process. Blocking sweating with aluminum compounds, as conventional antiperspirants do, suppresses a physiological function that the body needs.'],
      ['h2', 'Transitioning to Natural Deodorant'],
      ['normal', 'A transition period of 2–4 weeks is normal when switching from aluminum antiperspirant to natural deodorant. During this time, the body recalibrates its sweat and microbial balance. Primarily Pure\'s formula manages this transition better than most — the combination of baking soda and arrowroot provides real protection even during the adjustment phase.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone transitioning from conventional antiperspirant to a clean alternative. Particularly well-suited for those with sensitive underarm skin who need effective odor control without the harsh chemicals that cause irritation in many natural deodorant alternatives.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Primarily Pure Lavender Deodorant is what natural deodorant should be — effective, clean, and honest about what it does. It handles odor consistently, smells beautiful, and treats your skin kindly in the process. One of the most recommended natural deodorants in the holistic living community for good reason.'],
    ]),
  },
  {
    title: 'Brazi Bronze Organic Tanning Oil Review: A Sun-Kissed Glow the Natural Way',
    excerpt: 'Brazi Bronze Organic Tanning Oil delivers a deep, golden tan accelerated by nature\'s most sun-synergistic botanicals — a luxurious, clean alternative to chemical tanning accelerators that also deeply nourishes skin.',
    body: buildBlocks([
      ['normal', 'Conventional tanning oils and accelerators are often loaded with synthetic fragrance, mineral oil, and chemical UV sensitizers. Brazi Bronze takes the opposite approach — an organic, plant-based formula that works with the sun to develop a deeper, longer-lasting tan while simultaneously nourishing the skin with premium botanical oils.'],
      ['h2', 'What Is It?'],
      ['normal', 'Brazi Bronze Organic Tanning Oil is a blend of certified organic plant oils formulated to accelerate the skin\'s natural tanning response while providing deep hydration and antioxidant protection. It\'s inspired by Brazilian beach culture — where generations of sun-worshippers have used coconut and other tropical oils to enhance their tans — and updated with a certified organic, clean-label formulation.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Organic coconut oil is the base — rich in medium-chain fatty acids that deeply moisturize skin and have a natural SPF of approximately 4–5, providing minimal base protection while allowing UV exposure for tanning. Carrot seed oil is a standout supporting ingredient — it contains carotenoids that support the body\'s natural melanin production pathway, contributing to a deeper, more even tan development.'],
      ['normal', 'Organic raspberry seed oil adds antioxidant protection through its vitamin E and carotenoid content, helping to neutralize UV-induced free radical damage while the skin tans. Macadamia and marula oils contribute oleic acid-rich nourishment that keeps skin supple and prevents the dry, peeling that often cuts a tan short.'],
      ['normal', 'Important note: this is a tanning oil, not a sunscreen. It does not replace sun protection for prolonged exposure — it\'s designed for intentional, moderate sun sessions where you want to maximize and extend your tan while keeping skin healthy.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Applied before and during sun exposure, Brazi Bronze accelerates melanin response for a faster, deeper tan. The botanical oils prevent the moisture loss that leads to peeling, extending the life of your tan significantly. Post-sun application continues the moisturizing work and supports skin recovery from UV exposure.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Those who enjoy intentional sun tanning and want a clean, organic oil that enhances the experience while nourishing the skin. Ideal for beach vacations, poolside sessions, or anyone who wants to support a natural tan without synthetic chemicals on their skin during sun exposure.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Brazi Bronze Organic Tanning Oil is a genuinely luxurious product that makes sun tanning feel like a self-care ritual rather than a guilty pleasure. Clean ingredients, beautiful texture, and a formula that works — for the sun-lover committed to a toxin-conscious lifestyle, this is the tanning oil to reach for.'],
    ]),
  },
  {
    title: 'Argentyn 23 Natural Nasal Spray Sinus Relief Review: Silver-Powered Sinus Support',
    excerpt: 'Argentyn 23\'s Natural Nasal Spray delivers pharmaceutical-grade bio-active silver directly to sinus passages — a clean, effective alternative to conventional nasal decongestants that addresses the microbial root of sinus issues.',
    body: buildBlocks([
      ['normal', 'Conventional nasal decongestant sprays work fast — but many carry rebound congestion risks and contain preservatives and vasoconstrictors that aren\'t ideal for regular use. Argentyn 23\'s Natural Nasal Spray takes a fundamentally different approach: instead of forcing blood vessels to constrict, it delivers bio-active silver directly to the sinus environment to address the microbial activity underlying most sinus congestion.'],
      ['h2', 'What Is It?'],
      ['normal', 'Argentyn 23 Natural Nasal Spray is the same pharmaceutical-grade bio-active silver hydrosol as their oral immune support product, formulated in a fine-mist nasal spray delivery system. The silver concentration is precisely calibrated to be effective against nasal and sinus pathogens without disrupting the beneficial aspects of nasal flora.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'The nasal passages and sinuses are prime environments for bacterial and viral activity — warm, moist, and connected to the respiratory tract. Argentyn 23\'s nano-particle silver has demonstrated broad-spectrum antimicrobial activity against the organisms most commonly responsible for sinus infections, including Staphylococcus aureus, Streptococcus pneumoniae, and various respiratory viruses.'],
      ['normal', 'For acute sinus congestion during illness, 1–2 sprays in each nostril 3–5 times daily provides direct antimicrobial action where it\'s most needed. For seasonal allergy-related congestion, regular use during high-pollen periods can help manage the secondary bacterial overgrowth that often turns allergy congestion into a sinus infection.'],
      ['normal', 'As a preventive during cold and flu season or after air travel — where exposure to recirculated air and concentrated pathogens is unavoidable — a prophylactic spray in each nostril after exposure provides a meaningful first line of defense.'],
      ['h2', 'Quality Standard'],
      ['normal', 'Argentyn 23 maintains pharmaceutical cGMP manufacturing for all their products, including this nasal spray. The silver particle size and concentration are verified by third-party testing, and the delivery system is designed to produce a fine mist that reaches the upper sinus passages rather than simply coating the lower nasal cavity.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Frequent flyers, people prone to sinus infections, those with seasonal allergies, or anyone looking for a clean, non-habit-forming alternative to conventional nasal sprays. Integrative practitioners frequently recommend this for patients who want silver\'s antimicrobial benefits applied directly to the sinus environment.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Argentyn 23 Natural Nasal Spray is a sophisticated, clinically-grounded product that fills a genuine gap in the natural wellness toolkit. For sinus support without decongestants or preservatives, it\'s one of the most effective clean options available.'],
    ]),
  },
  {
    title: 'Sovereign Silver Natural Nasal Spray Sinus Relief Review: Gentle Silver Support for Clear Sinuses',
    excerpt: 'Sovereign Silver\'s Natural Nasal Spray uses Bio-Active Silver Hydrosol in a fine-mist format to gently support sinus health — a clean, preservative-free option for managing congestion and sinus discomfort naturally.',
    body: buildBlocks([
      ['normal', 'Sovereign Silver is one of the most widely distributed and recognized silver hydrosol brands in the natural health market. Their Natural Nasal Spray brings their signature Bio-Active Silver Hydrosol into a convenient nasal delivery format — designed for those who want silver\'s well-documented antimicrobial properties applied directly to the sinus and nasal passages.'],
      ['h2', 'What Is It?'],
      ['normal', 'Sovereign Silver Natural Nasal Spray is a 10 ppm bio-active silver hydrosol in a fine-mist pump spray designed for nasal administration. Like all Sovereign Silver products, it contains just two ingredients: pharmaceutical-grade purified water and bio-active silver — no preservatives, no additives, no buffers.'],
      ['h2', 'How It Compares to Argentyn 23'],
      ['normal', 'Sovereign Silver and Argentyn 23 are the two most trusted names in bio-active silver hydrosol and are often compared directly. Sovereign Silver\'s nasal spray contains 10 ppm silver versus Argentyn 23\'s 23 ppm — Sovereign Silver is therefore a gentler, lower-concentration option that many users prefer for daily maintenance and sensitive nasal passages. Argentyn 23 is generally recommended for acute or more intensive support. Both are manufactured to high quality standards; the choice often comes down to sensitivity and intended use frequency.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'The antimicrobial properties of silver hydrosol apply to the nasal environment just as they do systemically. Applied to the nasal passages, the bio-active silver interacts with pathogenic organisms while the fine mist format provides gentle, non-irritating coverage of the nasal mucosa. For sinus pressure, post-nasal drip, or congestion associated with bacterial or viral activity, 1–2 sprays per nostril multiple times daily provides direct support.'],
      ['normal', 'Sovereign Silver\'s nasal spray is also well-suited for post-nasal rinse maintenance — used after a saline neti pot rinse, the silver spray provides an antimicrobial follow-up that the saline alone cannot deliver.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Those with sensitive nasal passages who prefer a lower-concentration silver option, anyone using silver hydrosol nasally for the first time, and those who want a daily maintenance spray rather than an acute-use product. Also excellent for children and individuals who find stronger formulations irritating.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Sovereign Silver Natural Nasal Spray is a gentle, trustworthy product for natural sinus support. Its lower concentration makes it the more approachable option for everyday use, and Sovereign Silver\'s long track record in the hydrosol market ensures consistent quality. A reliable addition to any natural wellness medicine cabinet.'],
    ]),
  },
  {
    title: 'Mia Botanica Acacia Heat Protectant Review: Plant-Powered Defense for Styled Hair',
    excerpt: 'Mia Botanica\'s Acacia Heat Protectant uses the structural strength of acacia to shield hair from thermal damage — a clean, plant-derived alternative to silicone-based heat protectants that protects without buildup.',
    body: buildBlocks([
      ['normal', 'Heat styling is one of the most common sources of hair damage — and most heat protectants address the problem with a silicone coating that temporarily shields the hair shaft but builds up over time and suffocates hair health in the long run. Mia Botanica\'s Acacia Heat Protectant offers a plant-based alternative: structural protection derived from acacia, without the silicone trade-off.'],
      ['h2', 'What Is It?'],
      ['normal', 'Mia Botanica Acacia Heat Protectant is a leave-in treatment spray formulated with acacia biopolymer as its primary protective agent. Mia Botanica is a clean beauty brand focused on harnessing plant-derived polymers and botanical extracts to provide functional hair care benefits without relying on synthetic silicones, sulfates, or petrochemicals.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Acacia senegal — the source of gum arabic — produces a polysaccharide polymer that forms a flexible, breathable film over the hair shaft when applied. This film acts as a thermal barrier, distributing heat more evenly and protecting the protein structure of the hair from the direct impact of flat irons and blow dryers. Unlike silicone coatings, acacia biopolymer is water-soluble and rinses cleanly with each wash — no accumulation, no buildup, no long-term coating effect.'],
      ['normal', 'Supporting botanicals typically include hydrolyzed plant proteins that temporarily bond to damaged areas of the hair cuticle, providing both immediate smoothing and short-term structural reinforcement during heat styling. Panthenol (provitamin B5) adds moisture retention that prevents the dehydration that makes hair brittle under high heat.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Apply to damp hair before blow drying, or to dry hair before flat iron or curling iron use. The spray distributes evenly and dries without stiffness — hair remains flexible and natural-feeling rather than coated or crunchy. Protection is rated to 450°F in most testing, covering the range of professional heat styling tools.'],
      ['normal', 'For natural and color-treated hair especially, the absence of silicone buildup is significant — both types benefit from products that deliver protection without the residue that eventually weighs hair down and dulls color vibrancy.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Regular heat stylers who want genuine thermal protection without silicone buildup. Particularly valuable for those with curly, natural, color-treated, or fine hair that suffers most from conventional heat protectant accumulation.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Mia Botanica Acacia Heat Protectant solves a real problem in clean hair care: how to protect against heat without creating the silicone dependency that most conventional heat protectants cause. Effective, buildup-free, and genuinely plant-derived — a smart choice for anyone who styles with heat regularly.'],
    ]),
  },
  {
    title: 'US Organic Jojoba Oil Review: The Ultimate Multi-Use Botanical for Skin and Hair',
    excerpt: 'US Organic\'s USDA-certified Jojoba Oil is one of the purest and most versatile botanical oils available — a liquid wax that mirrors your skin\'s own sebum, making it the most compatible natural moisturizer and hair conditioner on the planet.',
    body: buildBlocks([
      ['normal', 'Jojoba oil occupies a unique position in the botanical world — it\'s not technically an oil but a liquid wax ester that remarkably mimics human sebum. This structural similarity to the skin\'s own natural lubricant makes it one of the most universally compatible moisturizers available. US Organic\'s version is USDA certified organic, cold-pressed, and unrefined — delivering the full spectrum of jojoba\'s natural compounds.'],
      ['h2', 'What Is It?'],
      ['normal', 'US Organic Jojoba Oil is cold-pressed from the seeds of Simmondsia chinensis, a desert shrub native to the American Southwest. The "Nature for Nurture" line reflects the brand\'s commitment to minimal processing and certified organic sourcing. The oil is golden, odorless when refined, and has a shelf life of five or more years without going rancid — a significant practical advantage over most plant oils.'],
      ['h2', 'Key Properties & Why They Work'],
      ['normal', 'Jojoba\'s wax ester structure means it doesn\'t oxidize or break down the way triglyceride-based oils do, and it penetrates the skin without leaving a greasy residue. Its molecular similarity to sebum allows it to signal the skin\'s own oil production to balance — making it paradoxically useful for both very dry skin (it moisturizes) and oily, acne-prone skin (it helps regulate excess sebum production).'],
      ['normal', 'It contains vitamin E, B vitamins, and minerals including chromium, copper, and zinc — micronutrients that support skin health. Its natural iodine content gives it mild antimicrobial properties that make it a gentle option for acne management.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'As a facial moisturizer, jojoba oil is the starting point for dozens of DIY serum recipes — lightweight enough to use alone, stable enough to blend with essential oils and actives. For hair, it is the ideal scalp treatment oil: applied to the scalp and hair ends, it moisturizes without weighing hair down or causing grease. It makes an excellent carrier oil for diluting essential oils for both skin and scalp applications.'],
      ['normal', 'As a makeup remover, jojoba dissolves makeup — including waterproof formulas — gently and completely. For nail and cuticle care, a few drops massaged daily keeps cuticles soft and nails flexible. Its non-comedogenic profile makes it safe for nearly every skin type including acne-prone.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Virtually everyone. Jojoba oil\'s universal skin compatibility, non-comedogenic nature, and multi-use versatility make it the single most useful botanical oil to have on hand. If you\'re going to invest in one pure carrier oil, this is the one.'],
      ['h2', 'Final Verdict'],
      ['normal', 'US Organic Jojoba Oil delivers one of nature\'s most remarkable botanical multitaskers in USDA-certified, cold-pressed form. It moisturizes, balances, conditions, protects, and serves as the base for almost everything else in a natural beauty routine. The "restore resilience and shine" promise is earned.'],
    ]),
  },
  {
    title: 'Captain Ron\'s All Natural Insect Repellent Review: DEET-Free Protection You Can Feel Good About',
    excerpt: 'Captain Ron\'s All Natural Insect Repellent uses a carefully balanced blend of plant-based repellent oils to keep bugs at bay — a clean, non-toxic alternative to DEET-based sprays that\'s safe for the whole family and the environment.',
    body: buildBlocks([
      ['normal', 'DEET is effective — there\'s no denying that. But its neurotoxic properties, plastic-dissolving potency, and absorption through skin make it an uncomfortable choice for anyone living holistically, especially when applying to children or spending extended time outdoors. Captain Ron\'s All Natural Insect Repellent offers a credible botanical alternative built from time-tested repellent plants.'],
      ['h2', 'What Is It?'],
      ['normal', 'Captain Ron\'s is a small-batch, natural outdoor brand formulating insect repellents from plant-derived essential oils with documented repellent activity. The formula combines multiple botanical actives to provide broad-spectrum repellency against mosquitoes, ticks, gnats, and other biting insects — without synthetic chemicals, artificial fragrance, or alcohol-based carrier solvents.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'The repellent core draws from a combination of oils with the strongest research and traditional use behind them: citronella, eucalyptus (particularly lemon eucalyptus, which the CDC recognizes as an effective DEET alternative), lavender, and lemongrass. Each contributes compounds — citronellal, citronellol, p-menthane-3,8-diol, and linalool — that interfere with the olfactory receptors insects use to locate human hosts.'],
      ['normal', 'Neem oil, where included in natural repellent formulas, adds a longer-lasting residual effect — neem\'s azadirachtin compounds are among the most powerful natural insect deterrents known. The combination of fast-acting volatile compounds and slower-releasing residual actives extends the effective protection window compared to single-oil repellents.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Apply to exposed skin before outdoor activities — hiking, camping, gardening, or backyard time during peak insect hours (dawn and dusk). Reapplication every 60–90 minutes provides consistent protection. The natural formula is appropriate for children over 2 years when applied by an adult, and safe for use in areas where waterways and wildlife are present — no environmental toxicity concerns.'],
      ['normal', 'The scent of natural repellents is notably more pleasant than DEET — botanical and herbal rather than chemically sharp. Many users report that the scent alone is a significant quality-of-life improvement over conventional options.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Families with children, anyone spending time in nature who wants to avoid DEET, gardeners, campers, hikers, and outdoor enthusiasts who prioritize clean products even in utilitarian categories.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Captain Ron\'s All Natural Insect Repellent delivers genuine protection with botanical ingredients that are safe for your family and the environment. It requires more frequent reapplication than DEET but earns that trade-off with a formula you can feel completely confident applying to your skin and your children\'s.'],
    ]),
  },
  {
    title: 'Gellen Time to Shine Nail Polish Remover Review: Acetone-Free Nail Care That Cares for Your Nails',
    excerpt: 'Gellen\'s Time to Shine Nail Polish Remover removes color quickly and effectively while treating nails gently — a conditioning, acetone-free formula that leaves nails stronger and smoother rather than dry and brittle.',
    body: buildBlocks([
      ['normal', 'Nail polish remover is one of the most overlooked products in a clean beauty routine — it\'s on the nails for seconds and wiped away, so it\'s easy to assume it doesn\'t matter. But regular acetone exposure damages the nail plate and surrounding skin significantly over time. Gellen\'s Time to Shine Nail Polish Remover addresses this with a formula designed to remove color efficiently while actively caring for nail health.'],
      ['h2', 'What Is It?'],
      ['normal', 'Gellen Time to Shine is an acetone-free nail polish remover from the clean nail care brand known for its non-toxic nail polish line. The remover is formulated to work on both regular and gel-finish nail polishes without relying on harsh solvents. It\'s enriched with conditioning agents that leave nails and cuticles in better condition after removal than before.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'The solvent base uses ethyl acetate and isopropyl alcohol rather than acetone — compounds that dissolve nail lacquer effectively while being significantly less aggressive on the nail plate and surrounding skin. Acetone penetrates deeply and strips both the nail plate and the natural oils in the skin around the nail, causing brittleness, peeling, and dryness with regular use. The acetone-free approach preserves the structural integrity of the nail.'],
      ['normal', 'Conditioning additions — typically vitamin E, aloe vera, or nourishing plant oils depending on the specific formula — counteract the drying effect of the solvent base and leave nails and cuticles moisturized after use. This is what makes the "Time to Shine" name appropriate: nails genuinely look better after removal, not worse.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Apply with a cotton pad or round and press onto the nail for a few seconds to saturate the lacquer, then wipe away cleanly. One saturated pad handles multiple nails. Removal is efficient — comparable to acetone on regular polish, though gel and long-wear formulas may require slightly longer dwell time or a second application.'],
      ['normal', 'For those who change nail color frequently, the conditioning formula makes this a significant upgrade from acetone-based removers — nails maintain their natural strength rather than becoming progressively more brittle with each removal cycle.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone who changes nail polish regularly and wants to protect nail health over time. Particularly valuable for those with naturally brittle, thin, or peeling nails, and anyone transitioning to a cleaner nail care routine alongside a non-toxic polish choice.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Gellen Time to Shine Nail Polish Remover completes the clean nail care circle. It removes effectively, conditions actively, and avoids the acetone that makes conventional removers a source of cumulative nail damage. A thoughtful formulation that respects your nails as much as your polish does.'],
    ]),
  },
  {
    title: 'FOREO Rechargeable Sonic Toothbrush Review: Silicone-Bristle Technology That Changes Your Clean',
    excerpt: 'The FOREO rechargeable sonic toothbrush replaces nylon bristles with ultra-hygienic silicone and pairs it with sonic pulsation — delivering a dentist-recommended clean that\'s gentler on enamel and gums than any conventional brush.',
    body: buildBlocks([
      ['normal', 'Oral health is a pillar of whole-body wellness — emerging research continues to connect gum health to cardiovascular health, metabolic function, and systemic inflammation. The FOREO rechargeable sonic toothbrush is the product that oral health-conscious, holistically-minded people consistently upgrade to — and the reasons go beyond the distinctive design.'],
      ['h2', 'What Is It?'],
      ['normal', 'FOREO produces a line of sonic toothbrushes that replace the nylon bristle head found on all conventional electric toothbrushes with ultra-hygienic medical-grade silicone. The sonic pulsation technology delivers high-frequency vibration through the silicone to dislodge plaque and stimulate the gums, without the abrasive physical contact of traditional bristles.'],
      ['h2', 'Why Silicone Bristles?'],
      ['normal', 'Nylon bristles harbor bacteria and degrade over time — most dental associations recommend replacing brush heads every 3 months for this reason. Medical-grade silicone is non-porous, meaning bacteria cannot penetrate the material surface. FOREO\'s silicone heads are designed to last a full year without degradation, and the material is inherently antimicrobial by structure rather than by chemical treatment.'],
      ['normal', 'Silicone is also dramatically gentler on tooth enamel and gum tissue than nylon. Conventional electric toothbrushes — even on gentle settings — can cause enamel abrasion and gum recession with aggressive use. The FOREO\'s silicone delivers the cleaning action through sonic vibration rather than physical abrasion, making it appropriate even for sensitive teeth and gum issues.'],
      ['h2', 'Key Features & Performance'],
      ['normal', 'The rechargeable battery lasts up to 365 uses per charge on most models, making daily charging a non-issue. The device is waterproof for full shower use. Multiple intensity settings allow customization from ultra-gentle for sensitivity to more vigorous for a deep-clean preference. The compact, single-piece silicone design makes travel hygiene simple — no replaceable heads to pack, no risk of contamination in a toiletry bag.'],
      ['normal', 'Clinical testing cited by FOREO documents 11x more plaque removal than a manual brush and significant gum health improvement over 4 weeks of use — results consistent with what sonic toothbrush technology demonstrates broadly in dental research.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone prioritizing oral health as part of a whole-body wellness approach. Particularly valuable for those with sensitive teeth or gums, dental anxiety, enamel concerns, or anyone who wants the most hygienic brush platform available without replacing heads constantly.'],
      ['h2', 'Final Verdict'],
      ['normal', 'The FOREO rechargeable sonic toothbrush is a genuine upgrade to the most important daily wellness habit most people have. Cleaner technology, gentler action, and superior hygiene — it\'s the toothbrush that integrative dentists and clean living practitioners consistently recommend. Invest in your oral health and the whole body benefits.'],
    ]),
  },
  {
    title: 'The Honest Company Refresh Face + Body Lotion Review: Clean, Lightweight Hydration for the Whole Family',
    excerpt: 'The Honest Company\'s Refresh Face + Body Lotion delivers lightweight, all-day hydration with a clean ingredient list — free from parabens, synthetic fragrance, and harsh chemicals, making it genuinely safe for daily use on every skin type.',
    body: buildBlocks([
      ['normal', 'The Honest Company was founded on a simple premise: everyday products should be safe enough to use on a newborn. Their Refresh Face + Body Lotion lives up to that standard — a lightweight, fast-absorbing moisturizer that works for the whole family without a single compromising ingredient.'],
      ['h2', 'What Is It?'],
      ['normal', 'The Honest Company Refresh Face + Body Lotion is a lightweight daily moisturizer designed for both face and body use. Its formula prioritizes hydration, barrier support, and ingredient transparency — hitting the marks that clean beauty buyers care most about while remaining accessible and affordable for daily whole-family use.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'The formula centers on a humectant and emollient combination: hyaluronic acid and glycerin attract and retain moisture from the environment into the skin\'s upper layers, while plant-based emollients like shea butter and sunflower seed oil create a breathable barrier that seals that moisture in. This two-step hydration approach — attract and lock — is the mechanism behind effective, long-lasting moisturization.'],
      ['normal', 'Niacinamide (vitamin B3) adds skin-brightening and barrier-strengthening activity — it reduces the appearance of pores, evens skin tone, and supports the ceramide production that keeps the skin barrier intact. Aloe vera provides soothing, anti-inflammatory support that makes the formula suitable for post-sun, reactive, or eczema-prone skin.'],
      ['normal', 'The formula is free from parabens, synthetic fragrance, formaldehyde donors, phthalates, mineral oil, and petrolatum. It\'s EWG Verified — meaning the Environmental Working Group has reviewed the full ingredient list and confirmed it meets their rigorous safety standards.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Families who want one clean lotion that works for adults and children. Particularly valuable for those with sensitive, reactive, or eczema-prone skin across any age group. Also ideal as a daily face moisturizer for those who prefer a lightweight, non-comedogenic formula over richer creams.'],
      ['h2', 'Final Verdict'],
      ['normal', 'The Honest Company Refresh Face + Body Lotion delivers on its brand promise: a genuinely safe, effective moisturizer that a whole family can share. Clean certification, thoughtful formulation, and a price point that makes daily use sustainable — it\'s a reliable staple in any non-toxic skincare routine.'],
    ]),
  },
  {
    title: 'Neal\'s Yard Remedies Bee Lovely Body Lotion Review: Honey and Botanical Luxury for Deeply Nourished Skin',
    excerpt: 'Neal\'s Yard Remedies\' Bee Lovely Body Lotion is a certified organic, honey-enriched body lotion that transforms daily moisturizing into a sensory ritual — with ingredients that are as beautiful as the experience of using them.',
    body: buildBlocks([
      ['normal', 'Neal\'s Yard Remedies is the gold standard of British organic beauty — a brand that has been formulating certified organic products since 1981, long before clean beauty became a market category. Their Bee Lovely Body Lotion is one of their most celebrated products: a honey and floral botanical body lotion that makes moisturizing feel like a genuine act of self-care.'],
      ['h2', 'What Is It?'],
      ['normal', 'Bee Lovely Body Lotion is a certified organic body moisturizer from Neal\'s Yard Remedies, formulated around organic honey and a blend of floral botanicals. It\'s certified by the Soil Association — the UK\'s leading organic certification body — which requires at least 70% certified organic content and prohibits over 3,000 synthetic chemicals that are permitted in conventional beauty products.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Organic honey is the hero ingredient — a natural humectant that draws moisture to the skin while providing its own antimicrobial and wound-healing properties through hydrogen peroxide production and low water activity. Honey also contains antioxidants, amino acids, and enzymes that nourish the skin far beyond simple moisture retention.'],
      ['normal', 'The floral botanical complex — typically including organic orange flower, ylang ylang, and chamomile — contributes antioxidant and anti-inflammatory support while creating the signature warm, floral, honeyed scent that makes this lotion distinctive. Organic beeswax provides an additional occlusive layer that seals in moisture without feeling heavy or greasy.'],
      ['normal', 'Sweet almond and organic sunflower oils round out the formula with oleic and linoleic fatty acids that reinforce the skin\'s lipid barrier — the foundation of well-moisturized, healthy-looking skin. The formula is parabens-free, synthetic fragrance-free, and free from petrochemical derivatives.'],
      ['h2', 'The Sensory Experience'],
      ['normal', 'Part of what makes Bee Lovely stand out is that using it actually feels like something. The honey-based texture absorbs quickly but leaves skin feeling genuinely nourished — not just coated. The scent is complex and natural: warm honey, soft florals, and something slightly herbal. It transforms a two-minute post-shower routine into a moment worth savoring.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Those who want their daily moisturizer to also be a sensory and self-care experience. Particularly suitable for dry to normal skin that needs consistent nourishment, and for anyone who appreciates the highest standard of certified organic formulation in their body care.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Neal\'s Yard Remedies Bee Lovely Body Lotion is what clean body care looks like when a brand has been doing it for over 40 years. Organic certification, exceptional ingredients, and a sensory experience that makes daily skin care feel intentional and restorative. One of the finest body lotions in the natural beauty category, full stop.'],
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

  console.log('\nDone — all 15 articles published to Sanity.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
