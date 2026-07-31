import { useLayoutEffect, useRef } from "react";
import {
  clearAnimatedProps,
  gsap,
  prefersReducedMotion,
  registerScrollTrigger,
  setElementInitialState,
  revealEase,
} from "@/app/animations/scrollAnimations";

export type RevealOptions = {
  selector?: string;
  start?: string;
  end?: string;
  y?: number;
  scale?: number;
  blur?: number;
  duration?: number;
  stagger?: number;
  scrub?: boolean | number;
  independentTriggers?: boolean;
};

const DEFAULT_SELECTOR = "[data-reveal]";
const DEFAULT_START = "top 92%";
const DEFAULT_END = "top 55%";

/**
 * Universal Stagger & Reveal Hook for sections and card groups.
 * Provides instant entrance, hardware acceleration, independent card triggers,
 * and bidirectional scroll reverse.
 */
export function useStaggerReveal<T extends HTMLElement>({
  selector = DEFAULT_SELECTOR,
  start = DEFAULT_START,
  end = DEFAULT_END,
  y = 28,
  scale = 0.97,
  blur = 8,
  duration = 0.42,
  stagger = 0.05,
  scrub = 0.15,
  independentTriggers = true,
}: RevealOptions = {}) {
  const scopeRef = useRef<T>(null);

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    registerScrollTrigger();

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<Element>(selector);
      if (elements.length === 0) return;

      if (prefersReducedMotion()) {
        clearAnimatedProps(elements);
        return;
      }

      const animDuration = Math.min(Math.max(duration, 0.35), 0.55);
      const animStagger = Math.min(Math.max(stagger, 0.04), 0.07);

      if (independentTriggers && elements.length > 1) {
        // Independent ScrollTrigger per element so each card animates when IT enters viewport
        elements.forEach((el) => {
          setElementInitialState(el, { y, scale, blur });

          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: animDuration,
            ease: revealEase,
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: scrub === true ? 0.15 : scrub,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });
        });
      } else {
        // Grouped stagger reveal attached to container scope
        setElementInitialState(elements, { y, scale, blur });

        gsap.to(elements, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: animDuration,
          stagger: animStagger,
          ease: revealEase,
          force3D: true,
          scrollTrigger: {
            trigger: scope,
            start,
            end,
            scrub: scrub === true ? 0.15 : scrub,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });
      }
      // Refresh ScrollTrigger calculations after images load
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }, scope);

    return () => ctx.revert();
  }, [selector, start, end, y, scale, blur, duration, stagger, scrub, independentTriggers]);

  return scopeRef;
}

/**
 * Reusable alias hooks matching V2 specification
 */
export const useRevealAnimation = useStaggerReveal;
export const useStaggerAnimation = useStaggerReveal;

/**
 * Independent Scroll Cards Hook specifically for multi-card grid layouts
 */
export function useScrollCards<T extends HTMLElement>(options: RevealOptions = {}) {
  return useStaggerReveal<T>({
    y: 32,
    scale: 0.96,
    blur: 10,
    duration: 0.45,
    stagger: 0.05,
    scrub: 0.15,
    independentTriggers: true,
    ...options,
  });
}

/**
 * Dedicated Gallery Reveal Hook with fast masonry staggering
 */
export function useGalleryReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  return useStaggerReveal<T>({
    selector: ".masonry-item, [data-reveal]",
    y: 36,
    scale: 0.95,
    blur: 8,
    duration: 0.4,
    stagger: 0.04,
    scrub: 0.15,
    independentTriggers: true,
    ...options,
  });
}

/**
 * Hero Section Animation Hook
 * Sequenced rapid reveal (~500ms total) with bidirectional scroll exit/re-entrance.
 */
export function useHeroReveal<T extends HTMLElement>() {
  const scopeRef = useRef<T>(null);

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    registerScrollTrigger();

    const ctx = gsap.context(() => {
      const heading = scope.querySelector("[data-hero-heading]");
      const supporting = gsap.utils.toArray<Element>("[data-hero-supporting]");
      const actions = gsap.utils.toArray<Element>("[data-hero-action]");
      const allHeroElements = [heading, ...supporting, ...actions].filter(Boolean) as Element[];

      if (allHeroElements.length === 0) return;

      if (prefersReducedMotion()) {
        clearAnimatedProps(allHeroElements);
        return;
      }

      setElementInitialState(allHeroElements, { y: 28, scale: 0.98, blur: 6 });

      // Immediate load animation sequence
      const tl = gsap.timeline({
        defaults: { ease: revealEase, force3D: true },
      });

      if (heading) {
        tl.to(heading, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.45,
        });
      }

      if (supporting.length > 0) {
        tl.to(
          supporting,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.4,
            stagger: 0.05,
          },
          "-=0.3"
        );
      }

      if (actions.length > 0) {
        tl.to(
          actions,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.38,
            stagger: 0.05,
          },
          "-=0.25"
        );
      }

      // Scroll-linked bidirectional exit / re-entrance on hero scroll
      gsap.to(scope, {
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom 30%",
          scrub: 0.15,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(allHeroElements, {
              opacity: 1 - progress * 1.2,
              y: progress * -40,
              filter: `blur(${progress * 6}px)`,
            });
          },
        },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return scopeRef;
}

export const useHeroAnimation = useHeroReveal;
