# Mi Pueblito Modern Mexican Restaurant

Website for Mi Pueblito, 560 Stokes Rd Ste 10B, Ironstone Village, Medford NJ.

Every photo starts as a black and white print and develops into color: under a lens that follows the pointer on desktop, and on scroll on phones. Design notes, palette, type and assumptions are in [DESIGN.md](DESIGN.md).

## Stack

Astro (static output), GSAP + Lenis for motion, self-hosted fonts (Gambetta, Switzer, Satisfy).

## Run

```sh
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
node scripts/serve.mjs 4417   # preview the build at http://127.0.0.1:4417
```

`dist/` is a plain static site and can be deployed to any static host (Netlify, Vercel, Cloudflare Pages).

## Content

All visible copy, links and photos are in `src/data/site.ts`. Open items to confirm with the client:

- Hero video (the overhead fajitas photo stands in for now).
- Catering, party and job buttons open an email with a subject; Reservations calls the restaurant.
- Dish categories in the order list.
- Work with Us copy was written for this site.
