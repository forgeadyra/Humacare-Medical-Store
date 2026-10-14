# BUILD: Humacare Medical Store — production website

You are a senior frontend engineer and designer building a real website for a real neighbourhood pharmacy that will be sold to its owner. It must be fast on cheap Android phones, rank in local Google search, and look clearly better than any other pharmacy site in Mathura. Work in phases, check your own work visually, and keep improving until it meets the quality bar at the end.

---

## 1. Business facts (use exactly — never invent anything beyond these)

| Field | Value |
|---|---|
| Name (English) | Humacare Medical Store |
| Name (Hindi) | हुमाकेयर मेडिकल स्टोर |
| Also known as | Huma Care Pharmacy |
| Category | Pharmacy / Chemist |
| Address | Mathura – Govardhan Rd, Amar Colony, Surya Nagar, Mathura Bangar, Mathura, Uttar Pradesh 281004, India |
| Plus Code | FJXR+J4 Mathura, Uttar Pradesh |
| Phone | +91 81714 54540 (display: 081714 54540) |
| WhatsApp | same number → `https://wa.me/918171454540` |
| Hours | Monday–Sunday, 7:00 AM – 11:00 PM (put in ONE config value — owner will confirm) |
| Google rating | 4.9 / 5 from 10 Google reviews |
| Google Maps link | https://maps.app.goo.gl/NHdogSMQyyvnE7KXA |
| Services | Genuine medicines, medical & healthcare supplies, honest pharmacist advice, delivery (owner to confirm area) |
| Drug licence no. | `[DL_NUMBER_PLACEHOLDER]` |
| Geo coordinates | `[LAT_PLACEHOLDER]`, `[LNG_PLACEHOLDER]` — leave as placeholders with a TODO comment; do NOT guess |

**Real Google reviews — use word for word, with attribution. Never write or change any review.**
1. "Shop owner provides best medicines and best part is helping for needy one. 🙏" — Krishna Chaudhary, Google review
2. "Provide solutions and best services always." — Anju Mishra, Google review
3. "The shop owner having the good knowledge and experience of the medicines." — Siddharth Goyal, Google review

Put the reviews in `src/data/reviews.ts` as an array with a `TODO` noting the other 7 reviews must be copied exactly from Google Maps. Add a "Read all reviews on Google" button that links to the Maps listing. The review-summary line from Google, "Genuine rate, genuine medicine and genuine advice", may be used as the brand tagline.

All business data goes in a single `src/data/business.ts` file. Every component reads from it. No phone number, address or hours may be hard-coded anywhere else.

---

## 2. Tech stack

- **Astro (latest), static output only.** Zero JS by default, which makes it the best choice for SEO and speed.
- **Tailwind CSS** for styling, with design tokens defined as CSS variables.
- **Animation:** CSS transitions/keyframes plus a small IntersectionObserver for reveal-on-scroll. You may add GSAP only for the hero, and only if the total JS stays under 60 KB gzipped. No heavy libraries such as Three.js, Lottie or particle libraries.
- **Images:** Astro `<Image>` with AVIF/WebP, explicit width/height, and lazy loading below the fold.
- **Fonts:** self-hosted using `font-display: swap`, at most 2 families. Use one for Latin (e.g. *Plus Jakarta Sans* or *Manrope*) and **Noto Sans Devanagari** or *Mukta* for Hindi. Preload only the hero weight.
- Deploy target: Netlify or Vercel, served as static files.

---

## 3. Bilingual

- English at `/`, Hindi at `/hi/`, with a language toggle in the header.
- Add `hreflang` tags (`en-IN`, `hi-IN`, `x-default`) on every page.
- Write natural Hindi, not a word-for-word translation. Keep brand names and the phone number identical across both languages.

---

## 4. Pages and sections

### Home (`/` and `/hi/`)
1. **Sticky header:** logo/wordmark, nav, language toggle, and a "Call Now" button that is always visible on mobile.
2. **Hero, the signature moment.** Use a full-bleed composition with a custom illustrated chemist/pharmacy scene made as inline SVG: a counter, shelves of bottles, a mortar and pestle, a medical cross. The parts animate on load: bottles slide onto the shelves, the cross pulses softly, and a capsule rotates slowly. Leave a slot for the owner's photo (`/images/owner.jpg` placeholder) shown in a framed card that floats next to the illustration.
   - H1 (English): "Genuine Medicines. Honest Advice. Right Here in Surya Nagar, Mathura."
   - H1 (Hindi): an equivalent in natural Hindi.
   - Sub-line: the tagline, with a live **"Open now · Closes 11 PM" / "Closed · Opens 7 AM"** badge calculated from the configured hours in the IST timezone.
   - CTAs: **Call 081714 54540** (`tel:`), **WhatsApp** (`wa.me` with a prefilled message such as "Hello, I want to check availability of a medicine"), and **Get Directions**.
   - A 4.9★ Google rating chip that links to the reviews.
3. **Trust strip:** an animated count-up for 4.9★ Google rating, Open 7 days, 7 AM – 11 PM, and Genuine medicines only. Don't make up figures like "10,000 customers".
4. **Services:** cards for Prescription Medicines, OTC & Wellness, Medical Supplies & Devices, Pharmacist Advice, and Home Delivery (mark it "call to confirm area"). Each card gets a custom line icon and a micro-interaction on hover/tap.
5. **Why Humacare:** three points drawn from what the reviews actually say: genuine products, fair rates, and a knowledgeable owner who helps people in need.
6. **Google reviews:** an auto-scrolling carousel (pausable, with reduced motion respected) showing the real reviews in Google-style cards, plus the "Read all on Google" button. Don't use stock photos as reviewer avatars; use initial avatars.
7. **Gallery:** a masonry grid of placeholder images (`/images/store-front.jpg`, `counter.jpg`, `shelves.jpg`, `interior-1.jpg`, `interior-2.jpg`), each with descriptive alt text. Add a README note that these must be replaced with real photos.
8. **Visit us / Map:** a Google Maps embed iframe, lazy-loaded behind a click-to-load poster image so it doesn't hurt page speed. Show the address, the Plus Code, the hours table with today's row highlighted, and buttons for "Get Directions" (Maps link) and "Call".
9. **FAQ:** an accordion that also outputs FAQPage schema. Questions: timings, location, delivery, whether medicines are genuine, how to check availability, and whether there's parking (owner to confirm).
10. **Footer:** NAP (name, address, phone) exactly matching the Google Business Profile, the drug licence placeholder, quick links, a medical disclaimer, and "Website by AdyraForge".

### Additional pages
- `/contact/` (+ Hindi): a full contact page with the map, all contact methods, and a simple form that opens WhatsApp with the message text. No backend.
- `/services/` (+ Hindi): a section for each service with more detail, which adds indexable content.
- `/404`: a branded page with Call and Home buttons.

### Mobile
- A fixed bottom action bar with **Call · WhatsApp · Directions**. This is the main way people will convert, so it must look excellent.

---

## 5. Design direction

- **Mood:** clean, clinical-but-warm, trustworthy, local. It should feel like a modern Indian pharmacy brand, not a hospital template and not a generic SaaS page.
- **Palette** (tokens): a deep medical green (`#0F766E` range) as primary, a warm off-white background, a soft mint accent, and a small touch of saffron/amber for CTAs and the open badge. Text contrast must meet WCAG AA.
- Use generous whitespace and rounded 16–24px cards with soft layered shadows. Add a subtle grain or soft gradient mesh in the hero.
- **Motion rules:** 200–600ms, ease-out, purposeful. Reveal-on-scroll uses fade plus a 16px rise, staggered. Wrap all motion in `prefers-reduced-motion`. Animate only transform and opacity, never layout properties.
- Avoid: stock photos of smiling doctors, purple gradients, and emoji used as icons.

---

## 6. SEO (non-negotiable)

- A unique `<title>` and meta description per page and per language, built around local intent. Examples:
  - "Humacare Medical Store – Pharmacy in Surya Nagar, Mathura | Open till 11 PM"
  - Hindi: "हुमाकेयर मेडिकल स्टोर – सूर्या नगर, मथुरा में मेडिकल स्टोर"
- Target keywords should appear naturally in headings and body text, never stuffed: medical store in Mathura, pharmacy near Govardhan Road, chemist Surya Nagar Mathura, medical store Amar Colony, मेडिकल स्टोर मथुरा, late night pharmacy Mathura.
- **JSON-LD:** `Pharmacy` (a subtype of LocalBusiness) with name, alternateName, address (PostalAddress), telephone, openingHoursSpecification, geo (placeholders), url, image, `hasMap`, `sameAs` → the Maps URL, and `aggregateRating` (4.9, 10). Only include aggregateRating if the reviews are visibly shown on the same page. Also add `WebSite`, `BreadcrumbList` on inner pages, and `FAQPage`.
- Open Graph and Twitter cards with a 1200×630 OG image placeholder.
- `sitemap.xml` (`@astrojs/sitemap`, both languages), `robots.txt`, and a canonical URL on every page. The site URL goes in config as `https://[DOMAIN_PLACEHOLDER]`.
- Semantic HTML: one H1 per page, a logical heading order, `<address>`, landmarks, and descriptive alt text.
- NAP must be identical, character for character, everywhere it appears.
- Add `favicon.svg`, `apple-touch-icon`, and `site.webmanifest` with the theme colour.

---

## 7. Performance and accessibility targets

- Lighthouse mobile: **Performance ≥ 90, SEO 100, Accessibility ≥ 95, Best Practices ≥ 95**.
- LCP under 2.5s on simulated slow 4G, CLS under 0.05, total JS under 60 KB gzipped.
- Keyboard navigable with visible focus rings. Tap targets of at least 44px. Use ARIA only where native HTML can't do the job.

---

## 8. Compliance

- Don't offer online sale or ordering of prescription drugs. Use only "Call or WhatsApp to check availability."
- Make no health claims, cure claims or brand-name drug promotions.
- Add this footer disclaimer: "Medicines are dispensed against a valid prescription where required. Information on this site is not medical advice — consult a doctor."

---

## 9. Process: work in this order

1. Scaffold Astro + Tailwind, `business.ts`, `reviews.ts`, design tokens and the layout with SEO head. Commit.
2. Build the home page section by section, in English first.
3. Add the Hindi version and hreflang.
4. Build the Services, Contact and 404 pages.
5. Add schema, sitemap, robots and OG.
6. **Visual self-review loop:** install Playwright, run the dev server, and take full-page screenshots at 390px, 768px and 1440px. Look at each one critically as a demanding design director would. Check alignment, spacing rhythm, type hierarchy, contrast, empty-looking areas, and anything that looks templated. List the issues, fix them, and take new screenshots. Repeat for at least 3 rounds, until you honestly have nothing left to improve.
7. Run Lighthouse (CLI) on mobile, fix everything below target, and run it again.
8. Validate the JSON-LD against schema.org rules and check every link, including `tel:`, `wa.me` and Maps.
9. Write a `README.md` covering: how to run/build/deploy, **every placeholder to replace** (images, DL number, lat/lng, domain, OG image, the remaining reviews, hours and delivery confirmation), and a post-launch SEO checklist:
   - Add the website URL to the Google Business Profile.
   - Verify the domain in Google Search Console and submit the sitemap.
   - Keep NAP identical on Justdial, IndiaMART and Facebook.
   - Ask happy customers for Google reviews.
   - Post photos to the Business Profile regularly.

## 10. Definition of done
- [ ] No invented reviews, numbers, names or facts anywhere.
- [ ] All business data comes from one config file.
- [ ] Bilingual EN/HI with hreflang.
- [ ] The live open/closed badge is correct in IST.
- [ ] The map is lazy-loaded, and the directions/call/WhatsApp buttons work.
- [ ] Lighthouse targets are met on mobile.
- [ ] Schema validates.
- [ ] The README lists every placeholder.
- [ ] It looks like a premium local brand on a 390px phone, because that's where 90% of visitors will see it.

When finished, summarise what you built, the Lighthouse scores, and the list of placeholders the owner must provide.
