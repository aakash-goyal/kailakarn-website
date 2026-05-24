import ScrollReveal from "./ScrollReveal";

/**
 * <TestimonialCard /> — glass-dark quote card.
 *
 * Props:
 *   quote     the testimonial text (the hero of the card)
 *   name      client name
 *   role      client role/title (optional)
 *   company   company name (optional)
 *   image     client photo URL — falls back to initials avatar
 *   index     for staggered scroll-reveal delays
 *
 * Design language:
 *   - Glass-dark surface w/ subtle blur, 3px primary left border.
 *   - Oversized decorative orange quotation mark in the background.
 *   - Quote text in Inter, white, text-lg — words are the hero.
 *   - Author block: small avatar / initials + name (Clash Display
 *     semibold) + role/company (muted).
 */
export default function TestimonialCard({
  quote,
  name,
  role,
  company,
  image,
  index = 0,
}) {
  const initials = name
    ? name
        .split(/\s+/)
        .map((p) => p[0])
        .filter(Boolean)
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <ScrollReveal direction="up" delay={index * 90} duration={600}>
      <figure
        className={[
          "relative h-full flex flex-col overflow-hidden",
          "p-7 md:p-9 rounded-2xl",
          // glass-dark surface
          "bg-surface/80 border border-white/[0.06] backdrop-blur-md",
          // 3px primary left border (per spec)
          "border-l-[3px] border-l-primary",
          "transition-colors duration-300 ease-out",
          "hover:border-primary/30",
        ].join(" ")}
      >
        {/* Decorative oversized orange quote mark */}
        <span
          aria-hidden="true"
          className="absolute -top-4 -left-2 font-heading font-semibold text-primary/[0.12] text-[140px] md:text-[180px] leading-none select-none pointer-events-none"
        >
          &ldquo;
        </span>

        {/* Quote — Inter, white, text-lg, words as the hero */}
        <blockquote className="relative z-10 font-body text-white text-lg md:text-xl leading-snug mb-8 flex-1">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author block */}
        <figcaption className="relative z-10 flex items-center gap-3 pt-5 border-t border-white/5">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
              className="w-11 h-11 rounded-full object-cover border border-white/10"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center bg-primary text-dark"
              aria-hidden="true"
            >
              <span className="font-heading font-semibold text-sm">
                {initials}
              </span>
            </div>
          )}
          <div className="leading-tight">
            <p className="font-heading font-semibold text-white text-sm">
              {name}
            </p>
            {(role || company) && (
              <p className="font-body text-muted text-xs">
                {role}
                {role && company ? " · " : ""}
                {company}
              </p>
            )}
          </div>
        </figcaption>
      </figure>
    </ScrollReveal>
  );
}
