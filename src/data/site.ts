// All visible content for the Mi Pueblito site.
// Client SEO copy (h1, h2, section bodies, reviews) is word for word from the client brief.
// Assumptions to confirm with the client (also listed in DESIGN.md):
// - Production URL is the current domain mipueblitomedfordnj.com.
// - Catering, party and job buttons open an email with a subject; Reservations calls the restaurant (links TBD).
// - Dish categories in the order index follow the old site's menu groups.
// - Hero video: no file provided yet; the overhead fajitas photo stands in (heroVideo is empty).
// - Work with Us body was written for this site (the client's draft repeated the Reservations copy).

import heroFajitas from '../assets/photos/hero-fajitas.jpg';
import roomPlantWall from '../assets/photos/room-plant-wall.jpg';
import moleOverhead from '../assets/photos/mole-overhead.jpg';
import cateringSpread from '../assets/photos/catering-spread.jpg';
import roomWindow from '../assets/photos/room-window-tables.jpg';
import exteriorPatio from '../assets/photos/exterior-patio.jpg';
import birria from '../assets/photos/birria.jpg';
import cemita from '../assets/photos/cemita.jpg';
import fajitasClose from '../assets/photos/fajitas-close.jpg';
import mole from '../assets/photos/mole.jpg';
import paella from '../assets/photos/paella.jpg';
import fishTacos from '../assets/photos/fish-tacos.jpg';
import wetBurrito from '../assets/photos/wet-burrito.jpg';
import tresLeches from '../assets/photos/tres-leches.jpg';
import churro from '../assets/photos/churro-sundae.jpg';
import sign from '../assets/photos/sign.jpg';
import roomDining from '../assets/photos/room-dining.jpg';
import team from '../assets/photos/team.jpg';
import paellaOverhead from '../assets/photos/paella-overhead.jpg';
import chipsBeans from '../assets/photos/chips-beans.jpg';
import roomKitchen from '../assets/photos/room-kitchen.jpg';
import staffThree from '../assets/photos/staff-three.jpg';
import exteriorFront from '../assets/photos/exterior-front.jpg';
import birriaOverhead from '../assets/photos/birria-overhead.jpg';

// Internal links go through `url()` so the site also works under a sub-path (GitHub Pages preview at /Mi-Pueblito/).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (p: string) => `${BASE}${p}`;

const EMAIL = 'mi.pueblito.official@gmail.com';
const mail = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

export const site = {
  name: 'Mi Pueblito',
  fullName: 'Mi Pueblito Modern Mexican Restaurant',
  url: 'https://www.mipueblitomedfordnj.com',
  description:
    'Family-owned modern Mexican restaurant in Ironstone Village, Medford NJ. Birria tacos, mole poblano and fajitas, BYOB, outdoor seating, open daily.',
  phone: '(856) 885-2638',
  phoneHref: 'tel:+18568852638',
  email: EMAIL,
  address: { street: '560 Stokes Rd Ste 10B', area: 'Ironstone Village', city: 'Medford', region: 'NJ', zip: '08055' },
  hours: { label: 'Open daily', time: '11:00 am to 9:30 pm', schema: 'Mo-Su 11:00-21:30' },
  directions: 'https://www.google.com/maps/search/?api=1&query=Mi+Pueblito+560+Stokes+Rd+Medford+NJ',
  menu: 'https://www.mipueblitomedfordnj.com/menu',
  giftCards: 'https://www.mipueblitomedfordnj.com/gift-card',
  order: {
    doordash: 'https://www.doordash.com/store/mi-pueblito-modern-mexican-restaurant-medford-25767058/?pickup=true',
    tabit: 'https://tabit.us/tabit-order?site=654699255ca03620ebd68e07&step=enter',
  },
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/mi.pueblito.official/' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100091529374451' },
  ],
  links: {
    catering: mail('Catering inquiry'),
    party: mail('Private party inquiry'),
    jobs: mail('Joining the team'),
  },
  heroVideo: '', // landscape video from the client goes here (muted, playsinline, poster = hero image)
};

export const nav = [
  { label: 'Menu', href: site.menu, external: true },
  { label: 'Order', href: url('/#order') },
  { label: 'Catering & parties', href: url('/#gather') },
  { label: 'Visit', href: url('/visit/') },
];

export const hero = {
  h1: 'Mi Pueblito - Mexican Restaurant in Medford',
  h2a: 'Where tradition',
  h2b: 'gets a fresh perspective',
  image: heroFajitas,
  alt: 'Fajitas Mi Pueblito sizzling in a cast iron skillet on a striped serape runner, seen from above',
  label: 'Fajitas Mi Pueblito',
};

export const about = {
  title: 'Classic recipes with a playful spirit',
  p1: 'Discover a family-owned restaurant where traditional recipes meet a creative approach to cooking. Rooted in authentic preparations, modern Mexican cuisine takes shape through homemade tamales, mole poblano, and grilled Tajin artichokes. Each dish reflects a respect for heritage alongside a willingness to try something different.',
  p2: 'Located in Ironstone Village, Mi Pueblito Modern Mexican Restaurant offers a cozy setting and genuine hospitality that make it easy to settle in. Vegetarian and vegan selections add variety to the experience, while catering, online ordering, and reservations offer convenient ways to explore the menu. Stop by and see what catches the eye.',
  room: { src: roomPlantWall, alt: 'The dining room with its wall of living plants and wooden tables', label: 'Our plant wall' },
  dish: { src: moleOverhead, alt: 'Mole poblano enchiladas with crema, avocado and pickled onion on a white plate', label: 'Mole poblano enchiladas' },
};

export const chapters = [
  {
    id: 'catering',
    title: 'Premium Mexican Catering',
    sub: 'A little extra joy for Medford events',
    body: 'Give the attendees something worth talking about. Our catering menu features taco boxes with chicken, pastor, and carnitas, plus burrito trays with creamy white rice, pico de gallo, and chipotle aioli. For a sweet finish, cinnamon-sugar churros come with homemade chocolate sauce. Hosting a birthday or corporate function? Get in touch to arrange the spread.',
    cta: { label: 'Catering', href: site.links.catering },
    image: cateringSpread,
    alt: 'A table spread with tacos, fajitas, burritos and sides seen from above',
    label: 'Tacos have a way of winning over the guest list',
  },
  {
    id: 'parties',
    title: 'Private Parties at Mi Pueblito',
    sub: 'A fiesta with its own personality',
    body: 'Some festivities call for a setting that feels personal. Wooden tables, metal chairs, and colorful decorative touches create a casual backdrop for birthdays, anniversaries, and family reunions. Conversation flows easily in this inviting space, leaving the spotlight on the occasion itself. Have a milestone coming up? Reach out and let us help bring the festivities to life.',
    cta: { label: 'Book a party', href: site.links.party },
    image: roomWindow,
    alt: 'Set tables by the front windows, with plants on the sills',
    label: 'Colorful surroundings make room for your story',
  },
  {
    id: 'reservations',
    title: 'Reservations Made Simple',
    sub: 'Step into something beyond the usual',
    body: 'Looking for an easygoing dining experience? Settle in for comforting classics or explore lighter selections that offer a change of pace. Outdoor seating adds a breath of fresh air, while the BYOB policy lets guests pair their preferred bottle with the meal. Reserve a table and let us take care of the welcome.',
    cta: { label: 'Reservations', href: site.phoneHref },
    image: exteriorPatio,
    alt: 'The restaurant front in Ironstone Village with umbrellas over the outdoor tables',
    label: 'Outdoor seating, BYOB',
  },
];

export const order = {
  title: 'Order Mexican, Skip the Fuss',
  sub: 'Something tasty in Medford is just a click away',
  body: 'Searching for the best Mexican food in Medford? Start with tender Birria Tacos, dig into loaded Nachos Mi Pueblito, or choose a grilled chicken burrito for a hearty bite. Creamy queso fundido adds a rich touch, while churros provide a sweet finish. Explore the available selections and place an order whenever hunger strikes.',
  note: 'Birria is calling, and the answer is easy',
  dishes: [
    { name: 'Birria Tacos', group: 'Tacos', image: birria, alt: 'Birria tacos with a cup of consommé on a serape runner' },
    { name: 'Al Pastor Cemita', group: 'Sandwiches & cemitas', image: cemita, alt: 'Close view of an al pastor cemita with guacamole' },
    { name: 'Fajitas Mi Pueblito', group: 'Entrees', image: fajitasClose, alt: 'Steak, shrimp, peppers and onions in a sizzling skillet' },
    { name: 'Mole Poblano Enchiladas', group: 'Entrees', image: mole, alt: 'Enchiladas under dark mole with crema and radish' },
    { name: 'Seafood Paella a la Diabla', group: 'Entrees', image: paella, alt: 'Shrimp, scallops and clams over red rice' },
    { name: 'Grilled Fish Tacos', group: 'Tacos', image: fishTacos, alt: 'Grilled fish tacos with pickled cabbage and chipotle sauce' },
    { name: 'Wet Burrito', group: 'Burritos', image: wetBurrito, alt: 'A burrito covered in red and green sauce and crema' },
    { name: 'Tres Leches Cake', group: 'Desserts', image: tresLeches, alt: 'A slice of tres leches cake with whipped cream and a cherry' },
    { name: 'Churro Ice Cream', group: 'Desserts', image: churro, alt: 'Ice cream sundae with churros, chocolate and a cherry' },
  ],
};

export const wall = {
  title: 'A Look Inside Mi Pueblito',
  sub: 'Plants, color, and plenty of good food',
  prints: [
    { src: sign, alt: 'The Mi Pueblito sign above the entrance', label: 'Ironstone Village', size: 'tall' },
    { src: roomDining, alt: 'Guests at lunch in the main dining room', label: 'The dining room', size: 'wide' },
    { src: paellaOverhead, alt: 'Paella a la diabla in its pan on a serape, from above', label: 'Paella a la diabla', size: 'square' },
    { src: team, alt: 'The whole Mi Pueblito team in black, standing in the dining room', label: 'The whole team', size: 'wide' },
    { src: chipsBeans, alt: 'A tortilla chip standing in refried beans with queso fresco', label: 'Chips and beans', size: 'square' },
    { src: roomKitchen, alt: 'The open kitchen counter and the dining room behind it', label: 'The open kitchen', size: 'tall' },
  ],
  reviews: [
    { text: 'Amazing fresh food, I had the ceviche appetizer, guac and Camarones a la Diabla which was so delicious! Highly recommend. We will be back! BYOB!', name: 'Kayla U' },
    { text: 'Everything I’ve ordered here has been consistently great. The pollo poblano with crab we had tonight was next level! Steak tacos, guacamole and tajin artichokes were all great. It’s hard to choose when the menu is so stacked! Looking forward to the next visit!', name: 'Jon T' },
    { text: 'Incredible food and super nice people who work there. The fish tacos and Al pastor burrito were a 10/10 for me', name: 'Ian' },
    { text: 'Delicious lunch with wonderful guacamole. Definitely coming back.', name: 'John C' },
  ],
};

export const work = {
  title: 'Work with Us',
  sub: 'Bring a positive spirit to the team',
  body: 'Ready for a new chapter? At our Mexican restaurant in Medford, the kitchen and the dining room work as one team, and everyone pitches in when the rush hits. We’re looking for friendly servers, hosts, and cooks who enjoy good food and good company. If you’ve worked in a restaurant before, great. If not, we’ll show you the ropes. Send us a note and tell us a little about yourself.',
  cta: { label: 'Now hiring', href: site.links.jobs },
  image: staffThree,
  alt: 'Three members of the Mi Pueblito team smiling in the dining room',
  label: 'Come say hola',
};

export const visit = {
  image: exteriorFront,
  alt: 'The front of Mi Pueblito with umbrellas and planters on the patio',
  footerPrint: birriaOverhead,
};
