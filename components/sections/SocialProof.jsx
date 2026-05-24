import socialProof from "../../config/socialProof";
import ScrollReveal from "../ui/ScrollReveal";

/**
 * SocialProof — living proof, not a logo strip.
 *
 * - Dark canvas (slightly lighter than the hero's #111 — uses
 *   `bg-surface` ≈ #1B1B1B for a subtle separation between sections).
 * - No formal section heading. Just one punchy centered line in
 *   Clash Display, sourced from config/socialProof.js.
 * - Layout adapts to the number of items:
 *     0 images   → ghost placeholder cards (3 of them)
 *     1-3 images → centered row
 *     4+ images  → CSS-columns masonry (no JS lib)
 * - Hover: scale(1.03) + soft orange border glow.
 * - All <img> tags use loading="lazy" + fade-in via ScrollReveal.
 */
export default function SocialProof() {
  const images = Array.isArray(socialProof.images) ? socialProof.images : [];
  const count = images.length;

  return (
    <section
      id="social-proof"
      aria-label="Social proof — recent results"
      className="relative bg-surface section-padding overflow-hidden"
    >
      {/* Subtle ambient orange wash so the section reads "warm dark"
          rather than flat charcoal. Decorative only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,107,53,0.06), transparent 60%)",
        }}
      />

      <div className="relative container-wide">
        {/* Punchy heading — config-driven */}
        <ScrollReveal direction="up" duration={600}>
          <h2 className="font-heading font-medium text-white text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] mx-auto max-w-3xl mb-12 md:mb-20">
            {socialProof.heading}
          </h2>
        </ScrollReveal>

        {/* Body — switches layout based on item count */}
        {count === 0 && <EmptyState message={socialProof.emptyMessage} />}
        {count > 0 && count < 4 && <RowLayout images={images} />}
        {count >= 4 && <MasonryLayout images={images} />}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */
/* Layouts                                                        */
/* ------------------------------------------------------------ */

/**
 * 4+ images → CSS-columns masonry.
 * `column-count` + `break-inside-avoid` lets each tile keep its
 * natural aspect ratio while items pack tightly across columns.
 * No JS, no measurement, no library.
 */
function MasonryLayout({ images }) {
  return (
    <div
      className={[
        "[column-fill:_balance]",
        "columns-2 md:columns-3 lg:columns-4",
        "gap-4 md:gap-5",
      ].join(" ")}
    >
      {images.map((img, i) => (
        <ScrollReveal
          key={(img.src || "img") + i}
          direction="up"
          delay={i * 80}
          duration={600}
          className="mb-4 md:mb-5 break-inside-avoid"
        >
          <ProofTile image={img} />
        </ScrollReveal>
      ))}
    </div>
  );
}

/**
 * 1-3 images → simple centered row, max-width clamp so nothing
 * stretches too wide on big screens.
 */
function RowLayout({ images }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
      {images.map((img, i) => (
        <ScrollReveal
          key={(img.src || "img") + i}
          direction="up"
          delay={i * 100}
          duration={600}
          className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] max-w-md"
        >
          <ProofTile image={img} />
        </ScrollReveal>
      ))}
    </div>
  );
}

/**
 * Empty state — three "ghost" tiles so the section keeps its weight
 * while screenshots are being gathered.
 */
function EmptyState({ message }) {
  const placeholders = [0, 1, 2];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
      {placeholders.map((i) => (
        <ScrollReveal
          key={i}
          direction="up"
          delay={i * 100}
          duration={600}
        >
          <div
            className={[
              "relative aspect-[4/5] rounded-lg overflow-hidden",
              "bg-dark border border-white/[0.06]",
              "flex items-center justify-center text-center px-5",
            ].join(" ")}
            role="status"
          >
            {/* Decorative gradient so the tile doesn't read empty */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(80% 60% at 50% 0%, rgba(255,107,53,0.10), transparent 60%)",
              }}
            />
            <p className="relative font-body text-soft text-xs md:text-sm leading-relaxed">
              {message || "Results loading…"}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Tile                                                           */
/* ------------------------------------------------------------ */

/**
 * Individual screenshot tile.
 * - Rounded corners (8px = rounded-lg).
 * - Hover: scale(1.03) + soft orange border glow.
 * - Lazy loaded; falls back to a gradient when an image is missing.
 */
function ProofTile({ image }) {
  return (
    <figure
      className={[
        "group relative block w-full overflow-hidden",
        "rounded-lg border border-white/[0.06]",
        "bg-dark",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.03]",
        "hover:border-primary/40",
        "hover:shadow-[0_8px_40px_-12px_rgba(255,107,53,0.5)]",
      ].join(" ")}
    >
      {image.src ? (
        <img
          src={image.src}
          alt={image.alt || "Engagement screenshot"}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
          onError={(e) => {
            // Hide a broken image — the tile background still reads cleanly.
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        // No src → soft fallback so masonry still gets a tile.
        <div
          aria-hidden="true"
          className="aspect-[4/5] w-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,107,53,0.18) 0%, #111111 70%)",
          }}
        />
      )}
    </figure>
  );
}
