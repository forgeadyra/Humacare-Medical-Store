import { business, SITE_URL, isPlaceholder } from '../data/business';
import type { Lang } from '../i18n/ui';

const abs = (path: string) => new URL(path, SITE_URL).href;
const orgId = abs('/#pharmacy');

/** Pharmacy (LocalBusiness subtype). aggregateRating only where reviews are visible on the page. */
export function pharmacySchema(opts: { lang: Lang; withRating?: boolean }) {
  const { lat, lng } = business.geo;
  const hasGeo = !isPlaceholder(lat) && !isPlaceholder(lng);

  return {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    '@id': orgId,
    name: business.name,
    alternateName: [business.alternateName, business.nameHi],
    description: business.tagline,
    url: abs(opts.lang === 'hi' ? '/hi/' : '/'),
    image: [abs('/og-image.png')],
    logo: abs('/icon-512.png'),
    telephone: business.phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.countryCode,
    },
    ...(hasGeo && {
      geo: { '@type': 'GeoCoordinates', latitude: Number(lat), longitude: Number(lng) },
    }),
    hasMap: business.links.maps,
    sameAs: [business.links.maps],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...business.hours.days],
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.phone.e164,
      contactType: 'customer service',
      availableLanguage: ['en', 'hi'],
    },
    ...(opts.withRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: business.rating.value,
        reviewCount: business.rating.count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

export function websiteSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    name: business.name,
    alternateName: business.nameHi,
    url: abs('/'),
    inLanguage: lang === 'hi' ? 'hi-IN' : 'en-IN',
    publisher: { '@id': orgId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

