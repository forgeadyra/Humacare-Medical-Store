/**
 * The only site-wide JavaScript. Progressive enhancement: every feature here
 * degrades to a working, readable page without JS.
 */
import { business, toMinutes } from '../data/business';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Store time in IST ---------- */
const DAY_INDEX: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

function storeNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: business.hours.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return { day: DAY_INDEX[get('weekday')] ?? 0, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function isOpenNow() {
  const { minutes } = storeNow();
  const open = toMinutes(business.hours.opens);
  const close = toMinutes(business.hours.closes);
  // Supports hours that pass midnight (e.g. 09:00–01:00) if the owner ever changes them.
  return close > open ? minutes >= open && minutes < close : minutes >= open || minutes < close;
}

function updateOpenBadges() {
  const open = isOpenNow();
  document.querySelectorAll<HTMLElement>('[data-open-badge]').forEach((el) => {
    el.dataset.state = open ? 'open' : 'closed';
    const status = el.querySelector('[data-status]');
    const next = el.querySelector('[data-next]');
    if (status) status.textContent = open ? el.dataset.openText! : el.dataset.closedText!;
    if (next) next.textContent = open ? el.dataset.closesText! : el.dataset.opensText!;
  });
  const { day } = storeNow();
  document.querySelectorAll<HTMLElement>('[data-day-row]').forEach((row) => {
    const isToday = Number(row.dataset.dayRow) === day;
    row.toggleAttribute('data-today', isToday);
    if (isToday) row.setAttribute('aria-current', 'date');
    else row.removeAttribute('aria-current');
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduceMotion()) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Count-up ---------- */
function initCountUp() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  const run = (el: HTMLElement) => {
    const to = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    if (reduceMotion()) return;
    const dur = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window) || reduceMotion()) return;
  els.forEach((el) => (el.textContent = (0).toFixed(Number(el.dataset.decimals ?? 0))));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          run(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.6 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Reviews marquee pause/play ---------- */
function initMarquee() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((root) => {
    const btn = root.querySelector<HTMLButtonElement>('[data-marquee-toggle]');
    if (!btn) return;
    btn.hidden = false;
    btn.addEventListener('click', () => {
      const paused = root.toggleAttribute('data-paused');
      btn.setAttribute('aria-pressed', String(paused));
      btn.setAttribute('aria-label', paused ? btn.dataset.playLabel! : btn.dataset.pauseLabel!);
    });
  });
}

/* ---------- Click-to-load Google Map ---------- */
function initMaps() {
  document.querySelectorAll<HTMLButtonElement>('[data-map-load]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest<HTMLElement>('[data-map]');
      if (!wrap) return;
      const iframe = document.createElement('iframe');
      iframe.src = business.links.mapsEmbed;
      iframe.title = btn.dataset.title ?? 'Map';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      iframe.className = 'absolute inset-0 h-full w-full border-0';
      wrap.appendChild(iframe);
      btn.remove();
      wrap.querySelector('[data-map-poster]')?.remove();
      iframe.focus();
    });
  });
}

/* ---------- Contact form → WhatsApp ---------- */
function initWhatsAppForms() {
  document.querySelectorAll<HTMLFormElement>('[data-wa-form]').forEach((form) => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') ?? '').trim();
      const msg = String(data.get('text') ?? '').trim();
      const msgField = form.querySelector<HTMLTextAreaElement>('textarea[name="text"]');
      if (!msg) {
        msgField?.setCustomValidity(form.dataset.required ?? 'Required');
        msgField?.reportValidity();
        return;
      }
      msgField?.setCustomValidity('');
      const text = name ? `${form.dataset.greeting} ${name}.\n${msg}` : msg;
      const url = `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');
    });
    form.querySelector('textarea')?.addEventListener('input', (e) => (e.target as HTMLTextAreaElement).setCustomValidity(''));
  });
}

export function initSite() {
  initReveal();
  updateOpenBadges();
  setInterval(updateOpenBadges, 60_000);
  initCountUp();
  initMarquee();
  initMaps();
  initWhatsAppForms();
}
