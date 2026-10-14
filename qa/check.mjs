/**
 * Static QA over dist/: JSON-LD structure, NAP consistency, hreflang/canonical, and every link.
 * Usage: npm run build && node qa/check.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { business, SITE_URL } from '../src/data/business.ts';

const dist = 'dist';
const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p);
});
walk(dist);

let errors = 0;
const fail = (page, msg) => { errors++; console.log(`✗ ${page}: ${msg}`); };
const external = new Set();

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const is404 = page.includes('404');

  // one H1
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(page, `${h1} <h1> elements`);

  // canonical + hreflang
  if (!/<link rel="canonical" href="https:\/\//.test(html)) fail(page, 'missing canonical');
  if (!is404) for (const l of ['en-IN', 'hi-IN', 'x-default'])
    if (!html.includes(`hreflang="${l}"`)) fail(page, `missing hreflang ${l}`);

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  const types = [];
  for (const b of blocks) {
    let j;
    try { j = JSON.parse(b); } catch { fail(page, 'invalid JSON-LD'); continue; }
    types.push(j['@type']);
    if (j['@context'] !== 'https://schema.org') fail(page, 'bad @context');
    if (JSON.stringify(j).includes('PLACEHOLDER')) fail(page, `placeholder leaked into ${j['@type']} schema`);
    if (j['@type'] === 'Pharmacy') {
      for (const k of ['name', 'address', 'telephone', 'openingHoursSpecification', 'url', 'image', 'hasMap'])
        if (!j[k]) fail(page, `Pharmacy missing ${k}`);
      if (j.address.postalCode !== business.address.postalCode) fail(page, 'postalCode mismatch');
      const showsReviews = html.includes('id="reviews"');
      if (j.aggregateRating && !showsReviews) fail(page, 'aggregateRating without visible reviews');
      if (j.aggregateRating && (j.aggregateRating.ratingValue !== business.rating.value || j.aggregateRating.reviewCount !== business.rating.count))
        fail(page, 'aggregateRating mismatch');
    }
    if (j['@type'] === 'FAQPage') {
      for (const q of j.mainEntity) if (!html.includes(q.name.replace(/'/g, '&#39;')) && !html.includes(q.name)) fail(page, `FAQ "${q.name}" not visible`);
    }
    if (j['@type'] === 'BreadcrumbList') j.itemListElement.forEach((it, i) => it.position !== i + 1 && fail(page, 'breadcrumb order'));
  }
  if (!is404 && !types.includes('Pharmacy')) fail(page, 'no Pharmacy schema');

  // NAP consistency
  if (!html.includes(business.address.full)) fail(page, 'full address missing / differs');
  if (!html.includes(business.phone.display)) fail(page, 'display phone missing');

  // links
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('tel:')) { if (href !== `tel:${business.phone.e164}`) fail(page, `bad tel ${href}`); continue; }
    if (href.startsWith('https://wa.me/')) { if (!href.startsWith(`https://wa.me/${business.whatsapp.number}`)) fail(page, `bad wa ${href}`); external.add(href.split('?')[0]); continue; }
    if (/^https?:\/\//.test(href)) {
      if (href.startsWith(SITE_URL)) continue; // canonical/alternate — checked live
      if (!/fonts|schema\.org/.test(href)) external.add(href);
      continue;
    }
    if (href.startsWith('#') || href.startsWith('data:')) continue;
    const path = href.split('#')[0];
    const target = path.endsWith('/') ? join(dist, path, 'index.html') : join(dist, path);
    if (!existsSync(target)) fail(page, `broken internal link ${href}`);
    const anchor = href.split('#')[1];
    if (anchor && path.endsWith('/') && existsSync(target) && !readFileSync(target, 'utf8').includes(`id="${anchor}"`))
      fail(page, `missing anchor #${anchor} in ${path}`);
  }
}

// external links resolve
for (const url of external) {
  try {
    const r = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0' } });
    console.log(`${r.ok ? '✓' : '✗'} ${r.status} ${url}`);
    if (!r.ok) errors++;
  } catch (e) { fail('external', `${url} ${e.message}`); }
}

console.log(`\n${pages.length} pages checked, ${errors} error(s).`);
process.exit(errors ? 1 : 0);
