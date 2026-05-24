import brand from "../../config/brand";
import Button from "../ui/Button";
import ScrollReveal from "../ui/ScrollReveal";

/**
 * FinalCTA — the "breathing moment" before the form.
 *
 * Visual rules:
 *   - Dark canvas with a barely-there orange radial in the center.
 *   - Generous vertical padding (≥120px desktop, ≥80px mobile).
 *   - Maximum whitespace. Nothing else competes with the line + CTA.
 *
 * Content:
 *   - One headline composed from `brand.taglines.ctaWords` so the
 *     client can swap which word(s) render in primary orange.
 *   - One button: "Let's Build" → contact section.
 *
 * Reveal:
 *   - Headline fades up first, button fades up after.
 */
export default function FinalCTA() {
  const ctaWords = Array.isArray(brand.taglines?.ctaWords)
    ? brand.taglines.ctaWords
    : [{ text: brand.taglines?.cta || "", highlight: false }];

  return (
    <section
      id="final-cta"
      aria-label="Final call to action"
      className="relative bg-dark overflow-hidden"
    >
      {/* Very subtle centered orange glow — barely visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 50% at 50% 50%, rgba(255,107,53,0.07), transparent 60%)",
        }}
      />

      <div className="relative px-4 sm:px-6 lg:px-12 py-20 md:py-32">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Headline */}
            <ScrollReveal direction="up" duration={800}>
              <h2 className="font-heading font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl tracking-[-0.035em] leading-[1.02]">
                {ctaWords.map((seg, i) => (
                  <span
                    key={i}
                    className={seg.highlight ? "text-primary" : "text-white"}
                  >
                    {seg.text}
                  </span>
                ))}
              </h2>
            </ScrollReveal>

            {/* CTA button */}
            <ScrollReveal direction="up" delay={200} duration={700}>
              <div className="mt-12 md:mt-16">
                <Button href="#contact" variant="primary" size="lg">
                  Let&apos;s Build
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
