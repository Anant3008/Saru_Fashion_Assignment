import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRegistered = false;

export const revealEase = "power2.out";

export function registerScrollTrigger() {
  if (scrollTriggerRegistered) return;

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  gsap.defaults({
    ease: revealEase,
    duration: 0.45,
  });

  scrollTriggerRegistered = true;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface AnimationPhysicsOptions {
  y?: number;
  scale?: number;
  blur?: number;
  opacity?: number;
}

export function setElementInitialState(
  elements: Element | Element[],
  options: AnimationPhysicsOptions = {}
) {
  const { y = 30, scale = 0.97, blur = 8, opacity = 0 } = options;
  gsap.set(elements, {
    autoAlpha: opacity,
    y,
    scale,
    filter: blur > 0 ? `blur(${blur}px)` : "none",
    force3D: true,
    willChange: "transform, opacity, filter",
  });
}

export function clearAnimatedProps(elements: Element | Element[]) {
  gsap.set(elements, { clearProps: "opacity,visibility,transform,filter,willChange" });
}

export { gsap, ScrollTrigger };

