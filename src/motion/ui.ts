// Interface behavior: header frame, menu overlay, button fill, the dish index preview, the darkroom stage.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, isTouch, prefersReducedMotion, ease, stopScroll, startScroll } from '../engine';

gsap.registerPlugin(ScrollTrigger);

/** Header steps aside on scroll down, returns on scroll up, gains a ground color off the hero. */
export function headerFrame() {
  let last = 0, seen = -1;
  gsap.ticker.add(() => {
    const y = scrollY;
    if (y === seen) return;
    seen = y;
    const h = document.documentElement.classList;
    h.toggle('is-scrolled', y > 40);
    if (Math.abs(y - last) < 4) return;
    h.toggle('frame-away', y > 200 && y > last && !document.querySelector('[data-menu]:not([hidden])'));
    last = y;
  });
}

/** Full-screen menu on phones: focus moves in, Tab is trapped, Escape closes, focus returns. */
export function menu() {
  onPage(() => {
    const open = document.querySelector<HTMLButtonElement>('[data-menu-open]');
    const panel = document.querySelector<HTMLElement>('[data-menu]');
    const close = document.querySelector<HTMLButtonElement>('[data-menu-close]');
    if (!open || !panel || !close) return;
    const links = () => [...panel.querySelectorAll<HTMLElement>('a, button')];
    const show = () => {
      panel.hidden = false; open.setAttribute('aria-expanded', 'true'); stopScroll();
      if (!prefersReducedMotion()) {
        gsap.fromTo(panel, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: ease.inOut });
        gsap.from(panel.querySelectorAll('.menu__link'), { yPercent: 110, autoAlpha: 0, duration: 0.9, ease: ease.out, stagger: 0.05, delay: 0.25 });
      }
      links()[1]?.focus();
    };
    const hide = (restore = true) => {
      panel.hidden = true; open.setAttribute('aria-expanded', 'false'); startScroll();
      if (restore) open.focus();
    };
    const key = (e: KeyboardEvent) => {
      if (panel.hidden) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'Tab') {
        const l = links(); const first = l[0], lastEl = l[l.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    };
    const onClose = () => hide();
    const onLink = () => hide(false);
    open.addEventListener('click', show);
    close.addEventListener('click', onClose);
    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', onLink));
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('keydown', key); if (!panel.hidden) hide(false); };
  });
}

/** Buttons: paper floods in from the side the pointer came from. */
export function buttonFill() {
  onPage(() => {
    if (isTouch() || prefersReducedMotion()) return;
    const off: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-fill]').forEach((btn) => {
      const fill = btn.querySelector<HTMLElement>('.btn__fill');
      if (!fill) return;
      const at = (e: PointerEvent) => { const r = btn.getBoundingClientRect(); return `${e.clientX - r.left}px ${e.clientY - r.top}px`; };
      let closed = true;
      const open = (p: string) => {
        if (closed) gsap.set(fill, { clipPath: `circle(0% at ${p})` });
        closed = false; btn.classList.add('is-filled');
        gsap.to(fill, { clipPath: `circle(150% at ${p})`, duration: 0.6, ease: ease.soft, overwrite: true });
      };
      const shut = (p: string) => {
        btn.classList.remove('is-filled');
        gsap.to(fill, { clipPath: `circle(0% at ${p})`, duration: 0.5, ease: ease.soft, overwrite: true, onComplete: () => { closed = true; } });
      };
      const enter = (e: PointerEvent) => open(at(e));
      const leave = (e: PointerEvent) => shut(at(e));
      const focus = () => btn.matches(':focus-visible') && open('50% 50%');
      const blur = () => shut('50% 50%');
      btn.addEventListener('pointerenter', enter); btn.addEventListener('pointerleave', leave);
      btn.addEventListener('focus', focus); btn.addEventListener('blur', blur);
      off.push(() => {
        btn.removeEventListener('pointerenter', enter); btn.removeEventListener('pointerleave', leave);
        btn.removeEventListener('focus', focus); btn.removeEventListener('blur', blur);
      });
    });
    return () => off.forEach((f) => f());
  });
}

/** Dish index: a print follows the pointer and develops from grey into color for each dish. */
export function dishPreview() {
  onPage(() => {
    const list = document.querySelector<HTMLElement>('[data-index]');
    const box = document.querySelector<HTMLElement>('[data-preview-box]');
    if (!list || !box || isTouch() || matchMedia('(max-width: 860px)').matches) return;
    const fig = box.querySelector<HTMLElement>('.print')!;
    const imgs = fig.querySelectorAll<HTMLImageElement>('img');
    const label = box.querySelector<HTMLElement>('[data-preview-label]')!;
    const reduced = prefersReducedMotion();
    list.querySelectorAll<HTMLAnchorElement>('a[data-preview]').forEach((a) => { const i = new Image(); i.src = a.dataset.preview!; });
    fig.style.setProperty('--x', '50%'); fig.style.setProperty('--y', '50%');
    const x = gsap.quickTo(box, 'x', { duration: reduced ? 0.01 : 0.6, ease: 'power3.out' });
    const y = gsap.quickTo(box, 'y', { duration: reduced ? 0.01 : 0.6, ease: 'power3.out' });
    const rot = gsap.quickTo(box, 'rotate', { duration: 0.8, ease: 'power3.out' });
    let lastX = 0, px = 0, py = 0, shown = '';
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      // keep the print right of the pointer and inside the list band, so it never covers the order buttons or the name
      const lb = list.getBoundingClientRect(), bw = box.offsetWidth, bh = box.offsetHeight;
      x(Math.min(Math.max(px + 56, innerWidth * 0.6), innerWidth - bw - 24));
      y(gsap.utils.clamp(Math.max(lb.top, 0) + bh / 2, Math.min(lb.bottom, innerHeight) - bh / 2, py)); if (!reduced) rot(gsap.utils.clamp(-8, 8, (px - lastX) * 0.5)); lastX = px;
    };
    const show = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      if (e.type === 'focus') { const r = a.getBoundingClientRect(); x(Math.min(r.left + r.width * 0.55, innerWidth - box.offsetWidth - 24)); y(r.top + r.height / 2); }
      if (shown !== a.dataset.preview) {
        shown = a.dataset.preview!;
        imgs.forEach((i) => { i.src = shown; });
        label.textContent = a.dataset.name || '';
        if (!reduced) gsap.fromTo(fig, { '--r': '0px' }, { '--r': '320px', duration: 1.3, ease: 'power2.inOut', delay: 0.12, overwrite: true });
        else fig.style.setProperty('--r', '320px');
      }
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: ease.out });
    };
    const hide = () => { gsap.to(box, { autoAlpha: 0, scale: 0.9, duration: 0.4, ease: ease.out }); shown = ''; };
    const anchors = [...list.querySelectorAll<HTMLAnchorElement>('a[data-preview]')];
    anchors.forEach((a) => { a.addEventListener('pointerenter', show); a.addEventListener('focus', show); a.addEventListener('blur', hide); });
    list.addEventListener('pointerleave', hide);
    addEventListener('pointermove', move, { passive: true });
    const off = onScroll(() => { if (!list.contains(document.elementFromPoint(px, py))) hide(); });
    return () => { removeEventListener('pointermove', move); off(); };
  });
}

/** Darkroom stage: the print for the chapter in view slides up and develops from the center. */
export function darkroomStage() {
  onPage(() => {
    const stage = document.querySelector<HTMLElement>('[data-stage]');
    const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]');
    if (!stage || !chapters.length || matchMedia('(max-width: 860px)').matches) return;
    const prints = [...stage.querySelectorAll<HTMLElement>('[data-stage-print]')];
    const reduced = prefersReducedMotion();
    prints.forEach((p) => { p.style.setProperty('--x', '50%'); p.style.setProperty('--y', '50%'); });
    let active = -1;
    const full = (p: HTMLElement) => `${Math.hypot(p.offsetWidth, p.offsetHeight) / 2 + 2}px`;
    const go = (i: number) => {
      if (i === active) return;
      const prev = prints[active];
      active = i;
      const next = prints[i];
      prints.forEach((p) => p.classList.toggle('is-on', p === next));
      if (reduced) { next.style.setProperty('--r', full(next)); return; }
      const first = !prev;
      if (prev && prev !== next) gsap.to(prev, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: ease.inOut, overwrite: 'auto' });
      if (!first) gsap.fromTo(next, { clipPath: 'inset(100% 0% 0% 0%)', zIndex: 2 }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: ease.inOut, overwrite: 'auto',
        onComplete: () => { gsap.set(next, { zIndex: 1 }); } });
      gsap.fromTo(next, { '--r': '0px', '--k': 1 }, { '--r': full(next), duration: 2.2, ease: 'power2.inOut', delay: 0.5 });
    };
    gsap.set(prints, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(prints[0], { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 1 });
    chapters.forEach((ch, i) => ScrollTrigger.create({
      trigger: ch, start: 'top 60%', end: 'bottom 40%',
      onToggle: (self) => { if (self.isActive) go(i); },
    }));
  });
}
