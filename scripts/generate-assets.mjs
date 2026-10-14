/**
 * Generates PLACEHOLDER images, icons and the OG image.
 * Run: node scripts/generate-assets.mjs
 *
 * The photos in src/assets/images/ are placeholders — replace them with real
 * photos of the store using the SAME file names (see README).
 */
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { business, hoursLabel } from '../src/data/business.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => {
  const full = resolve(root, p);
  mkdirSync(dirname(full), { recursive: true });
  return full;
};

const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const cross = (cx, cy, s, fill) => {
  const a = s * 0.22,
    l = s / 2;
  return `<path d="M${cx - a} ${cy - l}h${2 * a}v${l - a}h${l - a}v${2 * a}h-${l - a}v${l - a}h-${2 * a}v-${l - a}h-${l - a}v-${2 * a}h${l - a}z" fill="${fill}"/>`;
};

/* ---------- placeholder photos ---------- */
const photos = [
  { file: 'owner.jpg', w: 640, h: 800, label: 'Owner photo', hue: ['#d9f1e8', '#9adbc5'] },
  { file: 'store-front.jpg', w: 1200, h: 900, label: 'Store front', hue: ['#e3f5ee', '#b5e3d2'] },
  { file: 'counter.jpg', w: 900, h: 1200, label: 'Counter', hue: ['#fff3dc', '#f6d495'] },
  { file: 'shelves.jpg', w: 1200, h: 800, label: 'Medicine shelves', hue: ['#e6f6f0', '#a9dfcb'] },
  { file: 'interior-1.jpg', w: 900, h: 1100, label: 'Interior 1', hue: ['#f1efe9', '#d8d0c0'] },
  { file: 'interior-2.jpg', w: 1200, h: 900, label: 'Interior 2', hue: ['#e9f6f2', '#bfe6d8'] },
];

for (const p of photos) {
  const s = Math.min(p.w, p.h);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${p.w}" height="${p.h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.hue[0]}"/><stop offset="1" stop-color="${p.hue[1]}"/></linearGradient>
    <pattern id="d" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="#0f766e" opacity=".08"/></pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#d)"/>
  <circle cx="${p.w / 2}" cy="${p.h / 2 - s * 0.06}" r="${s * 0.13}" fill="#fff" opacity=".75"/>
  ${cross(p.w / 2, p.h / 2 - s * 0.06, s * 0.12, '#0f766e')}
  <text x="50%" y="${p.h / 2 + s * 0.16}" text-anchor="middle" font-family="${FONT}" font-size="${s * 0.05}" font-weight="700" fill="#0b544e">${p.label}</text>
  <text x="50%" y="${p.h / 2 + s * 0.22}" text-anchor="middle" font-family="${FONT}" font-size="${s * 0.032}" fill="#0b544e" opacity=".7">Placeholder — replace with a real photo</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(out(`src/assets/images/${p.file}`));
}

/* ---------- logo mark / icons ---------- */
const mark = (size, { padding = 0, bg = true } = {}) => {
  const inner = size - padding * 2;
  const k = inner / 40;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14968b"/><stop offset="1" stop-color="#0b544e"/></linearGradient></defs>
  ${bg ? `<rect width="${size}" height="${size}" fill="#0f766e"/>` : ''}
  <g transform="translate(${padding} ${padding}) scale(${k})">
    <rect width="40" height="40" rx="${bg && padding ? 12 : 12}" fill="url(#lg)"/>
    <path d="M16.5 9.5h7v7h7v7h-7v7h-7v-7h-7v-7h7z" fill="#fff" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="31" cy="9" r="3.4" fill="#f8ac2c" stroke="#fbf8f3" stroke-width="2"/>
  </g>
</svg>`;
};

const faviconSvg = mark(40, { bg: false }).replace('width="40" height="40" ', '');
writeFileSync(out('public/favicon.svg'), faviconSvg);
await sharp(Buffer.from(mark(32, { bg: false }))).png().toFile(out('public/favicon-32.png'));
await sharp(Buffer.from(mark(180, { padding: 18 }))).png().toFile(out('public/apple-touch-icon.png'));
await sharp(Buffer.from(mark(192, { padding: 0, bg: false }))).png().toFile(out('public/icon-192.png'));
await sharp(Buffer.from(mark(512, { padding: 0, bg: false }))).png().toFile(out('public/icon-512.png'));
await sharp(Buffer.from(mark(512, { padding: 80 }))).png().toFile(out('public/icon-maskable-512.png'));

/* ---------- OG image 1200×630 (placeholder) ---------- */
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="a" cx="85%" cy="15%" r="70%"><stop offset="0" stop-color="#1aa192"/><stop offset="1" stop-color="#083d39"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#a)"/>
  <circle cx="1040" cy="150" r="220" fill="#fff" opacity=".05"/>
  <circle cx="1040" cy="150" r="140" fill="#fff" opacity=".06"/>
  <g transform="translate(940 50)">
    <rect width="200" height="200" rx="56" fill="#0f766e" stroke="#9adbc5" stroke-width="4"/>
    ${cross(100, 100, 120, '#fff')}
  </g>
  <g transform="translate(80 92)">
    <rect width="64" height="64" rx="18" fill="#fff"/>
    ${cross(32, 32, 34, '#0f766e')}
    <text x="88" y="44" font-family="${FONT}" font-size="34" font-weight="800" fill="#fff">Humacare</text>
  </g>
  <text x="80" y="290" font-family="${FONT}" font-size="66" font-weight="800" fill="#fff">${business.name}</text>
  <text x="80" y="352" font-family="${FONT}" font-size="34" font-weight="500" fill="#c3eadc">${business.tagline}</text>
  <text x="80" y="420" font-family="${FONT}" font-size="30" fill="#dff4ec">Surya Nagar, ${business.address.city} · Open daily ${hoursLabel('en')}</text>
  <g transform="translate(80 470)">
    <rect width="300" height="72" rx="36" fill="#f8ac2c"/>
    <text x="150" y="47" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="800" fill="#2b1700">${business.phone.display}</text>
    <rect x="320" width="290" height="72" rx="36" fill="#fff" fill-opacity=".1" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>
    <text x="465" y="47" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="700" fill="#fff">★ ${business.rating.value} on Google</text>
  </g>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(out('public/og-image.png'));

console.log('Assets generated.');
