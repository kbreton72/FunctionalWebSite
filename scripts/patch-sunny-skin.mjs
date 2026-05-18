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

const IMAGE_URL = 'https://www.merlenorman.com/dw/image/v2/BDFN_PRD/on/demandware.static/-/Sites-master-catalog/default/dw5b698d26/large/powder-base-foundation_midtone_01082.jpg?sw=600&sh=600';

const posts = await client.fetch(`*[_type == "post"] { _id, title }`);
const post = posts.find(p => p.title.toLowerCase().includes('sunny skin'));

if (!post) {
  console.error('Post not found');
  process.exit(1);
}

console.log(`Found: "${post.title}" (${post._id})`);
console.log('Downloading image...');

const res = await fetch(IMAGE_URL);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const buffer = Buffer.from(await res.arrayBuffer());

console.log('Uploading to Sanity...');
const asset = await client.assets.upload('image', buffer, {
  filename: 'merle-norman-sunny-skin-powder.jpg',
  contentType: 'image/jpeg',
});

console.log(`Asset uploaded: ${asset._id}`);

await client.patch(post._id).set({
  coverImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
}).commit();

console.log('Done — cover image set.');
