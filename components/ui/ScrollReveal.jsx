import useScrollReveal from "../../hooks/useScrollReveal";

/**
 * <ScrollReveal /> — wraps any content with a scroll-triggered reveal.
 *
 * Props:
 *   children   ReactNode
 *   direction  "up" | "down" | "left" | "right" (default "up")
 *   delay      ms before the transition runs (default 0)
 *   duration   ms (default 600 — matches brand motion token)
 *   className  extra classes on the wrapper
 *   as         element type (default "div")
 *
 * Design language:
 *   - opacity 0 → 1
 *   - transform translate(20px → 0) along the chosen axis
 *   - easing cubic-bezier(0.16, 1, 0.3, 1)  — gentle overshoot
 *   - Honors prefers-reduced-motion via the underlying hook.
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  className = "",
  as: Tag = "div",
}) {
  const { ref, isVisible } = useScrollReveal({ triggerOnce: true });

  const offsets = {
    up: "translate3d(0, 20px, 0)",
    down: "translate3d(0, -20px, 0)",
    left: "translate3d(20px, 0, 0)",
    right: "translate3d(-20px, 0, 0)",
  };

  const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0)" : offsets[direction] || offsets.up,
    transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}
