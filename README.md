# Humacare Medical Store — website

Bilingual (English / Hindi) static website for **Humacare Medical Store**, Surya Nagar, Mathura.
Built with **Astro** (static output, almost zero JS) + **Tailwind CSS v4**.

- English: `/` · Hindi: `/hi/`
- Pages: Home, Services, Contact (each in EN + HI), branded 404
- Live preview: https://humacare-medical-store.netlify.app

---

## Run, build, deploy

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static files to dist/
npm run preview    # serve the built site locally
```

**Netlify:** connect this repo — `netlify.toml` already sets `npm run build` → `dist`.
**Vercel:** import the repo, framework preset "Astro" (`vercel.json` included).
Any static host works: upload the `dist/` folder.

Regenerate the placeholder photos, icons and OG image (reads `src/data/business.ts`):

```bash
node scripts/generate-assets.mjs
```

---

## Where things live

| What | File |
|---|---|
| **All business data** (name, address, phone, hours, links, licence, geo) | `src/data/business.ts` |
| Google reviews (verbatim) | `src/data/reviews.ts` |
| All page copy, EN + HI | `src/i18n/ui.ts` |
| Design tokens (colours, shadows, radius) | `src/styles/global.css` (`@theme`) |
| JSON-LD (Pharmacy, WebSite, BreadcrumbList, FAQPage) | `src/lib/schema.ts` |
| Site-wide JS (open badge, reveal, count-up, map, form) | `src/lib/client.ts` |
| Photos | `src/assets/images/` |

Never hard-code the phone, address or hours anywhere else — every component reads `business.ts`.

---

## ⚠️ Placeholders the owner must provide

| # | Placeholder | Where to change |
|---|---|---|
| 1 | **Domain** `[DOMAIN_PLACEHOLDER]` — currently the Netlify URL | `SITE_URL` in `src/data/business.ts` |
| 2 | **Drug licence number** `[DL_NUMBER_PLACEHOLDER]` (shown in footer) | `drugLicence` in `src/data/business.ts` |
| 3 | **Latitude / longitude** `[LAT_PLACEHOLDER]`, `[LNG_PLACEHOLDER]` — copy from Google Maps, don't guess. `geo` is left out of the schema until set | `geo` in `src/data/business.ts` |
| 4 | **Owner photo** | `src/assets/images/owner.jpg` (portrait, ~640×800) |
| 5 | **Store photos** — store-front, counter, shelves, interior-1, interior-2 | `src/assets/images/*.jpg` (keep the same file names) |
| 6 | **OG / social share image** 1200×630 (current one is a generated placeholder) | `public/og-image.png` |
| 7 | **Remaining 7 Google reviews**, copied word for word with reviewer name | `src/data/reviews.ts` |
| 8 | **Opening hours** — confirm 7 AM – 11 PM daily | `hours` in `src/data/business.ts` (one value updates the whole site, badge and schema) |
| 9 | **Delivery area** — confirm; site currently says "call to confirm area" | `delivery` in `business.ts` + delivery copy in `src/i18n/ui.ts` |
| 10 | **Parking** FAQ answer — confirm | `faq` items in `src/i18n/ui.ts` (search `TODO(owner)`) |

Search the code for `TODO(owner)` to find every spot.

The photos currently in `src/assets/images/` are labelled placeholders — **replace them with real photos before launch**. Astro converts them to WebP automatically.

---

## What's built in

- **Live open/closed badge** computed in IST (`Asia/Kolkata`) from the configured hours; today's row is highlighted in the hours table.
- **Click-to-load Google Map** — the iframe only loads when tapped, so it doesn't hurt speed.
- **Contact form → WhatsApp** — no backend; opens WhatsApp with the typed message.
- **Mobile bottom action bar** — Call · WhatsApp · Directions.
- **SEO:** unique title/description per page and language, canonical, `hreflang` (en-IN, hi-IN, x-default), Open Graph + Twitter, `sitemap-index.xml` (both languages), `robots.txt`, Pharmacy / WebSite / BreadcrumbList / FAQPage JSON-LD. `aggregateRating` appears only on the home pages, where the reviews are visible.
- **Motion:** CSS only + a small IntersectionObserver; everything respects `prefers-reduced-motion`.
- **Compliance:** no online sale of prescription drugs; "Call or WhatsApp to check availability" only; medical disclaimer in the footer.

---

## Post-launch SEO checklist

- [ ] Add the website URL to the **Google Business Profile**.
- [ ] Verify the domain in **Google Search Console** and submit `https://<domain>/sitemap-index.xml`.
- [ ] Keep **NAP** (name, address, phone) identical on Justdial, IndiaMART and Facebook — copy it from `business.ts`.
- [ ] Ask happy customers for **Google reviews**.
- [ ] Post photos to the Business Profile regularly.

---

Website by **AdyraForge**.
