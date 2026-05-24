import culture from "../../config/culture";
import ScrollReveal from "../ui/ScrollReveal";

/**
 * Culture — thought-leadership / editorial diagnostic.
 *
 * Visual rules:
 *   - First light section in the page rhythm (warm ivory #F8F4EE
 *     via Tailwind's `bg-light` token, which maps to brand.colors.light).
 *   - Body text on this section is dark ink (#111).
 *   - Single-column, centered, max-width ~800px so it reads like a
 *     magazine essay — not a feature list.
 *   - Massive headline → diagnostic paragraphs → punchy orange
 *     closing line that hands off to the "what Kailakarn does"
 *     sections that follow.
 *   - Paragraphs reveal in sequence as the reader scrolls in.
 */
export default function Culture() {
  const paragraphs = Array.isArray(culture.paragraphs) ? culture.paragraphs : [];

  return (
    <section
      id="culture"
      aria-label="Culture — what we believe"
      className="relative bg-light text-ink overflow-hidden"
    >
      {/* Whisper of warmth — keeps the ivory from reading flat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(45% 50% at 0% 0%, rgba(255,107,53,0.07), transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(255,107,53,0.05), transparent 60%)",
        }}
      />

      <div className="relative section-padding">
        {/* Editorial column — generous whitespace, ~800px wide */}
        <div className="max-w-[800px] mx-auto">
          {/* Headline */}
          <ScrollReveal direction="up" duration={700}>
            <h2 className="font-heading font-bold text-ink text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.02] tracking-[-0.035em] mb-16 md:mb-24">
              {culture.heading}
            </h2>
          </ScrollReveal>

          {/* Diagnostic paragraphs */}
          <div className="flex flex-col gap-12 md:gap-16">
            {paragraphs.map((p, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 140}
                duration={700}
              >
                <article>
                  <h3 className="font-heading font-semibold text-ink text-xl md:text-2xl tracking-[-0.02em] leading-tight mb-4">
                    {p.title}
                  </h3>
                  <p
                    className="font-body text-base md:text-lg leading-relaxed"
                    style={{ color: "#333333" }}
                  >
                    {p.body}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {/* Closing line — punchy orange transition */}
          {culture.closingLine && (
            <ScrollReveal direction="up" delay={paragraphs.length * 140} duration={700}>
              <p className="font-heading font-medium text-primary text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] leading-snug mt-20 md:mt-28">
                {culture.closingLine}
              </p>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
