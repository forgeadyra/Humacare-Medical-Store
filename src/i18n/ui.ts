import { business, hoursLabel, formatTime } from '../data/business';

export type Lang = 'en' | 'hi';
export const langs: Lang[] = ['en', 'hi'];

const b = business;
const closesEn = formatTime(b.hours.closes, 'en');
const opensEn = formatTime(b.hours.opens, 'en');
const closesHi = formatTime(b.hours.closes, 'hi');
const opensHi = formatTime(b.hours.opens, 'hi');

/** Route keys are language-neutral; see lib/routes.ts */
export type RouteKey = 'home' | 'services' | 'contact';

const en = {
  langName: 'English',
  switchTo: 'हिंदी',
  switchToLabel: 'हिंदी में देखें (View in Hindi)',
  skip: 'Skip to content',

  meta: {
    home: {
      title: `${b.name} – Pharmacy in Surya Nagar, Mathura | Open till ${closesEn}`,
      description: `Genuine medicines and honest advice at your local medical store on Govardhan Road, Amar Colony, Mathura. Open 7 days, ${hoursLabel('en')}. Rated ${b.rating.value}★ on Google. Call ${b.phone.display}.`,
    },
    services: {
      title: `Pharmacy Services in Mathura – Prescriptions, Supplies & Advice | ${b.name}`,
      description: `Prescription medicines, OTC & wellness, medical supplies, pharmacist advice and home delivery from ${b.name}, Surya Nagar, Mathura. Call or WhatsApp to check availability.`,
    },
    contact: {
      title: `Contact ${b.name}, Surya Nagar, Mathura | Call ${b.phone.display}`,
      description: `Call, WhatsApp or visit ${b.name} on Mathura – Govardhan Rd, Amar Colony. Open every day ${hoursLabel('en')}. Get directions, check medicine availability and more.`,
    },
  },

  nav: {
    home: 'Home',
    services: 'Services',
    reviews: 'Reviews',
    visit: 'Visit us',
    contact: 'Contact',
    callNow: 'Call Now',
    menu: 'Menu',
    primary: 'Primary',
  },

  badge: {
    openNow: 'Open now',
    closesAt: `Closes ${closesEn}`,
    closed: 'Closed',
    opensAt: `Opens ${opensEn}`,
    fallback: `Open daily · ${hoursLabel('en')}`,
  },

  cta: {
    call: `Call ${b.phone.display}`,
    callShort: 'Call',
    whatsapp: 'WhatsApp',
    directions: 'Get Directions',
    directionsShort: 'Directions',
  },

  hero: {
    eyebrow: 'Medical store · Mathura',
    h1: ['Genuine Medicines.', 'Honest Advice.', 'Right Here in Surya Nagar, Mathura.'],
    intro: `Your neighbourhood chemist on Govardhan Road, Amar Colony — open every day from ${hoursLabel('en')}. Call or WhatsApp to check if your medicine is in stock before you visit.`,
    ratingChip: `${b.rating.value} on Google`,
    ratingCount: `${b.rating.count} reviews`,
    ownerAlt: `The owner of ${b.name} at the counter`,
    ownerLabel: 'Meet the owner',
    ownerQuote: 'The shop owner having the good knowledge and experience of the medicines.',
    ownerQuoteBy: 'Siddharth Goyal, Google review',
    illoLabel: 'Illustration of the Humacare pharmacy counter with shelves of medicines',
  },

  trust: {
    heading: 'Why people in Surya Nagar trust us',
    rating: 'Google rating',
    days: 'Open 7 days',
    daysUnit: 'days a week',
    hours: 'Every day',
    genuine: 'Genuine medicines only',
    genuineSub: 'No compromises',
  },

  services: {
    eyebrow: 'What we offer',
    title: 'Everything your family needs from a medical store in Mathura',
    lede: 'From your monthly prescription to a late-evening fever, we are a short walk away on Govardhan Road. Call or WhatsApp to check availability.',
    more: 'See all services',
    confirm: 'Call to confirm area',
    items: [
      {
        key: 'rx',
        title: 'Prescription Medicines',
        desc: 'Bring your prescription, or WhatsApp a photo of it, and we will check availability before you make the trip.',
      },
      {
        key: 'otc',
        title: 'OTC & Wellness',
        desc: 'Everyday over-the-counter medicines and wellness essentials for the whole family.',
      },
      {
        key: 'supplies',
        title: 'Medical Supplies & Devices',
        desc: 'Healthcare supplies and home-care devices. Tell us what you need and we will check stock for you.',
      },
      {
        key: 'advice',
        title: 'Pharmacist Advice',
        desc: 'Honest guidance on how and when to take your medicines, from someone who knows them well.',
      },
      {
        key: 'delivery',
        title: 'Home Delivery',
        desc: 'Can’t come in? Call or WhatsApp to check whether we can deliver to your area.',
      },
    ],
  },

  why: {
    eyebrow: 'Why Humacare',
    title: 'What our customers say makes us different',
    lede: 'That is how Google sums up what our customers write. Here is what it means for you at the counter.',
    points: [
      {
        pill: 'Genuine medicine',
        title: 'Genuine medicines only',
        text: 'Every customer deserves the real thing. Ask anyone who has reviewed us — the word they use is “genuine”.',
      },
      {
        pill: 'Genuine rate',
        title: 'Fair, honest rates',
        text: 'Medicine is a need, not a luxury. Customers describe our rates as genuine: a fair price, every time.',
      },
      {
        pill: 'Genuine advice',
        title: 'An owner who knows — and cares',
        text: 'Customers praise the owner’s knowledge and experience of medicines, and the way people in need are always helped.',
      },
    ],
  },

  reviews: {
    eyebrow: 'Google reviews',
    title: `Rated ${b.rating.value} out of 5 by our neighbours`,
    lede: `Based on ${b.rating.count} reviews on Google. Read them all, or leave your own.`,
    readAll: 'Read all reviews on Google',
    pause: 'Pause scrolling reviews',
    play: 'Play scrolling reviews',
    source: 'Google review',
    outOf: 'out of 5',
    basedOn: `${b.rating.count} Google reviews`,
  },

  gallery: {
    eyebrow: 'Inside the store',
    title: 'Take a look around',
    lede: 'A clean, well-organised medical store on Mathura – Govardhan Road.',
    items: {
      storeFront: `Front of ${b.name} on Mathura – Govardhan Road, Surya Nagar`,
      counter: `The service counter at ${b.name}`,
      shelves: 'Neatly organised medicine shelves inside the store',
      interior1: 'Inside the pharmacy — wellness and healthcare products',
      interior2: 'Store interior with medical supplies on display',
    },
  },

  visit: {
    eyebrow: 'Visit us',
    title: 'Find us on Govardhan Road, Amar Colony',
    lede: 'Easy to reach from Surya Nagar and across Mathura. Tap for directions, or call if you need help finding us.',
    address: 'Address',
    plusCode: 'Plus Code',
    hours: 'Opening hours',
    today: 'Today',
    phone: 'Phone',
    loadMap: 'Load interactive map',
    mapNote: 'Loads Google Maps',
    mapTitle: `Map showing ${b.name} in Surya Nagar, Mathura`,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions people ask us',
    items: [
      {
        q: 'What are your opening hours?',
        a: `We are open every day, Monday to Sunday, from ${hoursLabel('en')}. That includes Sundays and late evenings — useful when you need a medicine after work.`,
      },
      {
        q: 'Where exactly is the store?',
        a: `${b.address.full}. Our Google Plus Code is ${b.plusCode}. Tap “Get Directions” to open the route in Google Maps.`,
      },
      {
        q: 'Do you offer home delivery?',
        a: `Please call or WhatsApp us on ${b.phone.display} to check whether we can deliver to your area.`,
      },
      {
        q: 'Are your medicines genuine?',
        a: 'Yes. We sell genuine medicines only — it is the thing our customers mention most in their Google reviews.',
      },
      {
        q: 'How can I check if a medicine is available?',
        a: `Call or WhatsApp us on ${b.phone.display} with the medicine name, or send a clear photo of your prescription on WhatsApp. We will tell you before you make the trip.`,
      },
      {
        q: 'Is there parking near the store?',
        // TODO(owner): confirm parking details and replace this answer.
        a: 'Please give us a call before you come and we will guide you to the most convenient place to stop nearby.',
      },
    ],
  },

  footer: {
    about: `Your trusted medical store in Mathura for genuine medicines and honest advice. Open every day, ${hoursLabel('en')}.`,
    quick: 'Quick links',
    reach: 'Reach us',
    hours: 'Hours',
    everyday: 'Monday – Sunday',
    licence: 'Drug Licence No.',
    disclaimer:
      'Medicines are dispensed against a valid prescription where required. Information on this site is not medical advice — consult a doctor.',
    rights: 'All rights reserved.',
    madeBy: 'Website by',
  },

  mobileBar: { label: 'Quick contact' },

  breadcrumbs: { home: 'Home', services: 'Services', contact: 'Contact' },

  servicesPage: {
    eyebrow: 'Our services',
    h1: 'Pharmacy services in Surya Nagar, Mathura',
    intro: `${b.name} is a neighbourhood chemist on Mathura – Govardhan Road. Here is everything we can help you with — and the quickest way to check availability is always a call or a WhatsApp message.`,
    howTitle: 'How it works',
    ctaTitle: 'Need a medicine today?',
    ctaText: `Call or WhatsApp ${b.phone.display}. We are open every day, ${hoursLabel('en')}.`,
    sections: [
      {
        key: 'rx',
        title: 'Prescription medicines',
        body: [
          'Whether it is a one-time course or a medicine you take every month, bring your doctor’s prescription to the counter and we will dispense it properly, explaining the dose and timing.',
          'Medicines that require a prescription are only dispensed against a valid prescription. We do not sell prescription medicines online.',
        ],
        steps: [
          'WhatsApp a clear photo of your prescription, or call us.',
          'We confirm availability and let you know.',
          'Visit the store with your prescription to collect.',
        ],
      },
      {
        key: 'otc',
        title: 'OTC & wellness',
        body: [
          'For everyday needs that don’t need a prescription, we keep over-the-counter medicines and wellness essentials for adults, children and elders.',
          'Not sure which product is right? Ask at the counter — we will help you choose sensibly, and tell you honestly when it is time to see a doctor.',
        ],
        steps: ['Tell us what you need.', 'Get honest guidance on the right option.', 'Pick up in store.'],
      },
      {
        key: 'supplies',
        title: 'Medical supplies & devices',
        body: [
          'We stock healthcare and medical supplies for home care and first aid, as well as everyday health devices.',
          'Stock changes often, so the fastest way to check is to call or WhatsApp with the item name.',
        ],
        steps: ['Call or WhatsApp with the item you need.', 'We check stock for you.', 'Collect it from the store.'],
      },
      {
        key: 'advice',
        title: 'Pharmacist advice',
        body: [
          'Customers tell us they value the owner’s knowledge and experience of medicines. Ask how to take a medicine, what to avoid with it, or how to store it.',
          'Our advice is about using medicines correctly. It is not a replacement for a doctor — for diagnosis and treatment, always consult a qualified doctor.',
        ],
        steps: ['Ask at the counter or over the phone.', 'Get clear, honest answers.', 'Know when to see a doctor.'],
      },
      {
        key: 'delivery',
        title: 'Home delivery',
        body: [
          'If you or a family member can’t come to the store, call or WhatsApp us to check whether we can deliver to your area.',
          'Delivery area and timings are confirmed on the phone. Prescription medicines still require a valid prescription.',
        ],
        steps: ['Call or WhatsApp to confirm your area.', 'Share your list or prescription.', 'We arrange delivery if possible.'],
      },
    ],
  },

  contactPage: {
    eyebrow: 'Contact',
    h1: `Contact ${b.name}`,
    intro: 'The fastest way to reach us is a phone call or WhatsApp message. You can also drop by — we are open every day.',
    callTitle: 'Call us',
    callText: 'Speak to us directly about a medicine or an order.',
    waTitle: 'WhatsApp',
    waText: 'Send a medicine name or a photo of your prescription.',
    visitTitle: 'Visit the store',
    hoursTitle: 'Opening hours',
    formTitle: 'Send us a message on WhatsApp',
    formIntro: 'Type your message below. It opens WhatsApp with your text ready to send — nothing is stored on this website.',
    nameLabel: 'Your name',
    namePlaceholder: 'e.g. Rahul',
    optional: '(optional)',
    msgLabel: 'Your message',
    msgPlaceholder: 'e.g. Do you have this medicine in stock?',
    submit: 'Open in WhatsApp',
    greeting: 'Hello, I am',
    required: 'Please type a message first.',
  },

  notFound: {
    h1: 'This page isn’t on our shelves',
    text: 'The page you are looking for has moved or does not exist. Head back home, or call us — we are happy to help.',
    home: 'Back to home',
  },
};

type Dict = typeof en;

const hi: Dict = {
  langName: 'हिंदी',
  switchTo: 'English',
  switchToLabel: 'View in English (अंग्रेज़ी में देखें)',
  skip: 'मुख्य सामग्री पर जाएँ',

  meta: {
    home: {
      title: `${b.nameHi} – सूर्या नगर, मथुरा में मेडिकल स्टोर`,
      description: `मथुरा के गोवर्धन रोड, अमर कॉलोनी में असली दवाइयाँ और सच्ची सलाह। हफ़्ते के सातों दिन ${hoursLabel('hi')} तक खुला। Google पर ${b.rating.value}★ रेटिंग। कॉल करें ${b.phone.display}।`,
    },
    services: {
      title: `दवाइयाँ, हेल्थकेयर सामान और सलाह – ${b.nameHi}, मथुरा`,
      description: `पर्चे की दवाइयाँ, रोज़मर्रा की दवाएँ, मेडिकल सामान, दवा से जुड़ी सलाह और होम डिलीवरी — ${b.nameHi}, सूर्या नगर, मथुरा। उपलब्धता के लिए कॉल या WhatsApp करें।`,
    },
    contact: {
      title: `संपर्क करें – ${b.nameHi}, सूर्या नगर, मथुरा`,
      description: `${b.nameHi} को कॉल करें, WhatsApp करें या दुकान पर आएँ — मथुरा–गोवर्धन रोड, अमर कॉलोनी। रोज़ ${hoursLabel('hi')} तक खुला।`,
    },
  },

  nav: {
    home: 'होम',
    services: 'सेवाएँ',
    reviews: 'रिव्यू',
    visit: 'पता',
    contact: 'संपर्क',
    callNow: 'कॉल करें',
    menu: 'मेन्यू',
    primary: 'मुख्य',
  },

  badge: {
    openNow: 'अभी खुला है',
    closesAt: `${closesHi} तक`,
    closed: 'अभी बंद है',
    opensAt: `${opensHi} खुलेगा`,
    fallback: `रोज़ खुला · ${hoursLabel('hi')}`,
  },

  cta: {
    call: `कॉल करें ${b.phone.display}`,
    callShort: 'कॉल',
    whatsapp: 'WhatsApp',
    directions: 'रास्ता देखें',
    directionsShort: 'रास्ता',
  },

  hero: {
    eyebrow: 'मेडिकल स्टोर · मथुरा',
    h1: ['असली दवाइयाँ।', 'सच्ची सलाह।', 'यहीं, सूर्या नगर, मथुरा में।'],
    intro: `गोवर्धन रोड, अमर कॉलोनी में आपका अपना मेडिकल स्टोर — हर दिन ${hoursLabel('hi')} तक खुला। आने से पहले कॉल या WhatsApp करके दवा की उपलब्धता पूछ लें।`,
    ratingChip: `Google पर ${b.rating.value}`,
    ratingCount: `${b.rating.count} रिव्यू`,
    ownerAlt: `${b.nameHi} के मालिक, काउंटर पर`,
    ownerLabel: 'मिलिए स्टोर के मालिक से',
    ownerQuote: 'The shop owner having the good knowledge and experience of the medicines.',
    ownerQuoteBy: 'Siddharth Goyal, Google रिव्यू',
    illoLabel: 'हुमाकेयर मेडिकल स्टोर के काउंटर और दवाइयों की अलमारियों का चित्र',
  },

  trust: {
    heading: 'सूर्या नगर के लोग हम पर भरोसा क्यों करते हैं',
    rating: 'Google रेटिंग',
    days: 'हफ़्ते के सातों दिन',
    daysUnit: 'दिन, हर हफ़्ते',
    hours: 'हर दिन',
    genuine: 'सिर्फ़ असली दवाइयाँ',
    genuineSub: 'कोई समझौता नहीं',
  },

  services: {
    eyebrow: 'हमारी सेवाएँ',
    title: 'परिवार की हर ज़रूरत के लिए मथुरा का भरोसेमंद मेडिकल स्टोर',
    lede: 'हर महीने की दवा हो या देर शाम का बुख़ार — हम गोवर्धन रोड पर आपके पास ही हैं। उपलब्धता जानने के लिए कॉल या WhatsApp करें।',
    more: 'सभी सेवाएँ देखें',
    confirm: 'इलाका कॉल करके पूछें',
    items: [
      {
        key: 'rx',
        title: 'पर्चे की दवाइयाँ',
        desc: 'डॉक्टर का पर्चा साथ लाएँ या उसकी फ़ोटो WhatsApp करें — आपके आने से पहले हम दवा की उपलब्धता बता देंगे।',
      },
      {
        key: 'otc',
        title: 'रोज़मर्रा की दवाएँ और वेलनेस',
        desc: 'पूरे परिवार के लिए बिना पर्चे वाली रोज़मर्रा की दवाएँ और ज़रूरी वेलनेस सामान।',
      },
      {
        key: 'supplies',
        title: 'मेडिकल सामान और उपकरण',
        desc: 'हेल्थकेयर सामान और घर पर काम आने वाले उपकरण। बताइए क्या चाहिए, हम स्टॉक देख लेंगे।',
      },
      {
        key: 'advice',
        title: 'दवा से जुड़ी सलाह',
        desc: 'दवा कैसे और कब लेनी है — इसकी ईमानदार जानकारी, ऐसे व्यक्ति से जो दवाइयों को अच्छी तरह जानते हैं।',
      },
      {
        key: 'delivery',
        title: 'होम डिलीवरी',
        desc: 'दुकान तक नहीं आ पा रहे? कॉल या WhatsApp करके पूछें कि आपके इलाके में डिलीवरी हो सकती है या नहीं।',
      },
    ],
  },

  why: {
    eyebrow: 'हुमाकेयर ही क्यों',
    title: 'ग्राहक बताते हैं कि हम अलग क्यों हैं',
    lede: 'Google हमारे ग्राहकों के रिव्यू को इसी एक लाइन में बताता है — यानी सही दाम, असली दवा और सच्ची सलाह। काउंटर पर आपके लिए इसका मतलब:',
    points: [
      {
        pill: 'Genuine medicine',
        title: 'सिर्फ़ असली दवाइयाँ',
        text: 'हर ग्राहक को असली दवा मिलनी चाहिए। हमारे रिव्यू पढ़ें — ग्राहक एक ही शब्द लिखते हैं: “genuine”, यानी असली।',
      },
      {
        pill: 'Genuine rate',
        title: 'सही और ईमानदार दाम',
        text: 'दवा ज़रूरत है, शौक नहीं। ग्राहक हमारे दामों को “genuine” कहते हैं — हर बार सही दाम।',
      },
      {
        pill: 'Genuine advice',
        title: 'जानकार मालिक, जो परवाह करते हैं',
        text: 'ग्राहक मालिक की दवाइयों की जानकारी और अनुभव की तारीफ़ करते हैं — और ज़रूरतमंद की मदद यहाँ हमेशा होती है।',
      },
    ],
  },

  reviews: {
    eyebrow: 'Google रिव्यू',
    title: `पड़ोसियों ने दी ${b.rating.value}/5 की रेटिंग`,
    lede: `Google पर ${b.rating.count} रिव्यू के आधार पर। सभी रिव्यू पढ़ें या अपना रिव्यू लिखें।`,
    readAll: 'Google पर सभी रिव्यू पढ़ें',
    pause: 'रिव्यू की स्क्रॉलिंग रोकें',
    play: 'रिव्यू की स्क्रॉलिंग चलाएँ',
    source: 'Google रिव्यू',
    outOf: '5 में से',
    basedOn: `${b.rating.count} Google रिव्यू`,
  },

  gallery: {
    eyebrow: 'दुकान के अंदर',
    title: 'एक झलक हमारे स्टोर की',
    lede: 'मथुरा–गोवर्धन रोड पर साफ़-सुथरा और व्यवस्थित मेडिकल स्टोर।',
    items: {
      storeFront: `मथुरा–गोवर्धन रोड, सूर्या नगर पर ${b.nameHi} का सामने का हिस्सा`,
      counter: `${b.nameHi} का काउंटर`,
      shelves: 'स्टोर के अंदर व्यवस्थित दवाइयों की अलमारियाँ',
      interior1: 'स्टोर के अंदर — वेलनेस और हेल्थकेयर सामान',
      interior2: 'मेडिकल सामान के साथ स्टोर का अंदरूनी हिस्सा',
    },
  },

  visit: {
    eyebrow: 'हमसे मिलें',
    title: 'गोवर्धन रोड, अमर कॉलोनी में हमें ढूँढें',
    lede: 'सूर्या नगर और पूरे मथुरा से आसानी से पहुँचें। रास्ते के लिए टैप करें, या दिक्कत हो तो कॉल कर लें।',
    address: 'पता',
    plusCode: 'प्लस कोड',
    hours: 'खुलने का समय',
    today: 'आज',
    phone: 'फ़ोन',
    loadMap: 'इंटरैक्टिव मैप खोलें',
    mapNote: 'Google Maps लोड होगा',
    mapTitle: `सूर्या नगर, मथुरा में ${b.nameHi} का मैप`,
    days: ['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार', 'रविवार'],
  },

  faq: {
    eyebrow: 'सवाल-जवाब',
    title: 'लोग अक्सर क्या पूछते हैं',
    items: [
      {
        q: 'दुकान कब खुलती है?',
        a: `हम हर दिन, सोमवार से रविवार, ${hoursLabel('hi')} तक खुले रहते हैं। रविवार और देर शाम भी — ताकि काम के बाद भी दवा मिल सके।`,
      },
      {
        q: 'स्टोर ठीक-ठीक कहाँ है?',
        a: `${b.address.full}। हमारा Google प्लस कोड ${b.plusCode} है। Google Maps में रास्ता देखने के लिए “रास्ता देखें” पर टैप करें।`,
      },
      {
        q: 'क्या होम डिलीवरी मिलती है?',
        a: `कृपया ${b.phone.display} पर कॉल या WhatsApp करके पूछ लें कि आपके इलाके में डिलीवरी हो सकती है या नहीं।`,
      },
      {
        q: 'क्या आपकी दवाइयाँ असली हैं?',
        a: 'हाँ। हम सिर्फ़ असली दवाइयाँ बेचते हैं — हमारे Google रिव्यू में ग्राहक सबसे ज़्यादा यही बात लिखते हैं।',
      },
      {
        q: 'दवा उपलब्ध है या नहीं, कैसे पता करें?',
        a: `${b.phone.display} पर दवा का नाम बताकर कॉल या WhatsApp करें, या पर्चे की साफ़ फ़ोटो WhatsApp पर भेजें। आपके आने से पहले हम बता देंगे।`,
      },
      {
        q: 'क्या दुकान के पास पार्किंग है?',
        // TODO(owner): confirm parking details and replace this answer.
        a: 'आने से पहले एक बार कॉल कर लें — हम आपको पास में रुकने की सबसे सुविधाजनक जगह बता देंगे।',
      },
    ],
  },

  footer: {
    about: `असली दवाइयों और सच्ची सलाह के लिए मथुरा का भरोसेमंद मेडिकल स्टोर। हर दिन ${hoursLabel('hi')} तक खुला।`,
    quick: 'लिंक',
    reach: 'संपर्क',
    hours: 'समय',
    everyday: 'सोमवार – रविवार',
    licence: 'ड्रग लाइसेंस नं.',
    disclaimer:
      'जहाँ ज़रूरी है, दवाइयाँ केवल वैध पर्चे पर ही दी जाती हैं। इस वेबसाइट की जानकारी चिकित्सीय सलाह नहीं है — कृपया डॉक्टर से परामर्श करें।',
    rights: 'सर्वाधिकार सुरक्षित।',
    madeBy: 'वेबसाइट',
  },

  mobileBar: { label: 'तुरंत संपर्क' },

  breadcrumbs: { home: 'होम', services: 'सेवाएँ', contact: 'संपर्क' },

  servicesPage: {
    eyebrow: 'हमारी सेवाएँ',
    h1: 'सूर्या नगर, मथुरा में मेडिकल स्टोर की सेवाएँ',
    intro: `${b.nameHi} मथुरा–गोवर्धन रोड पर आपके मोहल्ले का मेडिकल स्टोर है। नीचे देखें हम किन-किन चीज़ों में मदद कर सकते हैं — और उपलब्धता जानने का सबसे आसान तरीका है एक कॉल या WhatsApp।`,
    howTitle: 'कैसे काम करता है',
    ctaTitle: 'आज ही दवा चाहिए?',
    ctaText: `${b.phone.display} पर कॉल या WhatsApp करें। हम हर दिन ${hoursLabel('hi')} तक खुले हैं।`,
    sections: [
      {
        key: 'rx',
        title: 'पर्चे की दवाइयाँ',
        body: [
          'एक बार का कोर्स हो या हर महीने की दवा — डॉक्टर का पर्चा काउंटर पर लाएँ, हम दवा सही तरीके से देंगे और खुराक व समय भी समझाएँगे।',
          'जिन दवाइयों के लिए पर्चा ज़रूरी है, वे केवल वैध पर्चे पर ही दी जाती हैं। हम पर्चे वाली दवाइयाँ ऑनलाइन नहीं बेचते।',
        ],
        steps: [
          'पर्चे की साफ़ फ़ोटो WhatsApp करें या कॉल करें।',
          'हम उपलब्धता देखकर आपको बताते हैं।',
          'पर्चा लेकर स्टोर से दवा ले जाएँ।',
        ],
      },
      {
        key: 'otc',
        title: 'रोज़मर्रा की दवाएँ और वेलनेस',
        body: [
          'जिन ज़रूरतों के लिए पर्चा नहीं चाहिए, उनके लिए हमारे पास बड़ों, बच्चों और बुज़ुर्गों के लिए रोज़मर्रा की दवाएँ और वेलनेस सामान है।',
          'समझ नहीं आ रहा कौन-सा लें? काउंटर पर पूछिए — हम समझदारी से चुनने में मदद करेंगे, और ईमानदारी से बताएँगे कि कब डॉक्टर को दिखाना ज़रूरी है।',
        ],
        steps: ['बताइए आपको क्या चाहिए।', 'सही विकल्प पर ईमानदार सलाह पाइए।', 'स्टोर से ले जाइए।'],
      },
      {
        key: 'supplies',
        title: 'मेडिकल सामान और उपकरण',
        body: [
          'घर पर देखभाल और फ़र्स्ट-एड के लिए हेल्थकेयर व मेडिकल सामान, साथ ही रोज़मर्रा के हेल्थ उपकरण हमारे यहाँ मिलते हैं।',
          'स्टॉक बदलता रहता है, इसलिए सामान का नाम बताकर कॉल या WhatsApp करना सबसे तेज़ तरीका है।',
        ],
        steps: ['सामान का नाम बताकर कॉल या WhatsApp करें।', 'हम स्टॉक देख लेते हैं।', 'स्टोर से ले जाएँ।'],
      },
      {
        key: 'advice',
        title: 'दवा से जुड़ी सलाह',
        body: [
          'ग्राहक बताते हैं कि उन्हें मालिक की दवाइयों की जानकारी और अनुभव पर भरोसा है। दवा कैसे लें, किसके साथ न लें, या कैसे रखें — सब पूछिए।',
          'हमारी सलाह दवाइयों के सही इस्तेमाल के बारे में है। यह डॉक्टर की जगह नहीं ले सकती — जाँच और इलाज के लिए हमेशा योग्य डॉक्टर से मिलें।',
        ],
        steps: ['काउंटर पर या फ़ोन पर पूछें।', 'साफ़ और ईमानदार जवाब पाएँ।', 'जानें कब डॉक्टर से मिलना है।'],
      },
      {
        key: 'delivery',
        title: 'होम डिलीवरी',
        body: [
          'अगर आप या परिवार का कोई सदस्य दुकान तक नहीं आ सकता, तो कॉल या WhatsApp करके पूछें कि आपके इलाके में डिलीवरी हो सकती है या नहीं।',
          'डिलीवरी का इलाका और समय फ़ोन पर तय होता है। पर्चे वाली दवाइयों के लिए वैध पर्चा फिर भी ज़रूरी है।',
        ],
        steps: ['अपना इलाका कॉल या WhatsApp पर पूछें।', 'अपनी लिस्ट या पर्चा भेजें।', 'संभव हो तो हम डिलीवरी करवाते हैं।'],
      },
    ],
  },

  contactPage: {
    eyebrow: 'संपर्क',
    h1: `${b.nameHi} से संपर्क करें`,
    intro: 'हम तक पहुँचने का सबसे तेज़ तरीका है फ़ोन या WhatsApp। आप दुकान पर भी आ सकते हैं — हम हर दिन खुले हैं।',
    callTitle: 'कॉल करें',
    callText: 'दवा या ऑर्डर के बारे में सीधे बात करें।',
    waTitle: 'WhatsApp',
    waText: 'दवा का नाम या पर्चे की फ़ोटो भेजें।',
    visitTitle: 'स्टोर पर आएँ',
    hoursTitle: 'खुलने का समय',
    formTitle: 'WhatsApp पर मैसेज भेजें',
    formIntro: 'नीचे अपना मैसेज लिखें। WhatsApp आपके मैसेज के साथ खुल जाएगा — इस वेबसाइट पर कुछ भी सेव नहीं होता।',
    nameLabel: 'आपका नाम',
    namePlaceholder: 'जैसे, राहुल',
    optional: '(वैकल्पिक)',
    msgLabel: 'आपका मैसेज',
    msgPlaceholder: 'जैसे, क्या यह दवा उपलब्ध है?',
    submit: 'WhatsApp में खोलें',
    greeting: 'नमस्ते, मैं',
    required: 'कृपया पहले मैसेज लिखें।',
  },

  notFound: {
    h1: 'यह पेज हमारी अलमारी में नहीं है',
    text: 'आप जो पेज ढूँढ रहे हैं वह हट गया है या मौजूद नहीं है। होम पर लौटें, या हमें कॉल करें — हम मदद करेंगे।',
    home: 'होम पर लौटें',
  },
};

export const ui: Record<Lang, Dict> = { en, hi };
export const t = (lang: Lang) => ui[lang];
