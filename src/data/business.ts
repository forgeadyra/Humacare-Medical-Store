/**
 * SINGLE SOURCE OF TRUTH for all business data.
 * Every component reads from this file. Never hard-code the phone number,
 * address, hours or links anywhere else.
 *
 * NAP (Name, Address, Phone) below must match the Google Business Profile
 * character for character.
 */

// TODO(owner): replace with the real domain before launch, e.g. 'https://humacaremedical.in'
// Also used by astro.config.mjs for canonical URLs and the sitemap.
export const SITE_URL = 'https://DOMAIN_PLACEHOLDER';

export const business = {
  name: 'Humacare Medical Store',
  nameHi: 'हुमाकेयर मेडिकल स्टोर',
  alternateName: 'Huma Care Pharmacy',
  category: 'Pharmacy / Chemist',

  /** Brand tagline, taken from Google's review summary for the listing. */
  tagline: 'Genuine rate, genuine medicine and genuine advice',

  address: {
    full: 'Mathura – Govardhan Rd, Amar Colony, Surya Nagar, Mathura Bangar, Mathura, Uttar Pradesh 281004, India',
    street: 'Mathura – Govardhan Rd, Amar Colony, Surya Nagar',
    locality: 'Mathura Bangar, Mathura',
    city: 'Mathura',
    region: 'Uttar Pradesh',
    postalCode: '281004',
    country: 'India',
    countryCode: 'IN',
  },
  plusCode: 'FJXR+J4 Mathura, Uttar Pradesh',

  phone: {
    e164: '+918171454540',
    international: '+91 81714 54540',
    display: '081714 54540',
  },

  whatsapp: {
    number: '918171454540',
    defaultMessage: {
      en: 'Hello, I want to check availability of a medicine',
      hi: 'नमस्ते, मुझे एक दवा की उपलब्धता जाननी है',
    },
  },

  /**
   * Opening hours — ONE config value for the whole site.
   * TODO(owner): confirm hours. 24h "HH:MM" format, store time zone is IST.
   */
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const,
    opens: '07:00',
    closes: '23:00',
    timeZone: 'Asia/Kolkata',
  },

  rating: {
    value: 4.9,
    count: 10,
    source: 'Google',
  },

  links: {
    maps: 'https://maps.app.goo.gl/NHdogSMQyyvnE7KXA',
    /** Embed used by the click-to-load map (no API key required). */
    mapsEmbed:
      'https://maps.google.com/maps?q=' +
      encodeURIComponent('Humacare Medical Store, FJXR+J4 Mathura, Uttar Pradesh') +
      '&z=17&output=embed',
  },

  // TODO(owner): Drug licence number, shown in the footer.
  drugLicence: '[DL_NUMBER_PLACEHOLDER]',

  // TODO(owner): exact store coordinates from Google Maps (right-click the pin → copy).
  // Do NOT guess. While these are placeholders, `geo` is left out of the JSON-LD.
  geo: {
    lat: '[LAT_PLACEHOLDER]',
    lng: '[LNG_PLACEHOLDER]',
  },

  // TODO(owner): confirm delivery area. Until confirmed, the site always says "call to confirm".
  delivery: {
    confirmed: false,
  },

  credit: { name: 'AdyraForge' },
} as const;

/* ---------- Derived helpers (keep logic here so components stay dumb) ---------- */

export const telHref = `tel:${business.phone.e164}`;

export function whatsappHref(lang: 'en' | 'hi' = 'en', message?: string) {
  const text = message ?? business.whatsapp.defaultMessage[lang];
  return `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

export const isPlaceholder = (v: string) => v.startsWith('[') && v.endsWith(']');

/** "07:00" → minutes after midnight */
export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Human time label, e.g. "11 PM" / "रात 11 बजे" */
export function formatTime(hhmm: string, lang: 'en' | 'hi' = 'en') {
  const [h, m] = hhmm.split(':').map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mins = m ? `:${String(m).padStart(2, '0')}` : '';
  if (lang === 'hi') {
    const part = h < 4 ? 'रात' : h < 12 ? 'सुबह' : h < 16 ? 'दोपहर' : h < 19 ? 'शाम' : 'रात';
    return `${part} ${h12}${mins} बजे`;
  }
  return `${h12}${mins} ${h < 12 ? 'AM' : 'PM'}`;
}

export const hoursLabel = (lang: 'en' | 'hi' = 'en') =>
  `${formatTime(business.hours.opens, lang)} – ${formatTime(business.hours.closes, lang)}`;
