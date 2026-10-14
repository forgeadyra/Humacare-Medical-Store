/**
 * Visual QA: full-page screenshots at 390 / 768 / 1440.
 * Usage: node qa/shoot.mjs [baseUrl] [round] [paths...]
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4321';
const round = process.argv[3] ?? 'r1';
const all = { home: '/', hi: '/hi/', services: '/services/', contact: '/contact/', 'hi-services': '/hi/services/', 'hi-contact': '/hi/contact/', '404': '/404/' };
const keys = process.argv.slice(4).length ? process.argv.slice(4) : Object.keys(all);
const widths = [390, 768, 1440];
const dir = `qa/screenshots/${round}`;
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: w < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
    isMobile: w < 768,
    hasTouch: w < 768,
    timezoneId: 'Asia/Kolkata',
  });
  const page = await ctx.newPage();
  for (const key of keys) {
    const p = all[key];
    await page.goto(base + p, { waitUntil: 'networkidle' });
    // Trigger reveal-on-scroll + count-up, then return to top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 1500));
    });
    const over = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      return [...document.querySelectorAll('body *')]
        .filter((e) => { const r = e.getBoundingClientRect(); return r.right > vw + 0.5 && !e.closest('.marquee, [data-map]'); })
        .slice(0, 5).map((e) => `${e.tagName}.${String(e.className).slice(0, 50)} → ${Math.round(e.getBoundingClientRect().right)}`);
    });
    if (over.length) console.log(`  overflow @${w} ${key}:`, over);
    const name = (p.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home') + `-${w}.png`;
    await page.screenshot({ path: `${dir}/${name}`, fullPage: true });
    console.log('saved', name);
  }
  await ctx.close();
}
await browser.close();
