// The concept driver: every print is black and white, and color develops where you look.
// Fine pointer: a lens of color follows the pointer over any [data-develop] print (lagged, breathing,
// drifting a little when the pointer rests). The hero lens never closes while the hero is on screen.
// Touch: each print develops from its center as it travels to the middle of the screen.
// Reduced motion: no lens movement; CSS shows food in color and colors a print on hover.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, isTouch, prefersReducedMotion } from '../engine';

gsap.registerPlugin(ScrollTrigger);

type Lens = {
  el: HTMLElement; x: number; y: number; tx: number; ty: number; r: number; R: number;
  hover: boolean; hero: boolean; armed: boolean; visible: boolean; drawn: boolean;
};

const LENS_KINDS = ['food', 'room', 'word'];
const lenses = new Map<HTMLElement, Lens>();
let current: Lens | null = null;
let px = -9999, py = -9999, lastMove = 0;

function radiusFor(l: Lens) {
  const b = l.el.getBoundingClientRect();
  const m = Math.min(b.width, b.height);
  l.R = l.hero ? gsap.utils.clamp(120, 300, m * 0.27) : gsap.utils.clamp(70, 230, m * 0.3);
  return b;
}

function write(l: Lens, r: number) {
  const s = l.el.style;
  s.setProperty('--x', `${l.x.toFixed(1)}px`);
  s.setProperty('--y', `${l.y.toFixed(1)}px`);
  s.setProperty('--r', `${Math.max(0, r).toFixed(1)}px`);
  s.setProperty('--rs', (Math.max(0, r) / 100).toFixed(3));
  s.setProperty('--k', gsap.utils.clamp(0, 1, l.r / (l.R * 0.55)).toFixed(3));
}

function lensAt(x: number, y: number) {
  const hit = document.elementFromPoint(x, y) as HTMLElement | null;
  const el = hit?.closest<HTMLElement>('[data-develop]');
  return (el && lenses.get(el)) || null;
}

function aimCurrent() {
  if (!current) return;
  const b = current.el.getBoundingClientRect();
  current.tx = px - b.left;
  current.ty = py - b.top;
}

function setCurrent(l: Lens | null) {
  if (current === l) return;
  if (current) current.hover = false;
  current = l;
  if (l) {
    l.hover = true;
    radiusFor(l);
    if (l.r < 1) { const b = l.el.getBoundingClientRect(); l.x = px - b.left; l.y = py - b.top; } // open where the pointer enters
  }
}

function tick(time: number) {
  const dr = gsap.ticker.deltaRatio();
  const kPos = 1 - Math.pow(0.84, dr);
  const kRad = 1 - Math.pow(0.91, dr);
  const resting = performance.now() - lastMove > 700;
  lenses.forEach((l) => {
    const want = l.hover || (l.hero && l.armed && l.visible);
    if (!want && !l.drawn) return;
    let tx = l.tx, ty = l.ty;
    if (want && (resting || !l.hover)) {             // idle: the lens wanders a little around its spot
      tx += Math.sin(time * 0.55) * l.R * 0.22;
      ty += Math.cos(time * 0.41) * l.R * 0.14;
    }
    l.x += (tx - l.x) * kPos;
    l.y += (ty - l.y) * kPos;
    l.r += ((want ? l.R : 0) - l.r) * kRad;
    if (!want && l.r < 0.6) l.r = 0;
    write(l, want ? l.r * (1 + Math.sin(time * 1.2) * 0.03) : l.r); // breathing exposure
    l.drawn = l.r > 0;
  });
}

function startFine(intro: gsap.core.Timeline) {
  lenses.clear();
  current = null;
  document.querySelectorAll<HTMLElement>('[data-develop]').forEach((el) => {
    if (!LENS_KINDS.includes(el.dataset.develop || '')) return;
    const l: Lens = { el, x: 0, y: 0, tx: 0, ty: 0, r: 0, R: 120, hover: false, hero: el.hasAttribute('data-lens-hero'), armed: false, visible: true, drawn: false };
    const b = radiusFor(l);
    if (l.hero) {
      l.x = l.tx = b.width * 0.47; l.y = l.ty = b.height * 0.46;   // the skillet
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (s) => { l.visible = s.isActive; } });
      intro.call(() => { l.armed = true; }, [], 0.05);
    }
    lenses.set(el, l);
  });
  const move = (e: PointerEvent) => {
    px = e.clientX; py = e.clientY; lastMove = performance.now();
    setCurrent(lensAt(px, py));
    aimCurrent();
  };
  const leaveDoc = () => setCurrent(null);
  addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', leaveDoc);
  const offScroll = onScroll(() => { if (px > -9999) { setCurrent(lensAt(px, py)); aimCurrent(); } });
  const onResize = () => lenses.forEach((l) => radiusFor(l));
  addEventListener('resize', onResize);
  gsap.ticker.add(tick);
  return () => {
    removeEventListener('pointermove', move);
    document.documentElement.removeEventListener('pointerleave', leaveDoc);
    removeEventListener('resize', onResize);
    offScroll();
    gsap.ticker.remove(tick);
    lenses.clear();
    current = null;
  };
}

function startTouch(intro: gsap.core.Timeline) {
  document.querySelectorAll<HTMLElement>('[data-develop]').forEach((el) => {
    if (!LENS_KINDS.includes(el.dataset.develop || '')) return;
    el.style.setProperty('--x', '50%');
    el.style.setProperty('--y', '50%');
    const full = () => `${Math.hypot(el.offsetWidth, el.offsetHeight) / 2 + 2}px`;
    if (el.hasAttribute('data-lens-hero')) {
      el.style.setProperty('--y', '36%'); el.style.setProperty('--r', '1px'); // painted at load so the hero image counts for LCP right away
      intro.add(gsap.fromTo(el, { '--r': '1px' }, { '--r': () => `${Math.min(el.offsetWidth, el.offsetHeight) * 0.4}px`, duration: 1.8, ease: 'expo.out' }), 0.1);
      return;
    }
    gsap.fromTo(el, { '--r': '0px' }, {
      '--r': full, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'center 45%', scrub: 0.6, invalidateOnRefresh: true },
    });
  });
}

export function startDevelop() {
  onPage(({ intro }) => {
    const lines = document.querySelectorAll<HTMLElement>('[data-hero-line]');
    if (lines.length && !prefersReducedMotion()) {
      intro.add(gsap.fromTo(lines, { y: '0.12em' }, { opacity: 1, y: 0, duration: 1.6, ease: 'expo.out', stagger: 0.28, clearProps: 'transform' }), 0.1);
    }
    if (!document.querySelector('[data-develop]')) return;
    if (prefersReducedMotion()) return;
    if (isTouch()) { startTouch(intro); return; }
    return startFine(intro);
  });
}
