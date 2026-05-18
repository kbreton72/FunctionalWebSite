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

// ── Category definitions ─────────────────────────────────────────────────────

const CATEGORIES = [
  // Physical
  { _id: 'category-skin-care',          title: 'Skin Care',                      slug: 'skin-care',          pillar: 'physical' },
  { _id: 'category-hair-care',          title: 'Hair Care',                      slug: 'hair-care',          pillar: 'physical' },
  { _id: 'category-oral-health',        title: 'Oral Health',                    slug: 'oral-health',        pillar: 'physical' },
  { _id: 'category-makeup-beauty',      title: 'Makeup & Beauty',                slug: 'makeup-beauty',      pillar: 'physical' },
  { _id: 'category-immune-respiratory', title: 'Immune & Respiratory Support',   slug: 'immune-respiratory', pillar: 'physical' },
  { _id: 'category-natural-protection', title: 'Natural Protection',             slug: 'natural-protection', pillar: 'physical' },
  // Mental
  { _id: 'category-focus-clarity',      title: 'Focus & Cognitive Clarity',      slug: 'focus-clarity',      pillar: 'mental'   },
  { _id: 'category-sleep-rest',         title: 'Sleep & Rest',                   slug: 'sleep-rest',         pillar: 'mental'   },
  // Emotional
  { _id: 'category-hormonal-balance',   title: 'Hormonal & Emotional Balance',   slug: 'hormonal-balance',   pillar: 'emotional' },
  // Spiritual
  { _id: 'category-sacred-oils',        title: 'Sacred Oils & Ritual',           slug: 'sacred-oils',        pillar: 'spiritual' },
];

// ── Post → category mapping ──────────────────────────────────────────────────
// Returns array of category _ids for a given post title.

function assignCategories(title) {
  const t = title.toLowerCase();
  const cats = [];

  // ── Spiritual (first so dual-tagged articles add both) ──
  if (t.includes('frankincense') || t.includes('myrrh')) {
    cats.push('category-sacred-oils');
  }

  // ── Mental ──
  if (t.includes('rosemary vitality'))                                cats.push('category-focus-clarity');
  if (t.includes('peppermint essential oil') ||
      (t.includes('peppermint') && !t.includes('vitality') && !t.includes('toothpaste') && !t.includes('castile')))
                                                                      cats.push('category-focus-clarity');
  if (t.includes('cedarwood') && !t.includes('lagunamoon'))          cats.push('category-sleep-rest');  // YL Cedarwood

  // ── Emotional ──
  if (t.includes('clary sage'))                                       cats.push('category-hormonal-balance');

  // ── Physical: Immune & Respiratory ──
  if (t.includes('argentyn') || t.includes('sovereign silver'))      cats.push('category-immune-respiratory');
  if (t.includes('myrtle'))                                           cats.push('category-immune-respiratory');
  if (t.includes('breathe again'))                                    cats.push('category-immune-respiratory');
  if (t.includes('purification'))                                     cats.push('category-immune-respiratory');
  if (t.includes('peppermint vitality'))                              cats.push('category-immune-respiratory');
  if (t.includes('tea tree') && !t.includes('lagunamoon'))           cats.push('category-immune-respiratory');

  // ── Physical: Natural Protection ──
  if (t.includes('captain ron') || t.includes('insect repellent'))   cats.push('category-natural-protection');
  if (t.includes('citronella'))                                       cats.push('category-natural-protection');

  // ── Physical: Oral Health ──
  if (t.includes('thieves') && t.includes('toothpaste'))             cats.push('category-oral-health');
  if (t.includes('foreo') || t.includes('toothbrush'))               cats.push('category-oral-health');

  // ── Physical: Makeup & Beauty ──
  if (t.includes('merle norman') ||
      t.includes('savvy minerals') ||
      t.includes('sunny skin') ||
      t.includes('gellen') ||
      t.includes('nail polish') ||
      t.includes('primer plus') ||
      t.includes('knockout nudes') ||
      t.includes('bronzer'))                                          cats.push('category-makeup-beauty');
  if (t.includes('primally pure') || t.includes('primarily pure') ||
      t.includes('lavender deodorant') || t.includes('deodorant'))   cats.push('category-makeup-beauty');
  if (t.includes('shaving soap'))                                     cats.push('category-makeup-beauty');
  if (t.includes('brazi bronze'))                                     cats.push('category-makeup-beauty');

  // ── Physical: Hair Care ──
  if (t.includes('shampoo') || t.includes('conditioner') ||
      t.includes('hair dryer') || t.includes('styledmax') ||
      t.includes('stylemax') || t.includes('curlwrap') ||
      t.includes('curling iron') || t.includes('heat protectant') ||
      t.includes('biotin') || t.includes('thickening') ||
      t.includes('rahua') || t.includes('acure') ||
      t.includes('mill creek') || t.includes('aromatia') ||
      t.includes('t3 ') || t.includes("l'ange") ||
      t.includes('mia botanica'))                                     cats.push('category-hair-care');
  if (t.includes('lagunamoon'))                                       cats.push('category-hair-care');
  if (t.includes('pura d') && t.includes('tea tree'))                cats.push('category-hair-care');

  // ── Physical: Skin Care ──
  if (t.includes('mychelle') || t.includes('fruit enzyme') ||
      t.includes('mad hippie') || t.includes('jelly cleanser') ||
      t.includes('castor oil') ||
      t.includes('jojoba oil') ||
      t.includes('black cumin') ||
      t.includes('castile soap') ||
      t.includes('honest company') ||
      t.includes('neal') || t.includes("bee lovely") ||
      t.includes('frankincense') || t.includes('myrrh') ||
      t.includes('tanning oil'))                                      cats.push('category-skin-care');

  // Deduplicate
  return [...new Set(cats)];
}

// ── Upsert categories ────────────────────────────────────────────────────────

console.log('Upserting categories...');
for (const cat of CATEGORIES) {
  await client.createOrReplace({
    _id: cat._id,
    _type: 'category',
    title: cat.title,
    slug: { _type: 'slug', current: cat.slug },
    pillar: cat.pillar,
  });
  console.log(`  ✓ ${cat.title} (${cat.pillar})`);
}

// ── Fetch all posts ──────────────────────────────────────────────────────────

console.log('\nFetching posts...');
const posts = await client.fetch(`*[_type == "post"] { _id, title }`);
console.log(`  ${posts.length} posts found`);

// ── Assign categories to posts ───────────────────────────────────────────────

console.log('\nTagging posts...');
let matched = 0;
let unmatched = 0;

for (const post of posts) {
  const catIds = assignCategories(post.title);
  if (catIds.length === 0) {
    console.warn(`  [no match] ${post.title}`);
    unmatched++;
    continue;
  }
  await client.patch(post._id).set({
    categories: catIds.map(id => ({ _type: 'reference', _ref: id, _key: id })),
  }).commit();
  const names = catIds.map(id => CATEGORIES.find(c => c._id === id)?.title).join(', ');
  console.log(`  ✓ ${post.title.slice(0, 55)}… → ${names}`);
  matched++;
}

console.log(`\nDone. ${matched} tagged, ${unmatched} unmatched.`);
