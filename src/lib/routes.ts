import type { Lang, RouteKey } from '../i18n/ui';

const slugs: Record<RouteKey, string> = { home: '', services: 'services/', contact: 'contact/' };

/** Site-relative path for a route in a language, e.g. ('services','hi') → '/hi/services/' */
export const pathFor = (key: RouteKey, lang: Lang) => (lang === 'hi' ? '/hi/' : '/') + slugs[key];

/** Link to a section on the home page in the given language. */
export const homeAnchor = (lang: Lang, id: string) => `${pathFor('home', lang)}#${id}`;
