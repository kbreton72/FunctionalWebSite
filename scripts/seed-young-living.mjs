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

// ─── Articles ─────────────────────────────────────────────────────────────────

const articles = [
  {
    title: 'Young Living Clary Sage Essential Oil Review: Hormonal Balance and Emotional Clarity',
    excerpt: 'Young Living\'s Clary Sage essential oil is one of the most trusted botanicals for hormonal balance, menstrual comfort, and emotional regulation — a grounding, herbaceous oil that supports the whole person.',
    body: buildBlocks([
      ['normal', 'Clary sage has a long history in herbal medicine, particularly for women\'s health. Young Living\'s Clary Sage essential oil carries that tradition into a concentrated, aromatic form — offering support for hormonal cycles, emotional equilibrium, and physical relaxation in one versatile oil.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Clary Sage is a steam-distilled essential oil from the Salvia sclarea plant, grown and harvested under Young Living\'s Seed to Seal quality standard. It has a warm, herbal, slightly floral aroma that grounds and calms the nervous system.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Clary sage contains natural phytoestrogens — plant compounds that interact with estrogen receptor sites in the body. This makes it one of the most studied botanicals for menstrual discomfort, PMS symptoms, and perimenopausal transitions. Diffusing or applying diluted to the abdomen during discomfort is a widely reported practice among holistic health practitioners.'],
      ['normal', 'Emotionally, clary sage is classically associated with mental clarity and releasing overthinking. Diffused during meditation or before sleep, it encourages a calm, settled mind. It pairs beautifully with lavender and bergamot for an emotional-reset blend.'],
      ['normal', 'Topically (always diluted in a carrier oil), it can support skin texture and is commonly used in DIY facial serums for mature or stressed skin. It blends naturally into massage oils for lower back and abdominal comfort.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'Young Living\'s Seed to Seal standard means every step of production — from seed selection and cultivation to distillation and testing — is controlled and verified by Young Living. This results in a therapeutic-grade oil with no synthetic additives, fillers, or dilution.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Women navigating menstrual cycles, perimenopause, or hormone-related mood shifts will find clary sage particularly valuable. Also excellent for anyone drawn to herbal, grounding scents in their mindfulness or meditation practice.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Clary Sage is one of the most functional single-note essential oils you can own. It works on the physical and emotional level simultaneously, making it a genuine dual-purpose tool in a holistic wellness kit.'],
    ]),
  },
  {
    title: 'Young Living Cedarwood Essential Oil Review: The Natural Path to Deeper Sleep',
    excerpt: 'Young Living\'s Cedarwood essential oil contains cedrol — a naturally occurring sesquiterpene shown to have calming, sedative properties that make it one of the most effective natural sleep aids in aromatherapy.',
    body: buildBlocks([
      ['normal', 'In a world full of sleep aids, cedarwood essential oil stands out for its simplicity and scientific backing. Young Living\'s Cedarwood oil is steam-distilled from Cedrus atlantica bark, delivering a warm, woody aroma with genuine calming properties rooted in biochemistry, not folklore.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Cedarwood essential oil is derived from Atlas cedarwood, a species long prized in traditional medicine for its grounding and calming effects. The oil has a deep, warm, woody scent reminiscent of pencil shavings and forest air — the kind of smell that immediately signals safety and relaxation.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Cedarwood\'s primary active compound is cedrol, a sesquiterpene that has been studied for its sedative effects on the nervous system. Research suggests it can reduce heart rate and lower stress hormones, making it a legitimate natural support for winding down before sleep. Diffusing 3–5 drops in the bedroom 30 minutes before sleep is one of the most commonly reported uses.'],
      ['normal', 'For hair and scalp health, cedarwood is one of the most studied oils. A landmark study published in Archives of Dermatology found that cedarwood in combination with other essential oils significantly improved alopecia areata in participants. Diluted and massaged into the scalp, it stimulates circulation and supports follicle health.'],
      ['normal', 'Emotionally, cedarwood is grounding and stabilizing — excellent for anxiety, overstimulation, or any time the nervous system needs to come down from high alert.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'Young Living\'s quality control ensures the cedarwood oil is pure, undiluted, and free from synthetic aromatic compounds that could compromise its therapeutic properties. The Seed to Seal commitment is what separates their oils from commodity-grade alternatives.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone struggling with sleep quality, anxiety, or an overactive mind before bed. Also valuable for those using essential oils topically to support hair health or scalp circulation.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Cedarwood is one of the most versatile wellness investments in the essential oil category. Sleep, hair health, and emotional grounding in one bottle — backed by more research than most natural sleep solutions on the market.'],
    ]),
  },
  {
    title: 'Young Living Tea Tree Essential Oil Review: Nature\'s Most Powerful Antimicrobial',
    excerpt: 'Young Living\'s Tea Tree (Melaleuca) essential oil is one of the most extensively studied natural antimicrobials available — antibacterial, antifungal, and antiviral properties in a single, versatile oil.',
    body: buildBlocks([
      ['normal', 'Few essential oils have accumulated as much scientific literature as tea tree. Young Living\'s Tea Tree essential oil — distilled from Melaleuca alternifolia — brings that clinical credibility into a pure, high-quality oil that earns its reputation as a natural first-aid essential.'],
      ['h2', 'What Is It?'],
      ['normal', 'Tea tree oil is steam-distilled from the leaves of the Melaleuca alternifolia plant, native to Australia. Aboriginal Australians have used it medicinally for centuries, and modern research has validated much of that traditional use. Young Living\'s version adheres to their Seed to Seal standard, ensuring consistent potency and purity.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Tea tree\'s antimicrobial activity is primarily due to its high concentration of terpinen-4-ol, a compound shown to disrupt bacterial cell membranes and inhibit fungal growth. It\'s been studied against MRSA, E. coli, Candida, and numerous other pathogens with consistently positive results.'],
      ['normal', 'Skin applications are the most common use: diluted with a carrier oil, it supports acne, minor cuts, fungal infections (nail and skin), and dandruff. For dandruff specifically, research published in the Journal of the American Academy of Dermatology found a 5% tea tree shampoo reduced dandruff severity by 41%.'],
      ['normal', 'Household applications are equally valuable — a few drops added to cleaning solutions creates an effective, non-toxic antibacterial cleaner for counters, bathrooms, and anywhere conventional bleach-based products would otherwise go.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'Adulterated tea tree oil is common in the commodity market. Young Living\'s Seed to Seal process ensures the terpinen-4-ol content meets therapeutic standards and that no synthetic fillers have been introduced — critical for achieving the results the research documents.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone building a non-toxic home cleaning kit, managing acne or skin imbalances naturally, or seeking a first-aid oil that genuinely earns its place in the medicine cabinet.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Tea Tree is one of the best-documented natural antimicrobials available in essential oil form. It\'s a non-negotiable in any holistic household — and one of the few essential oils where the science is robust enough to recommend without reservation.'],
    ]),
  },
  {
    title: 'Young Living Myrtle Essential Oil Review: Respiratory Support and Thyroid Harmony',
    excerpt: 'Young Living\'s Myrtle essential oil is a lesser-known but deeply valuable oil for respiratory health and thyroid support — a gentle, clarifying botanical that works quietly and effectively.',
    body: buildBlocks([
      ['normal', 'Myrtle is one of essential oils\' best-kept secrets. While it doesn\'t have the name recognition of lavender or peppermint, Young Living\'s Myrtle oil carries a unique biochemical profile that makes it particularly valuable for respiratory wellness and — based on practitioner use — potential thyroid support.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Myrtle essential oil is steam-distilled from the leaves and twigs of Myrtus communis, a Mediterranean shrub used in traditional medicine for thousands of years. Its aroma is clean, fresh, and slightly camphoraceous — reminiscent of eucalyptus but softer and sweeter.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Myrtle is rich in 1,8-cineole (also found in eucalyptus), a compound with well-documented expectorant and mucolytic properties. This makes it one of the most effective essential oils for supporting respiratory function — diffused during cold season or added to steam inhalation, it opens airways and helps clear congestion.'],
      ['normal', 'Myrtle is frequently referenced in holistic health circles for thyroid support. While formal clinical studies are limited, experienced practitioners like Dr. Daniel Pénoël have long recommended applying diluted myrtle to the thyroid area (front of the neck) for both hypo and hyperthyroid patterns. This remains an area of anecdotal and practitioner-based use that warrants personal exploration with a knowledgeable practitioner.'],
      ['normal', 'As a skin oil, myrtle is astringent and pore-tightening — useful for oily or blemish-prone skin when diluted in a carrier oil. It pairs well with frankincense for a targeted skin blend.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'Because myrtle is less mainstream, sourcing quality matters enormously. Young Living\'s Seed to Seal guarantee ensures you\'re getting genuine Myrtus communis oil with the correct biochemical profile, not a blended or substituted alternative.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Those looking for seasonal respiratory support, anyone exploring holistic thyroid health practices, and skincare enthusiasts with oily or combination skin who want an astringent botanical in their routine.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Myrtle is an underrated gem that deserves a spot in every serious essential oil collection. Its respiratory benefits are well-supported, and its gentle character makes it accessible even for those new to using oils therapeutically.'],
    ]),
  },
  {
    title: 'Young Living Purification Essential Oil Blend Review: Clean Air, Clean Space, Clean Living',
    excerpt: 'Young Living\'s Purification blend is a powerhouse combination of six essential oils that neutralizes odors, purifies the air, and brings a fresh, clean energy to any space — naturally and without synthetic air fresheners.',
    body: buildBlocks([
      ['normal', 'Conventional air fresheners are among the most chemical-laden products in most homes — loaded with synthetic fragrance, phthalates, and VOCs that do more to mask odors than eliminate them. Young Living\'s Purification blend takes the opposite approach: six carefully selected essential oils that genuinely neutralize odors and cleanse the air at a molecular level.'],
      ['h2', 'What Is It?'],
      ['normal', 'Purification is one of Young Living\'s most beloved signature blends, combining citronella, lavandin, lemongrass, rosemary, tea tree, and myrtle. Each oil contributes to the blend\'s cleansing, neutralizing, and freshening character, creating a synergy that\'s greater than any single oil alone.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'Citronella and lemongrass are both known for their strong deodorizing and insect-repelling properties. Tea tree and myrtle bring antimicrobial activity, actually neutralizing odor-causing bacteria rather than just masking the smell. Rosemary adds a bright, clarifying note while lavandin (a lavender hybrid) softens the blend and adds its own calming antimicrobial properties.'],
      ['normal', 'Together, the blend functions as a genuine air purifier when diffused — not just a pleasant scent, but an actively cleansing presence in the room.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Diffusing Purification is the primary use — in kitchens after cooking, in bathrooms, in pet areas, or anywhere staleness accumulates. A few drops on a cotton ball placed in a trash can, car vent, or gym bag is a simple, chemical-free deodorizing hack. Diluted in water, it makes an effective surface spray for counters and high-touch areas.'],
      ['normal', 'For outdoor use, applying diluted Purification to exposed skin offers a natural barrier against insects — without DEET or synthetic repellents.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'The effectiveness of a blend like Purification depends entirely on the quality of each component oil. Young Living\'s Seed to Seal process ensures every oil in the blend — from citronella to tea tree — meets the same purity standard, preserving the synergistic chemistry that makes the blend work.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone replacing synthetic air fresheners, fabric sprays, or chemical deodorizers with clean alternatives. Pet owners, parents of young children, and anyone building a non-toxic home will find Purification one of the most frequently reached-for bottles in their collection.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Purification is one of those blends that earns permanent cabinet space. It delivers on its name — genuinely purifying spaces rather than just scenting them — and does so with a beautiful, clean aroma that never feels synthetic. A cornerstone of any natural home.'],
    ]),
  },
  {
    title: 'Young Living Peppermint Essential Oil Review: Energy, Focus, and Natural Relief',
    excerpt: 'Young Living\'s Peppermint essential oil is one of the most studied and versatile oils in aromatherapy — delivering cooling relief for headaches, natural energy enhancement, and digestive support in a single iconic bottle.',
    body: buildBlocks([
      ['normal', 'Peppermint is the essential oil that convinces skeptics. The science behind it is unusually robust — from headache relief to cognitive enhancement to digestive support — and the immediate, sensory effect of menthol makes the experience impossible to deny. Young Living\'s Peppermint is distilled from Mentha piperita grown under their Seed to Seal standard, ensuring a menthol content that delivers real therapeutic results.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Peppermint essential oil is steam-distilled from the aerial parts of the peppermint plant. The resulting oil is high in menthol and menthone, the two compounds responsible for peppermint\'s signature cooling sensation and most of its therapeutic activity. Young Living\'s version is single-origin and unadulterated — a significant distinction in a market full of diluted peppermint oils.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'For headache relief, peppermint oil applied diluted to the temples and forehead is one of the best-studied natural alternatives to over-the-counter pain relievers. A clinical trial published in Cephalalgia found peppermint oil as effective as acetaminophen for tension headaches — with fewer side effects.'],
      ['normal', 'As a natural energizer, inhaling peppermint oil has been shown to reduce fatigue and increase alertness. A drop on the palms, cupped over the nose for a few deep breaths, is an immediate, stimulant-free pick-me-up that doesn\'t crash.'],
      ['normal', 'Topically on the back of the neck and temples during physical activity, the cooling sensation reduces perceived exertion. As a digestive aid, applying diluted peppermint to the abdomen supports nausea, bloating, and sluggish digestion.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'Menthol content is the benchmark for peppermint oil quality. Low-grade oils often have synthetic menthol added to compensate for poor plant material. Young Living\'s growing and distillation process produces a naturally high-menthol oil from whole plant material — which delivers noticeably stronger and more consistent effects.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Nearly everyone. Peppermint is one of the most broadly applicable essential oils — useful for headaches, fatigue, digestion, cooling during exercise, respiratory support, and as an invigorating diffuser oil. It\'s the oil most likely to convert a new essential oil user into a lifelong one.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Peppermint essential oil is a non-negotiable in any wellness kit. Backed by more clinical research than almost any other essential oil, it delivers what it promises — quickly, noticeably, and consistently. Buy two bottles. You\'ll go through the first one faster than you expect.'],
    ]),
  },
  {
    title: 'Young Living Myrrh Essential Oil Review: Ancient Wisdom for Modern Skin and Spirit',
    excerpt: 'Young Living\'s Myrrh essential oil has been prized across cultures for thousands of years — and for good reason. From deeply nourishing mature skin to supporting spiritual grounding, myrrh is one of the most multidimensional oils in any collection.',
    body: buildBlocks([
      ['normal', 'Myrrh is one of the oldest traded commodities in human history, referenced in texts from ancient Egypt, the Bible, Ayurveda, and Traditional Chinese Medicine. Young Living\'s Myrrh essential oil honors that legacy with a steam-distilled oil from Commiphora myrrha resin — earthy, complex, and genuinely therapeutic.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Myrrh essential oil is extracted from the resin of the Commiphora myrrha tree, native to northeastern Africa and the Arabian Peninsula. The oil is thick, amber-colored, and carries a warm, balsamic, slightly medicinal aroma that deepens over time — it\'s one of the base notes in perfumery for good reason.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'For skin, myrrh is one of the most nourishing essential oils available. It contains sesquiterpenes and furanoeudesma compounds that support skin cell regeneration, making it particularly effective for mature, dry, or cracked skin. Diluted in a facial oil or serum, it visibly improves skin texture and elasticity with consistent use. It\'s historically used on wounds, stretch marks, and rough heels.'],
      ['normal', 'As an antimicrobial, myrrh has documented activity against oral bacteria — a reason it appears frequently in natural toothpaste and mouthwash formulations. A drop diluted in water as a mouth rinse is a traditional practice with modern scientific support.'],
      ['normal', 'Spiritually and emotionally, myrrh is a grounding, deepening oil. It\'s long been used in sacred rituals, meditation, and prayer across traditions — its effect on the nervous system is calming and centering, making it a natural companion to frankincense in contemplative practice.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'Resin-based oils like myrrh are particularly vulnerable to adulteration and dilution in the commodity market. Young Living\'s Seed to Seal guarantee ensures the oil is genuine, unadulterated Commiphora myrrha — which matters greatly for both the aromatic and therapeutic quality.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Those with dry, mature, or textured skin looking for a deep-nourishing botanical ingredient. Also anyone drawn to sacred, grounding aromatic practices or looking to enhance a meditation and spiritual wellness routine.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Myrrh is an oil that rewards patience — its benefits deepen with consistent use, and its presence in a wellness practice feels ancient and intentional. One of the most meaningful additions you can make to a holistic skincare or spiritual practice.'],
    ]),
  },
  {
    title: 'Young Living Rosemary Vitality Essential Oil Review: Culinary Clarity and Cognitive Edge',
    excerpt: 'Young Living\'s Rosemary Vitality essential oil brings the cognitive-enhancing, circulation-supporting properties of rosemary into a dietary-grade oil that works in the kitchen and the mind — legitimately.',
    body: buildBlocks([
      ['normal', 'Rosemary is one of the most research-backed herbs for cognitive performance, and Young Living\'s Rosemary Vitality brings that science into a dietary-grade essential oil that can be used aromatically for focus or added in small amounts to food and beverages. It\'s the bridge between your herb garden and your supplement stack.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Rosemary Vitality is part of Young Living\'s Vitality line — oils that carry a dietary supplement label and are approved for internal use in the United States. It\'s steam-distilled from Rosmarinus officinalis, delivering a bright, camphoraceous, herbaceous aroma that is unmistakably rosemary.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'For cognitive performance, the research on rosemary aromatherapy is compelling. Studies from Northumbria University found that people exposed to rosemary aroma performed better on memory and alertness tests. The primary mechanism involves 1,8-cineole, which inhibits breakdown of acetylcholine — a neurotransmitter critical for memory and focus. Diffusing Rosemary Vitality during study or focused work sessions is a research-supported productivity tool.'],
      ['normal', 'Topically (diluted), rosemary oil is one of the most studied botanicals for hair growth and scalp circulation. It increases dermal blood flow and has been compared favorably to minoxidil in at least one clinical trial for hair loss. Adding a few drops to a carrier oil and massaging into the scalp is one of the most commonly reported holistic hair practices.'],
      ['normal', 'Culinarily, a toothpick dip of Rosemary Vitality into olive oil, salad dressings, or meat marinades delivers an intense, concentrated herb flavor. A little goes a very long way.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'The Vitality label means this oil meets Young Living\'s internal standards for dietary use — a meaningful distinction from commodity rosemary oils that may contain pesticide residues or adulteration.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone interested in cognitive support, natural hair care, or culinary herbalism. Students, professionals with heavy cognitive demands, and anyone exploring food-based wellness practices will find Rosemary Vitality a versatile and genuinely useful addition.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Rosemary Vitality earns its keep on two fronts simultaneously — kitchen and wellness practice. The cognitive and hair-growth research alone justifies the investment for most users, and the culinary uses make it one of the most daily-accessible oils in the Vitality line.'],
    ]),
  },
  {
    title: 'Young Living Citronella Essential Oil Review: Natural Bug Repellent That Actually Works',
    excerpt: 'Young Living\'s Citronella essential oil is the clean living alternative to DEET — a naturally insect-repelling oil with centuries of use, a fresh lemony aroma, and none of the neurotoxic concerns of synthetic repellents.',
    body: buildBlocks([
      ['normal', 'DEET has been the default insect repellent for decades, but its neurotoxic properties and skin absorption have made it a poor fit for holistic, toxin-conscious living. Young Living\'s Citronella essential oil provides a genuine botanical alternative — one with documented repellency and a far cleaner safety profile.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Citronella essential oil is steam-distilled from Cymbopogon nardus grass — the botanical source of the citronella found in candles, sprays, and outdoor torches for generations. The oil has a bright, lemon-grass-like aroma that is cheerful and fresh, not medicinal.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'As an insect repellent, citronella works by masking the carbon dioxide and body odors that attract mosquitoes. Research published in Phytotherapy Research documented citronella\'s effectiveness against mosquitoes, though reapplication every 30–60 minutes is needed for sustained protection — shorter duration than DEET but with none of the associated toxicity concerns.'],
      ['normal', 'Blended with other repellent oils like eucalyptus, lavender, and lemongrass in a carrier oil or witch hazel spray, citronella\'s effectiveness increases significantly. Young Living\'s Purification blend already contains citronella as one of its key components, making the two oils natural companions for outdoor use.'],
      ['normal', 'As an air freshener and deodorizer, citronella is excellent in diffusers for outdoor spaces, patios, or anywhere freshening is needed. It\'s also documented for its antifungal activity, making it useful in DIY household cleaning blends.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'The repellent compounds in citronella oil — primarily citronellal, geraniol, and citronellol — vary significantly with plant source and distillation quality. Young Living\'s Seed to Seal process ensures a consistent, high-active-compound oil that delivers the repellent performance citronella is known for.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Families wanting a non-toxic insect repellent option, especially for children. Outdoor enthusiasts, campers, and gardeners who want to keep bugs at bay without synthetic chemicals. Anyone with sensitivities to DEET or conventional repellent sprays.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Citronella is a clean, effective, and genuinely pleasant-smelling alternative to synthetic insect repellents. It works, it\'s safe, and it belongs in any outdoor wellness kit — especially during peak insect season.'],
    ]),
  },
  {
    title: 'Young Living Peppermint Vitality Essential Oil Review: Digestive Support and Cooling Relief From the Inside Out',
    excerpt: 'Young Living\'s Peppermint Vitality takes the power of peppermint internal — a dietary-grade oil for digestive support, natural energy, and cooling relief that works systemically when ingested in the appropriate small amounts.',
    body: buildBlocks([
      ['normal', 'Peppermint has one of the strongest bodies of clinical research for internal use of any botanical — particularly for digestive health. Young Living\'s Peppermint Vitality is the dietary-grade version of their flagship peppermint oil, cleared for internal use and supported by decades of peer-reviewed research on enteric-coated peppermint supplementation.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Peppermint Vitality is part of the Vitality line — essential oils labeled as dietary supplements in the United States. The oil is identical in purity and distillation to the standard Peppermint essential oil but carries the label certifying it for internal use in appropriate serving sizes. This is not a marketing distinction — it reflects compliance with FDA dietary supplement labeling requirements.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'The clinical research on peppermint oil for irritable bowel syndrome (IBS) and general digestive discomfort is among the most robust for any essential oil. A meta-analysis published in the Journal of Clinical Gastroenterology found peppermint oil significantly superior to placebo for abdominal pain and overall IBS symptoms. A drop in a glass of water or veggie capsule before meals supports digestion and reduces gas and bloating.'],
      ['normal', 'Taken before physical activity, the internal menthol exposure supports respiratory comfort and reduces perceived exertion — a performance tool used by athletes exploring natural supplementation. The cooling effect is experienced systemically, not just on the skin.'],
      ['normal', 'As a culinary ingredient, Peppermint Vitality is extraordinarily concentrated — a toothpick dip goes into smoothies, chocolate desserts, herbal teas, or homemade candy for intense, clean peppermint flavor without artificial flavoring.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'For an oil taken internally, sourcing purity is paramount. Young Living\'s Seed to Seal guarantee and the Vitality designation ensure no pesticide residues, no synthetic additives, and a verified menthol content that produces consistent results.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Anyone managing digestive discomfort, IBS, nausea, or looking for a clean, stimulant-free energy and focus boost. Also ideal for those who enjoy cooking with fresh peppermint flavor without growing or sourcing fresh herbs.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Peppermint Vitality is one of the most clinically credible essential oil supplements available. The digestive research alone makes it worth having — and the culinary and energy-support uses make it one of the most versatile daily-use oils in the Vitality line.'],
    ]),
  },
  {
    title: 'Young Living Frankincense Essential Oil Review: The King of Oils for Skin, Mind, and Spirit',
    excerpt: 'Young Living\'s Frankincense essential oil is the most revered oil in the world for a reason — centuries of sacred use, modern research on cellular health, profound effects on anxiety and spiritual practice, and unparalleled skin regeneration.',
    body: buildBlocks([
      ['normal', 'If every essential oil collection had a cornerstone, it would be frankincense. Used in temples, medicine, and skincare for over five thousand years, Young Living\'s Frankincense essential oil is the highest expression of this ancient resin — distilled from hand-harvested Boswellia carterii resin under their Seed to Seal quality standard.'],
      ['h2', 'What Is It?'],
      ['normal', 'Young Living Frankincense is steam-distilled from the resin of the Boswellia carterii tree, primarily harvested in Somalia and Oman. The oil is warm, balsamic, slightly citrusy, and deeply complex — a base note that anchors and elevates every blend it enters. It\'s known as the "King of Oils" in the essential oil world, and the reputation is earned.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'For skin, frankincense is one of the most scientifically supported regenerative botanicals available. It contains boswellic acids and alpha-pinene that stimulate skin cell regeneration, support collagen production, and reduce the appearance of fine lines, scars, and uneven texture. Applied diluted in a facial oil, consistent use produces visible improvement in skin quality over weeks.'],
      ['normal', 'For the nervous system and emotional health, frankincense has been studied for its ability to cross the blood-brain barrier via the olfactory system, activating ion channels that influence mood and emotional processing. Research published in The FASEB Journal found frankincense\'s active compound incensole acetate reduced anxiety and depression in animal models. Diffused during meditation, prayer, or before sleep, it creates a profound sense of groundedness and stillness.'],
      ['normal', 'As an immune-supportive oil, frankincense is frequently included in wellness protocols during cold and flu season, diffused in the home or diluted and applied to the bottoms of the feet.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'Frankincense quality varies enormously by species and harvest region. Young Living sources from verified Boswellia carterii trees and controls the distillation process to preserve the complex chemistry of the resin. This is an oil where quality determines the experience — low-grade frankincense simply does not produce the same effect.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Everyone. Frankincense is the most universally applicable essential oil for anyone pursuing physical, emotional, or spiritual wellness. It\'s particularly transformative for skincare, meditation practice, and nervous system support.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Frankincense is the essential oil that people buy once and use for the rest of their lives. It is the single best investment in the category — for what it does, how it does it, and the depth and breadth of its applications. If you own only one essential oil, make it frankincense.'],
    ]),
  },
  {
    title: 'Young Living Breathe Again Roll-On Review: Instant Respiratory Relief in Your Pocket',
    excerpt: 'Young Living\'s Breathe Again Roll-On puts four powerful respiratory essential oils in a pre-diluted, ready-to-apply format — delivering immediate, natural airway support whenever and wherever you need it.',
    body: buildBlocks([
      ['normal', 'Respiratory support is one of the most compelling use cases for essential oils, and Young Living\'s Breathe Again Roll-On makes that support accessible in the most convenient possible format. Pre-diluted and ready to roll on at a moment\'s notice, it\'s become a go-to for allergy season, travel, morning congestion, and anyone who wants clear airways without reaching for a pharmaceutical.'],
      ['h2', 'What Is It?'],
      ['normal', 'Breathe Again Roll-On is a pre-diluted essential oil blend containing eucalyptus (Eucalyptus staigeriana and Eucalyptus radiata), myrtle, copaiba, peppermint, and blue tansy essential oils, blended in a base of fractionated coconut oil. The roll-on format means no measuring, no diluting — just apply to the neck, chest, or under the nose and breathe.'],
      ['h2', 'Key Ingredients & Why They Work'],
      ['normal', 'The eucalyptus varieties in this blend are rich in 1,8-cineole, one of the most extensively studied expectorant and bronchodilating compounds in natural medicine. It actively opens airways, reduces mucus viscosity, and supports easier breathing within minutes of application. Myrtle complements the eucalyptus with its own cineole content and gentle character that makes the blend suitable for children\'s neck and chest application.'],
      ['normal', 'Peppermint adds the cooling, clearing menthol sensation that provides immediate sensory relief. Copaiba — derived from Copaifera resin — contributes anti-inflammatory support that complements the respiratory action. Blue tansy adds a beautiful blue color from azulene compounds known for their anti-inflammatory properties.'],
      ['h2', 'Key Benefits & Uses'],
      ['normal', 'Roll onto the neck, upper chest, and under the nose for immediate respiratory opening. During allergy season, morning application as part of a daily routine helps keep airways clear throughout the day. Traveling by plane — where recirculated air is a respiratory challenge — Breathe Again is one of the most valuable carry-on additions. For children with nighttime congestion, rolling onto the neck and top of the feet before bed is a gentle, effective comfort measure.'],
      ['h2', 'Seed to Seal Quality'],
      ['normal', 'The Breathe Again Roll-On uses the same Seed to Seal oils as Young Living\'s single oils — the pre-diluted format doesn\'t compromise the quality standard. Each component oil is fully tested and verified before blending, ensuring the therapeutic chemistry is intact and effective.'],
      ['h2', 'Who Should Use This?'],
      ['normal', 'Allergy sufferers, anyone prone to seasonal congestion, frequent travelers, parents of young children with respiratory sensitivity, and anyone who has ever wanted the benefits of eucalyptus and peppermint without the prep time of diffusing or diluting.'],
      ['h2', 'Final Verdict'],
      ['normal', 'Young Living Breathe Again Roll-On is essential oil therapy made effortless. It works quickly, it goes everywhere, and it replaces an entire category of pharmaceutical and synthetic respiratory products with a clean, botanical alternative. Keep one in every bag.'],
    ]),
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Connecting to Sanity...');

  // Ensure Physical Health category exists
  const categoryId = 'category-physical-health';
  await client.createIfNotExists({
    _id: categoryId,
    _type: 'category',
    title: 'Physical Health',
    slug: { _type: 'slug', current: 'physical-health' },
    description: 'Products, practices, and insights for optimizing your physical wellbeing — skincare, haircare, nutrition, movement, and clean living.',
  });
  console.log('Category verified: Physical Health');

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

  console.log('\nDone — all 12 Young Living articles published to Sanity.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
