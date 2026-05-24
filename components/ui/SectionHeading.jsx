import ScrollReveal from "./ScrollReveal";

/**
 * <SectionHeading /> — clean, editorial section header.
 *
 * Props:
 *   title       string | ReactNode — the headline
 *   subtitle    string | ReactNode — supporting copy (optional)
 *   alignment   "left" | "center" (default "left")
 *   light       boolean — true on ivory backgrounds (dark text)
 *   eyebrow     optional small label above the title
 *   maxWidth    Tailwind max-w utility for the subtitle (default "max-w-2xl")
 *   className   extra classes on the wrapper
 *
 * Design language:
 *   - Title: Clash Display, bold, large (text-2xl mobile → text-4xl+ desktop).
 *   - Subtitle: Inter, muted, regular weight.
 *   - No decorative underline bar (deliberately removed — that reads
 *     "generic agency"). Just typography and luxury spacing.
 *   - Reveals on scroll via the ScrollReveal wrapper.
 */
export default function SectionHeading({
  title,
  subtitle,
  alignment = "left",
  light = false,
  eyebrow,
  maxWidth = "max-w-2xl",
  className = "",
}) {
  const alignClasses =
    alignment === "center" ? "text-center items-center" : "text-left items-start";

  // Color tokens follow brand config via Tailwind theme aliases.
  // light=true → dark ink on ivory. light=false → white on dark.
  const titleColor = light ? "text-ink" : "text-white";
  const subColor = light ? "text-ink/60" : "text-soft";
  const eyebrowColor = light ? "text-ink/60" : "text-primary";

  return (
    <div className={`flex flex-col ${alignClasses} mb-12 md:mb-16 ${className}`}>
      {eyebrow && (
        <ScrollReveal direction="up" duration={500}>
          <span
            className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-body font-medium mb-5 ${eyebrowColor}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
        </ScrollReveal>
      )}

      {title && (
        <ScrollReveal direction="up" delay={80} duration={700}>
          <h2
            className={`font-heading font-bold ${titleColor} text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.98] tracking-[-0.03em] mb-6`}
          >
            {title}
          </h2>
        </ScrollReveal>
      )}

      {subtitle && (
        <ScrollReveal direction="up" delay={160} duration={700}>
          <p
            className={`font-body font-normal text-base md:text-lg lg:text-xl leading-relaxed ${subColor} ${maxWidth}`}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
