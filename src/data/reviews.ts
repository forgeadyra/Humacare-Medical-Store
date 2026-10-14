/**
 * REAL Google reviews — copied word for word from the Google Maps listing.
 * Never write, edit, "fix" or paraphrase a review. Emoji and grammar stay as posted.
 *
 * Individual star ratings are intentionally not stored — only the overall
 * 4.9 / 10-review figure in business.ts is shown.
 *
 * TODO(owner): the listing has 10 reviews. Copy the other 7 here EXACTLY as they
 * appear on Google Maps (text + reviewer name). Do not invent or polish any text.
 */
export interface Review {
  author: string;
  text: string;
  source: 'Google';
}

export const reviews: Review[] = [
  {
    author: 'Krishna Chaudhary',
    text: 'Shop owner provides best medicines and best part is helping for needy one. 🙏',
    source: 'Google',
  },
  {
    author: 'Anju Mishra',
    text: 'Provide solutions and best services always.',
    source: 'Google',
  },
  {
    author: 'Siddharth Goyal',
    text: 'The shop owner having the good knowledge and experience of the medicines.',
    source: 'Google',
  },
];
