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

// Image URLs keyed by article keywords
const IMAGE_URLS = {
  mychelle:           'https://cdn.shopify.com/s/files/1/2537/6576/files/Fruit_Enz_Scrub_Updated_4.10.26.jpg?v=1775854862',
  drOrganicCalendula: 'https://cdn.shopify.com/s/files/1/0625/2537/4676/files/DrOrganicOrganicCalendulaFragranceFreeShampoo265ml.png?v=1751455832',
  drbronnerLavender:  'https://www.drbronner.com/cdn/shop/files/dr-bronners-organic-shaving-soap-7oz-lavender-1.jpg?v=1725647937',
  drbronnerPeppermint:'https://www.drbronner.com/cdn/shop/files/dr-bronners-pure-castile-liquid-soap-32oz-peppermint-1-us.png?v=1767024136',
  madHippie:          'https://cdn.shopify.com/s/files/1/1503/5836/files/MH2024_JellyCleanser_Pastel.jpg?v=1751566055',
  rahua:              'https://cdn.shopify.com/s/files/1/0067/5266/5673/files/Aloe_Shampoo_9.3_PDP_1.png?v=1776531805',
  acure:              'https://cdn.shopify.com/s/files/1/0550/4896/2261/files/UHconditionersquare.jpg?v=1762457382',
  avalon:             'https://cdn.shopify.com/s/files/1/0359/5105/0887/files/AV36104_Biotin_Shampoo_11oz_PX019180_PX019181_Front_e235139f-fecc-4e73-a97d-2825a266c868.png?v=1765268924',
  millCreek:          'https://cdn.shopify.com/s/files/1/0232/0793/6080/products/MCJojobaConditioner14ozResized.jpg?v=1596543892',
  californiaBaby:     'https://cdn.shopify.com/s/files/1/1848/0147/products/8-5_Calendula-sbw.jpg?v=1762457514',
  aromatica:          'https://d1flfk77wl2xk4.cloudfront.net/Assets/92/605/XXL_p0211960592.jpg',

  ylClarySage:        'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Untitleddesign_45.png?v=1679294650',
  ylCedarwood:        'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Untitleddesign_25.png?v=1679190337',
  ylTeaTre:           'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Untitleddesign_26.png?v=1679193103',
  ylMyrtle:           'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Young-Living-Myrtle-Essential-Oil-15ml.png?v=1668661284',
  ylPurification:     'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Untitleddesign_16.png?v=1709601214',
  ylPeppermint:       'https://cdn.shopify.com/s/files/1/0244/8556/0354/files/younglivingpeppermintessentialoil_9094b842-6ef2-4174-956a-9d65a1067c37.png?v=1709599685',
  ylMyrrh:            'https://cdn.shopify.com/s/files/1/0244/8556/0354/files/younglivingmyrrhessentialoil_58934b05-b698-4a2b-a33b-3ecc27067f08.png?v=1709599931',
  ylRosemaryVitality: 'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Young-Living-Rosemary-Vitality-Essential-Oil-5ml.png?v=1668661918',
  ylCitronella:       'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Young-Living-Cinnamon-Bark-Essential-Oil-5ml_14.png?v=1679258453',
  ylPeppermintVitality:'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Young-Living-Peppermint-Vitality-Essential-Oil-5ml.png?v=1668661656',
  ylFrankincense:     'https://cdn.shopify.com/s/files/1/0244/8556/0354/files/younglivingfrankincenseessentialoil_0895fc55-c6a2-4c0a-8c9d-d0e1b8376f68.png?v=1704411935',
  ylBreatheAgain:     'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Untitleddesign_29.png?v=1679196366',
  ylThieves:          'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Young-Living-Thieves-AromaBright-Toothpaste-4oz.png?v=1668662758',
  ylSavvy:            'https://cdn.shopify.com/s/files/1/0244/8556/0354/products/Young-Living-Savvy-Minerals-Bronzer-Brush.png?v=1668662058',

  puraTeaTre:         'https://cdn.shopify.com/s/files/1/0028/7191/8661/products/4oz_tea_tree_oil_-_front_hi-res.jpg?v=1685227509',
  lagunamoon:         'https://cdn.shopify.com/s/files/1/2522/6514/files/Main_Image_Lagunamoon_Essential_Oils_Set_-_12_Piece_Premium_Grade_Home_Essentials_Oils_-_for_Diffusers_Fragrance_Scents_for_Candle_Making_-_Natural_Aromatherapy_Oils_for_Cars_Home_Pro.png?v=1763118184',

  heritage:           'https://cdn.shopify.com/s/files/1/0074/0347/0894/files/076970221097_4.png?v=1763977680',
  argentyn:           'https://argentyn23.com/wp-content/uploads/2019/06/Professional-Bio-Active-Silver-Hydrosol.png',
  blackCumin:         'https://cdn.shopify.com/s/files/1/0091/5587/0825/files/CuminSeedOil-1.png?v=1696721861',
  pimallyPure:        'https://cdn.shopify.com/s/files/1/0874/6120/files/2024_Lavender_Deodorant1.7oz_PDPcopy_74e492c1-8df7-4d0b-b9e0-13d40d44e148.webp?v=1775659462',
  braziBronze:        'https://cdn.shopify.com/s/files/1/0550/5030/5691/files/14.png?v=1769738480',
  sovereignSilver:    'https://cdn.shopify.com/s/files/1/0111/2086/9457/files/PDP-SilverNaturalNasalSpray_1oz_2048x2048_PG-1.jpg?v=1767554958',
  miaBotanica:        'https://static.wixstatic.com/media/e0f3aa_aa48a1d5dfee4c0e97edac7e579d48f4~mv2.png',
  usOrganic:          'https://cdn.shopify.com/s/files/1/1190/0548/products/For_Amazon_2oz_Jojoba_JPEG_dropper.jpg?v=1561397253',
  captainRons:        'https://cdn.shopify.com/s/files/1/1316/4827/files/CaptainRons_960x_9d499b00-b3e1-49b0-a56f-4e7a2867bff0.jpg?v=1744298682',
  gellen:             'https://cdn.shopify.com/s/files/1/0738/5438/6485/files/1_2682797a-f0cc-468f-bdfa-a1cf92db2e20.jpg?v=1745978633',
  foreo:              'https://assets.foreo.com/files/static/2025-12/ecomm_ISSA-3-fuchsia_2.webp',
  honestCo:           'https://cdn.shopify.com/s/files/1/0647/6847/5320/files/H02FB222V4RES_FABL_8pt5oz_Refresh_PDP_001_Front_1x1_22ee1d6d-3d12-4d8d-b224-4aaed519c865.jpg?v=1776037472',
  nealsYard:          'https://cdn.shopify.com/s/files/1/0631/8918/8830/files/neals-yard-remedies-bodycare-bee-lovely-body-lotion-9-97-fl-oz-1184400123.jpg?v=1755190764',

  merleNormanPrimer:  'https://cdn.shopify.com/s/files/1/0592/4408/5440/products/primerplus.jpg?v=1633988641',
  merleNormanKnockout:'https://www.merlenorman.com/dw/image/v2/BDFN_PRD/on/demandware.static/-/Sites-master-catalog/default/dwb8bb1a6a/large/knockout-nudes_14109.jpg',
  t3Featherweight:    'https://t3micro.com/cdn/shop/files/Tool_on_White_B_Featherweight_Stylemax_White_Hair_Dryer.jpg?v=1764803327',
  t3CurlWrap:         'https://t3micro.com/cdn/shop/files/CURLWRAP-100_1.jpg?v=1759275117',
  lange:              'https://cdn.shopify.com/s/files/1/2204/1955/files/EVG_LETITANE1_BLUSH_2400X2400_SCRNSHOT_Firefly_Upscaler_2x_scale_a8bfc4d2-716c-4e05-acf8-4059a0022984.png?v=1771340991',
};

function matchImage(title) {
  const t = title.toLowerCase();

  // Check most-specific multi-word patterns first to avoid false matches
  if (t.includes('peppermint vitality'))          return IMAGE_URLS.ylPeppermintVitality;
  if (t.includes('breathe again'))                return IMAGE_URLS.ylBreatheAgain;
  if (t.includes('rosemary vitality'))            return IMAGE_URLS.ylRosemaryVitality;
  if (t.includes('clary sage'))                   return IMAGE_URLS.ylClarySage;
  if (t.includes('purification'))                 return IMAGE_URLS.ylPurification;
  if (t.includes('pura d') && t.includes('tea tree')) return IMAGE_URLS.puraTeaTre;
  if (t.includes('lagunamoon'))                   return IMAGE_URLS.lagunamoon;
  if (t.includes('mychelle'))                     return IMAGE_URLS.mychelle;
  if (t.includes('mad hippie'))                   return IMAGE_URLS.madHippie;
  if (t.includes('california baby'))              return IMAGE_URLS.californiaBaby;
  if (t.includes('aromatica') || t.includes('aromatia')) return IMAGE_URLS.aromatica;
  if (t.includes('mill creek'))                   return IMAGE_URLS.millCreek;
  if (t.includes('avalon'))                       return IMAGE_URLS.avalon;
  if (t.includes('rahua'))                        return IMAGE_URLS.rahua;
  if (t.includes("dr. bronner") && t.includes('lavender'))   return IMAGE_URLS.drbronnerLavender;
  if (t.includes("dr. bronner") && t.includes('peppermint')) return IMAGE_URLS.drbronnerPeppermint;
  if (t.includes("dr. bronner"))                  return IMAGE_URLS.drbronnerLavender;
  if (t.includes('dr. organic') && t.includes('calendula'))  return IMAGE_URLS.drOrganicCalendula;
  if (t.includes('acure'))                        return IMAGE_URLS.acure;

  // Young Living
  if (t.includes('young living')) {
    if (t.includes('cedarwood'))                  return IMAGE_URLS.ylCedarwood;
    if (t.includes('tea tree') || t.includes('melaleuca')) return IMAGE_URLS.ylTeaTre;
    if (t.includes('myrtle'))                     return IMAGE_URLS.ylMyrtle;
    if (t.includes('peppermint'))                 return IMAGE_URLS.ylPeppermint;
    if (t.includes('myrrh'))                      return IMAGE_URLS.ylMyrrh;
    if (t.includes('frankincense'))               return IMAGE_URLS.ylFrankincense;
    if (t.includes('citronella'))                 return IMAGE_URLS.ylCitronella;
    if (t.includes('thieves') && (t.includes('toothpaste') || t.includes('whitening'))) return IMAGE_URLS.ylThieves;
    if (t.includes('savvy minerals'))             return IMAGE_URLS.ylSavvy;
  }

  // Batch 3
  if (t.includes('heritage store') || (t.includes('castor oil') && !t.includes('essential oil'))) return IMAGE_URLS.heritage;
  if (t.includes('argentyn 23') && t.includes('nasal')) return IMAGE_URLS.argentyn; // same brand image
  if (t.includes('argentyn 23'))                  return IMAGE_URLS.argentyn;
  if (t.includes('andreas seed') || t.includes('black cumin')) return IMAGE_URLS.blackCumin;
  if (t.includes('primally pure') || (t.includes('lavender') && t.includes('deodorant'))) return IMAGE_URLS.pimallyPure;
  if (t.includes('brazi bronze'))                 return IMAGE_URLS.braziBronze;
  if (t.includes('sovereign silver'))             return IMAGE_URLS.sovereignSilver;
  if (t.includes('mia botanica') || t.includes('acacia heat')) return IMAGE_URLS.miaBotanica;
  if (t.includes('us organic') && t.includes('jojoba')) return IMAGE_URLS.usOrganic;
  if (t.includes("captain ron"))                  return IMAGE_URLS.captainRons;
  if (t.includes('gellen') || t.includes('time to shine nail')) return IMAGE_URLS.gellen;
  if (t.includes('foreo'))                        return IMAGE_URLS.foreo;
  if (t.includes('honest company'))               return IMAGE_URLS.honestCo;
  if (t.includes("neal's yard") || t.includes('bee lovely')) return IMAGE_URLS.nealsYard;

  // Batch 4
  if (t.includes('merle norman') && (t.includes('primer') || t.includes('spf'))) return IMAGE_URLS.merleNormanPrimer;
  if (t.includes('merle norman') && t.includes('knockout')) return IMAGE_URLS.merleNormanKnockout;
  if (t.includes('t3') && (t.includes('featherweight') || t.includes('stylemax'))) return IMAGE_URLS.t3Featherweight;
  if (t.includes('t3') && t.includes('curlwrap'))  return IMAGE_URLS.t3CurlWrap;
  if (t.includes("l'ange") || t.includes('le curl')) return IMAGE_URLS.lange;

  return null;
}

function getContentType(url) {
  const lower = url.toLowerCase();
  if (lower.includes('.webp')) return 'image/webp';
  if (lower.includes('.png'))  return 'image/png';
  return 'image/jpeg';
}

function getFilename(url) {
  const withoutQuery = url.split('?')[0];
  const parts = withoutQuery.split('/');
  return parts[parts.length - 1] || 'product-image.jpg';
}

async function downloadImage(url) {
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; OptimumU/1.0)',
      'Accept': 'image/*,*/*',
    },
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status} fetching ${url}`);
  const buffer = await resp.arrayBuffer();
  return Buffer.from(buffer);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Fetching all posts from Sanity...');

  const posts = await client.fetch(`
    *[_type == "post"] {
      _id,
      title,
      "hasImage": defined(coverImage)
    }
  `);

  console.log(`Found ${posts.length} posts\n`);

  let uploaded = 0;
  let skipped = 0;
  let noMatch = 0;
  let errors = 0;

  for (const post of posts) {
    if (post.hasImage) {
      console.log(`  [skip] Already has image: ${post.title.slice(0, 60)}`);
      skipped++;
      continue;
    }

    const imageUrl = matchImage(post.title);

    if (!imageUrl) {
      console.log(`  [no match] ${post.title.slice(0, 60)}`);
      noMatch++;
      continue;
    }

    try {
      console.log(`  [upload] ${post.title.slice(0, 60)}`);
      console.log(`           → ${imageUrl.slice(0, 80)}...`);

      const buffer = await downloadImage(imageUrl);
      const contentType = getContentType(imageUrl);
      const filename = getFilename(imageUrl);

      const asset = await client.assets.upload('image', buffer, {
        filename,
        contentType,
      });

      await client.patch(post._id)
        .set({
          coverImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
        .commit();

      console.log(`           ✓ uploaded as ${asset._id}`);
      uploaded++;

      // Small delay to be gentle on rate limits
      await sleep(300);
    } catch (err) {
      console.error(`  [error] ${post.title.slice(0, 60)}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\nDone. uploaded=${uploaded} skipped=${skipped} noMatch=${noMatch} errors=${errors}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
