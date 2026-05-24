import ScrollReveal from "./ScrollReveal";
import useCounter from "../../hooks/useCounter";

/**
 * <StatCard /> — animated count-up metric.
 *
 * Props:
 *   number  — target number (parseable as int) or string fallback
 *   label   — caption beneath the number
 *   prefix  — text before the number (e.g. "$")
 *   suffix  — text after the number (e.g. "x", "%", "K", "M")
 *   index   — stagger delay multiplier
 *   variant — "dark" (white number on dark) | "light" (orange number)
 */
export default function StatCard({
  number,
  label,
  prefix = "",
  suffix = "",
  index = 0,
  variant = "light",
}) {
  const target = parseInt(number, 10);
  const isNumeric = !Number.isNaN(target);
  const { ref, displayValue } = useCounter({
    target: isNumeric ? target : 0,
    duration: 1800,
    prefix,
    suffix,
  });

  // For non-numeric inputs, render the raw label; otherwise the
  // animated count (which already includes prefix/suffix).
  const display = isNumeric ? displayValue : `${prefix}${number}${suffix}`;
  const numberColor = variant === "light" ? "text-primary" : "text-white";

  return (
    <ScrollReveal direction="up" delay={index * 90} duration={600}>
      <div
        ref={ref}
        className="flex flex-col p-6 md:p-7 rounded-3xl bg-surface border border-white/5 hover:border-primary/30 transition-colors duration-500"
      >
        <p className={`text-5xl md:text-6xl font-heading font-semibold tracking-tightest leading-none mb-3 ${numberColor}`}>
          {display}
        </p>
        <p className="text-soft text-sm md:text-base font-body uppercase tracking-[0.18em]">
          {label}
        </p>
      </div>
    </ScrollReveal>
  );
}
