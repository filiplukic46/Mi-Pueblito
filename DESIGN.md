# Mi Pueblito: awwwards build

## Brief
- Subject: Mi Pueblito Modern Mexican Restaurant, 560 Stokes Rd Ste 10B, Ironstone Village, Medford NJ. Family-owned, BYOB, outdoor seating, vegetarian and vegan options, open daily 11:00 am to 9:30 pm.
- Audience: locals and families in Medford deciding where to eat tonight, people ordering pickup, and people planning a party or catering.
- The site's job: get people to order online, book a table, or ask about catering and parties.
- Assets: 80 professional photos in `../slike` (dishes on bright serape runners, the rooms, the team), plus the logo (a line drawing of a smoking volcano, serif caps, and a green/white/red rule).
- Client asks: a serif similar to the logo plus a readable cursive; black, dark olive and the logo colors; plants and black-and-white photos (the restaurant's own walls); a landscape hero video.
- Client SEO copy (H1, H2, all section bodies, reviews) is used word for word. Button labels follow the client list, set in sentence case.
- Free site: no SpotHopper template limits.

## Concepts considered
| | Idea | Anchor | Signature | O/F/Fe/P |
|---|---|---|---|---|
| A. Material of the room | Tradition is black and white, the plate arrives in color: every photo is a B&W print from the restaurant's walls, and color develops wherever you look | their B&W wall photos, and their own line "Where tradition gets a fresh perspective" | a lens of color follows the pointer over each print; on phones each print develops to color as it reaches the middle of the screen | 4 / 5 / 5 / 2 |
| B. Name | *Mi pueblito*, my little village: the page is a walk down a village street, and each section is a storefront | the name | an illustrated street that pans sideways | 3 / 3 / 2 / 3 |
| C. Logo | The volcano ridge from the logo is one line that runs through the whole page and draws itself as you scroll | the logo drawing | an SVG ridge draws itself as you scroll | 3 / 3 / 4 / 3 |

Pick A: it is built on two real facts (the B&W photos on their walls and their own tagline), it gives rules for layout, motion, copy and hover, and the serape runners under every dish make the color moment hit hard. From C, the 404 borrows the idea of something still in progress.

## Concept card
```
Idea:        Tradition in black and white, the fresh perspective in color: every photo on the site is a B&W print, and color develops where you look.
Metaphor:    a darkroom print and the restaurant's own wall of B&W photos.
Signature:   the color lens: a circle of full color follows the pointer over any print (the clip-path on a color copy of the photo), with a handwritten label of what's in it. On load the hero develops from the center. On touch, each print develops as it crosses the middle of the screen.
Emotion:     calm and nostalgic for one second, then appetite.
Motion verb: develop: things come up out of grey, slowly, and settle (expo out, 1 to 1.4 s).
Screenshot:  the hero's grey fajita skillet on a grey runner, with one bright circle of pink serape and sizzling peppers under the cursor.
```

## Art direction
- Palette (from the logo and the room):
  - ground `#141512` (ink, the darkroom)
  - ink `#F4F3EE` (paper print)
  - muted `#A9AC9E` (7.4:1 on ground)
  - line `rgb(244 243 238 / 0.14)`
  - field `#363D2A` (the olive of the plant walls, used for the services chapter and the curtain)
  - accent `#E26A55` (the red of the logo rule, used only for the primary CTA and the lens ring)

  Near-black plus one warm accent is a known default. Here it is earned: the photos carry the color, and the red is the logo's own.
- Type:
  - Gambetta (Fontshare) for display. It is a classical serif close to the logo caps.
  - Switzer (Fontshare) for text and UI. It is modern and easy to read, as the client asked.
  - Satisfy (Google, the client-approved cursive), used only for handwritten labels on prints, which carry real information (dish names, highlight lines).
- Scale: mega for the footer wordmark, xl for the hero and the main titles, l for section titles, m for the statement. Tracking runs from -0.035em (display) to 0 (body).
- Grid: 12 columns. Text hangs from column lines 1, 5 and 8. The section rhythm varies: airy for About and the wall, tight for Order, a full viewport for the hero and the services stage.
- Shape: radius 0 everywhere. Prints are rectangles; the lens is the only circle.
- Motion language: one easing family (expo). Reveals are line masks for display type, and images "develop": a clip from the center plus grey to color. Transitions close and reopen like a lens aperture. Hovers:
  - CTAs flood with paper from the pointer's side.
  - Nav links draw an underline.
  - Dish rows slide and show a floating print that develops.
  - Prints show the lens.
- Idle: the lens keeps drifting slowly around the last pointer position. The hero lens breathes when nobody moves.

## Composition (home)
```
HERO (full-bleed)  [logo]                         [menu order catering visit] [Order online]
                   full-bleed B&W fajitas print, color lens + handwritten label
                   h1 small: Mi Pueblito - Mexican Restaurant in Medford
                   WHERE TRADITION / GETS A FRESH PERSPECTIVE (xl)      open daily 11:00 am to 9:30 pm
ABOUT (asymmetric pair)  title (l) | print plant wall (cols 1-5) | statement p1 (m) + p2 + link (cols 7-11) | mole print (cols 9-12)
SERVICES (sticky narrative, olive)  sticky stage cols 1-6 (3 prints, active one develops, label) | chapters cols 8-12
ORDER (index list)  title + body + DoorDash/Tabit | dish index rows with floating developing print
WALL (gallery wall)  title + handwritten line | B&W prints hung at different sizes, four Google reviews hung between them
WORK (asymmetric pair, reversed)  team print cols 1-7 | text cols 9-12
VISIT (facts)  11:00 am to 9:30 pm (xl, tabular) | address, phone, email | gift cards | link to /visit
FOOTER (finale)  links | MI PUEBLITO wordmark filled with a B&W print, lens colors it | small print
```
Inner page: `/visit` (practical facts, reservations, private parties, catering contact, gift cards). There is also a designed 404 ("Still developing").

## Genericness test
- A generic model would center the hero over the video with a dark overlay. Here, the hero is a print that the visitor colors in.
- A generic model would use Cormorant or Playfair with a script on every subtitle. Here, Gambetta does the display, and the script is only handwriting on prints.
- A generic model would use three equal service cards. Here, it is a sticky darkroom stage.
- A generic model would use a menu carousel. Here, it is an index of dishes with a print that develops under the pointer.

## Decisions and assumptions
- Hero video: the client has a landscape video, but no file was provided. The hero uses the overhead fajitas print, with a video slot noted in `site.ts`.
- Catering, party, reservation and job links are TBD from the client:
  - Catering, parties and jobs use email with a subject line.
  - Reservations use the phone number.
- Dish categories in the order index are taken from the old site's menu groups. Treat them as assumptions to confirm.
- No newsletter: there is no backend yet.
- No loader: a restaurant site doesn't earn one. The hero develops on first paint instead.
