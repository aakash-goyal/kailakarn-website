import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal
 * --------------------------------------------------------------
 * Class-toggling reveal hook. The actual animation lives in CSS
 * (see `.reveal` / `.is-visible` rules in styles/globals.css).
 *
 * Behavior:
 *   - Single shared IntersectionObserver across the entire app
 *     (one DOM observer, many subscribers — much cheaper than
 *     creating one per element).
 *   - Returns { ref, isVisible }. Apply the ref to an element that
 *     starts with the `reveal` class; flip to `reveal is-visible`
 *     once `isVisible` is true.
 *   - Reads `data-delay` (in ms) from the element to stagger the
 *     class addition. Pass it as `<div data-delay={120}>`.
 *   - Honors prefers-reduced-motion: marks visible immediately
 *     with no transition stagger.
 *   - Cleans up listeners and pending timeouts on unmount.
 *
 * Options:
 *   - triggerOnce (default true) — once revealed, stop observing
 *     so it never reverses.
 */

let sharedObserver = null;
const handlers = new WeakMap();

const OBSERVER_OPTIONS = {
  threshold: 0.15,
  rootMargin: "0px 0px -8% 0px",
};

function getSharedObserver() {
  if (typeof window === "undefined") return null;
  if (sharedObserver) return sharedObserver;
  if (typeof IntersectionObserver === "undefined") return null;

  sharedObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const handler = handlers.get(entry.target);
      if (handler) handler(entry);
    }
  }, OBSERVER_OPTIONS);

  return sharedObserver;
}

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function useScrollReveal({ triggerOnce = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion → reveal instantly, skip observer entirely.
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const observer = getSharedObserver();
    if (!observer) {
      // No IntersectionObserver support → reveal immediately as a fallback.
      setIsVisible(true);
      return;
    }

    let delayTimer = 0;

    const handler = (entry) => {
      if (entry.isIntersecting) {
        // Read element-level stagger delay (ms) if present.
        const raw = entry.target.dataset.delay;
        const delay = raw ? parseInt(raw, 10) : 0;

        if (Number.isFinite(delay) && delay > 0) {
          delayTimer = window.setTimeout(() => setIsVisible(true), delay);
        } else {
          setIsVisible(true);
        }

        if (triggerOnce) {
          observer.unobserve(entry.target);
          handlers.delete(entry.target);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    handlers.set(el, handler);
    observer.observe(el);

    return () => {
      if (delayTimer) window.clearTimeout(delayTimer);
      observer.unobserve(el);
      handlers.delete(el);
    };
  }, [triggerOnce]);

  return { ref, isVisible };
}
