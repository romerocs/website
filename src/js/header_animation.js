import { gsap } from "gsap";

const select = (e) => document.querySelector(e);
const windowWidth = window.innerWidth;
const patternWidth = windowWidth * 3;
const initialPosition = (patternWidth - windowWidth) * -1;
const pattern = select(".animated-pattern");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (!prefersReducedMotion.matches) {
  const tl = gsap.timeline({});

  tl.set(pattern, { width: patternWidth, x: initialPosition });

  tl.to(pattern, {
    duration: 7,
    x: 0,
    ease: "power2.out"
  });
}
