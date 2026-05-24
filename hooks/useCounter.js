import { useEffect, useRef, useState } from "react";

/**
 * useCounter
 * --------------------------------------------------------------
 * Animated count-up from 0 to a target number.
 *
 *   const { ref, displayValue } = useCounter({ target: 22, suffix: "x" });
 *   <span ref={ref}>{displayValue}</span>
 *
 * Behavior:
 *   - Counting only starts once the element enters the viewport
 *     (one IntersectionObserver per instance — these are short-lived
 *     and disconnect themselves after the first trigger).
 *   - Uses requestAnimationFrame for smooth easing (ease-out cubic).
 *   - Honors prefers-reduced-motion: jumps to the final value with
 *     no animation.
 *   - Cleans up rAF / observer on unmount.
 *
 * Props:
 *   target    — final number (required)
 *   duration  — ms total (default 2000)
 *   prefix    — string before the number (e.g. "$")
 *   suffix    — string after the number (e.g. "%", "K", "x")
 *   decimals  — decimal precision (default 0)
 */
export default function useCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
} = {}) {
  const ref = useRef(null);
  const startedRef = useRef(false);
  const rafRef = useRef(0);

  const goal = Number.isFinite(Number(target)) ? Number(target) : 0;
  const format = (n) => {
    const fixed = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
    return `${prefix}${fixed}${suffix}`;
  };

  const [displayValue, setDisplayValue] = useState(format(0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplayValue(format(goal));
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      // No support → just render the final value rather than 0 forever.
      setDisplayValue(format(goal));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting || startedRef.current) return;

        startedRef.current = true;
        observer.unobserve(el);

        const start = performance.now();

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic — fast start, slow finish
          const eased = 1 - Math.pow(1 - progress, 3);
          const next = goal * eased;

          setDisplayValue(format(next));

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            setDisplayValue(format(goal));
          }
        };

        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // We deliberately serialize numeric/string props so the effect
    // only re-runs when something semantically changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, duration, prefix, suffix, decimals]);

  return { ref, displayValue };
}
