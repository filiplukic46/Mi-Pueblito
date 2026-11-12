// Global motion for Mi Pueblito: runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startDevelop } from './develop';
import { headerFrame, menu, buttonFill, dishPreview, darkroomStage } from './ui';

export function setupMotion() {
  // Page transition: a lens aperture closes on the click point and reopens on the next page.
  let point = { x: innerWidth / 2, y: innerHeight / 2 };
  addEventListener('pointerdown', (e) => { point = { x: e.clientX, y: e.clientY }; }, { passive: true });
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .set(c.querySelector('.curtain__mark'), { left: gsap.utils.clamp(160, innerWidth - 160, point.x), top: gsap.utils.clamp(80, innerHeight - 80, point.y) })
      .fromTo(c.querySelector('.curtain__panel'),
        { clipPath: `circle(0% at ${point.x}px ${point.y}px)` },
        { clipPath: `circle(150% at ${point.x}px ${point.y}px)`, duration: 0.85, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { clipPath: `circle(0% at ${point.x}px ${point.y}px)`, duration: 0.9, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });
  headerFrame();
  menu();
  buttonFill();
  dishPreview();
  darkroomStage();
  startDevelop();
}
