import ScrollReveal from "./ScrollReveal";
import { getServiceIcon } from "./ServiceIcons";

/**
 * <ServiceCard /> — glass-dark service card.
 *
 * Props:
 *   title        Clash Display semibold headline
 *   subtitle     short transformation line (rendered in primary orange)
 *   description  body copy
 *   icon         string key resolved to an SVG via ServiceIcons
 *   features     optional bullet list
 *   index        for staggered scroll-reveal delays
 *
 * Design language:
 *   - Glass-dark: surface bg with white/6% border + subtle backdrop blur.
 *   - Orange icon at the top of the card.
 *   - Hover: orange border glow (box-shadow w/ primary), translateY(-4px).
 *   - The `subtitle` slot is the place to put the transformation line —
 *     e.g. "Show up like a brand, not a feed filler."
 */
export default function ServiceCard({
  title,
  subtitle,
  description,
  icon,
  features,
  index = 0,
}) {
  const Icon = getServiceIcon(icon);

  return (
    <ScrollReveal direction="up" delay={index * 90} duration={600}>
      <article
        className={[
          "group relative h-full flex flex-col",
          "p-7 md:p-9 rounded-2xl",
          // glass-dark surface
          "bg-surface/80 border border-white/[0.06] backdrop-blur-md",
          // motion
          "transition-all duration-300 ease-out",
          // hover: lift + orange glow
          "hover:-translate-y-1 hover:border-primary/40",
          "hover:shadow-[0_8px_40px_-12px_rgba(255,107,53,0.45)]",
        ].join(" ")}
      >
        {/* Icon — orange, top of card */}
        <div className="mb-6 text-primary">
          <Icon size={40} />
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight leading-[1.05] mb-3">
          {title}
        </h3>

        {/* Subtitle — transformation line, primary orange */}
        {subtitle && (
          <p className="font-body text-sm md:text-base text-primary mb-4 leading-snug">
            {subtitle}
          </p>
        )}

        {/* Description — muted body copy */}
        {description && (
          <p className="font-body text-sm md:text-base text-soft leading-relaxed mb-6">
            {description}
          </p>
        )}

        {/* Optional feature list */}
        {Array.isArray(features) && features.length > 0 && (
          <ul className="mt-auto pt-6 border-t border-white/5 space-y-2.5" role="list">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm font-body text-white/80"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </ScrollReveal>
  );
}
