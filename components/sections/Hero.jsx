import brand from "../../config/brand";
import Button from "../ui/Button";
import useMousePosition from "../../hooks/useMousePosition";

/**
 * Hero — the Kailakarn opening statement.
 *
 * Design notes:
 *   - Full-bleed dark canvas with a CSS-only slow-drift gradient
 *     (.hero-gradient + @keyframes hero-drift in globals.css).
 *   - Grain texture overlay (.grain-overlay).
 *   - Mouse-reactive spotlight: useMousePosition writes --mouse-x and
 *     --mouse-y onto the section root, and .hero-spotlight reads those
 *     vars. On touch devices the hook returns 0.5/0.5 so the glow sits
 *     centered (and the @media (hover: none) rule disables tracking).
 *   - Asymmetric editorial layout: content lives in the left ~60% on
 *     desktop with generous (8-12vw) left padding; the right side is
 *     deliberately quiet space with a thin abstract bracket.
 *   - Entrance animation is pure CSS (.hero-enter + per-element
 *     `style={{ animationDelay }}`). No scroll trigger — runs on load.
 *
 * All copy comes from config/brand.js. The headline is composed from
 * `brand.taglines.heroWords` so the client can flip which word is
 * highlighted in primary orange without touching this file.
 */
export default function Hero() {
  const { ref: rootRef } = useMousePosition();
  const heroWords = Array.isArray(brand.taglines.heroWords)
    ? brand.taglines.heroWords
    : [{ text: brand.taglines.hero, highlight: false }];

  return (
    <section
      id="hero"
      ref={rootRef}
      aria-label={`${brand.name} — ${brand.tagline}`}
      className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden hero-gradient grain-overlay"
    >
      {/* ============================================================
          BACKGROUND LAYERS
          ============================================================ */}
      {/* Mouse-reactive spotlight — reads --mouse-x / --mouse-y */}
      <div className="hero-spotlight" aria-hidden="true" />

      {/* Right-side "abstract element" — vertical bracket + meta strip,
          gives the right 40% something quiet to look at without
          breaking the editorial silence. Hidden on mobile. */}
      <div
        aria-hidden="true"
        className="hidden lg:flex absolute top-0 right-0 h-full w-[34%] xl:w-[38%] z-[2] flex-col justify-between py-32 pr-[6vw]"
      >
        {/* top tick + label */}
        <div className="flex items-start justify-end gap-3 text-white/50">
          <span className="font-body text-[11px] uppercase tracking-[0.32em]">
            Studio
          </span>
          <span className="block w-px h-10 bg-white/20" />
        </div>

        {/* large vertical line — the only "decorative" element */}
        <div className="self-end mr-2 w-px h-[40%] bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

        {/* bottom meta */}
        <div className="flex items-end justify-end gap-3 text-white/50">
          <span className="font-body text-[11px] uppercase tracking-[0.32em] text-right max-w-[18ch] leading-relaxed">
            Booking
            <br />
            2026 brands
          </span>
          <span className="block w-px h-10 bg-white/20" />
        </div>
      </div>

      {/* ============================================================
          CONTENT — left 60% on desktop, full width on mobile
          ============================================================ */}
      <div
        className={[
          "relative z-10",
          "w-full lg:w-[66%] xl:w-[62%]",
          "py-32 md:py-40",
          // editorial left padding — 8-12% of viewport
          "pl-6 sm:pl-10 lg:pl-[8vw] xl:pl-[10vw]",
          "pr-6 sm:pr-10",
        ].join(" ")}
      >
        {/* Pre-heading: brand name as a wordmark eyebrow */}
        <p
          className="hero-enter font-body text-primary text-xs sm:text-sm uppercase tracking-[0.4em] mb-6 md:mb-8"
          style={{ animationDelay: "0ms" }}
        >
          {brand.name.toUpperCase()}
        </p>

        {/* Main headline — composed from heroWords config */}
        <h1
          className={[
            "font-heading font-bold text-white",
            "text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl",
            "leading-[0.95] tracking-[-0.035em]",
            "max-w-[18ch]",
          ].join(" ")}
        >
          {heroWords.map((segment, i) => (
            <span
              key={i}
              className={[
                "hero-enter inline",
                segment.highlight ? "text-primary" : "text-white",
              ].join(" ")}
              // Stagger word-by-word starting 200ms after pre-heading
              style={{ animationDelay: `${200 + i * 120}ms` }}
            >
              {segment.text}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="hero-enter font-body text-soft text-base sm:text-lg md:text-xl leading-relaxed mt-6 md:mt-8 max-w-xl"
          style={{ animationDelay: "400ms" }}
        >
          {brand.taglines.heroSub}
        </p>

        {/* CTAs */}
        <div
          className="hero-enter flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-10 md:mt-12"
          style={{ animationDelay: "600ms" }}
        >
          <Button
            href="#contact"
            variant="primary"
            size="lg"
            fullWidth
            className="sm:!w-auto"
          >
            Build Your Brand
          </Button>
          <Button
            href="#case-studies"
            variant="outline"
            size="lg"
            fullWidth
            className="sm:!w-auto"
          >
            See the Work
          </Button>
        </div>

        {/* Trust line — config-driven */}
        {brand.taglines.heroTrust && (
          <p
            className="hero-enter font-body text-muted text-xs sm:text-sm mt-8 md:mt-10 flex items-center gap-2"
            style={{ animationDelay: "750ms" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
            {brand.taglines.heroTrust}
          </p>
        )}
      </div>
    </section>
  );
}
