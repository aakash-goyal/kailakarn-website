import { useEffect, useRef, useState } from "react";

/**
 * useMousePosition
 * --------------------------------------------------------------
 * Tracks the cursor position relative to a target element and
 * publishes normalized [0..1] coordinates via:
 *   - returned { x, y } state (rendered into React)
 *   - CSS custom properties --mouse-x / --mouse-y on the element
 *     so CSS can react without a re-render.
 *
 *   const { ref, x, y } = useMousePosition();
 *   <section ref={ref} style={{ background: "radial-gradient(...)" }} />
 *
 * Behavior:
 *   - Mousemove handler is throttled to one update per animation
 *     frame (no more than ~60fps).
 *   - On touch / hover-less devices: returns { x: 0.5, y: 0.5 } and
 *     skips event registration entirely.
 *   - Honors prefers-reduced-motion: returns center and skips
 *     listening (the effect is purely decorative).
 *   - Cleans up listener and pending rAF on unmount.
 */
export default function useMousePosition() {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const latestRef = useRef({ clientX: 0, clientY: 0 });
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch =
      window.matchMedia && window.matchMedia("(hover: none)").matches;

    // Always seed CSS vars so consumers can rely on them.
    el.style.setProperty("--mouse-x", "0.5");
    el.style.setProperty("--mouse-y", "0.5");

    if (reduced || isTouch) {
      setPos({ x: 0.5, y: 0.5 });
      return;
    }

    const flush = () => {
      rafRef.current = 0;
      const target = ref.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = clamp01((latestRef.current.clientX - rect.left) / rect.width);
      const y = clamp01((latestRef.current.clientY - rect.top) / rect.height);

      target.style.setProperty("--mouse-x", x.toFixed(4));
      target.style.setProperty("--mouse-y", y.toFixed(4));
      setPos({ x, y });
    };

    const handleMove = (e) => {
      latestRef.current.clientX = e.clientX;
      latestRef.current.clientY = e.clientY;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(flush);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { ref, x: pos.x, y: pos.y };
}

function clamp01(v) {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}
