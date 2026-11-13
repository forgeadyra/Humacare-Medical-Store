import type { APIRoute } from 'astro';
import { langs, type RouteKey } from '../i18n/ui';
import { pathFor } from '../lib/routes';

const routes: RouteKey[] = ['home', 'services', 'contact'];
const hreflang = { en: 'en-IN', hi: 'hi-IN' } as const;

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const urls = routes.flatMap((key) =>
    langs.map((lang) => {
      const alts = [
        ...langs.map((l) => `<xhtml:link rel="alternate" hreflang="${hreflang[l]}" href="${abs(pathFor(key, l))}"/>`),
        `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(pathFor(key, 'en'))}"/>`,
      ];
      return `  <url>\n    <loc>${abs(pathFor(key, lang))}</loc>\n    ${alts.join('\n    ')}\n  </url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
