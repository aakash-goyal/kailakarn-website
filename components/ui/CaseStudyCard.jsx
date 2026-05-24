import ScrollReveal from "./ScrollReveal";
import useCounter from "../../hooks/useCounter";
import brand from "../../config/brand";

/**
 * <CaseStudyCard /> — cinematic split-layout brand story.
 *
 * Layout:
 *   Desktop: 12-column grid. Image takes ~7/12 (~55%), text ~5/12.
 *            `imagePosition="left"` puts the image on the left;
 *            `"right"` swaps the order. The section uses this to
 *            zigzag between cards.
 *   Mobile:  stacked — image on top, text below.
 *
 * Image:
 *   - 16:9 aspect ratio.
 *   - Subtle zoom-on-hover (transform scale).
 *   - Lazy loaded; gracefully falls back to a primary-tinted gradient
 *     when the asset is missing.
 *   - When `placeholder` is true, an overlay renders the "launching
 *     soon" message so the section reads intentional while real
 *     wins are being collected.
 *
 * Text side:
 *   - Tag pills row.
 *   - Brand name (Clash Display bold).
 *   - Animated before → arrow → after metrics row, both numbers
 *     count up via useCounter when the row enters the viewport.
 *   - Strategy one-liner.
 *   - "View Full Story" link with an arrow.
 *
 * Reveal direction:
 *   When the image is on the left, the whole card slides from the
 *   left ("from-left"); when it's on the right, slides from the
 *   right. Achieved by passing `direction` to ScrollReveal.
 */
export default function CaseStudyCard({
  brandName,
  image,
  tags = [],
  before,
  after,
  strategy,
  duration,
  imagePosition = "left",
  placeholder = false,
  href = "#",
  index = 0,
}) {
  const isImageLeft = imagePosition !== "right";
  // Slide cards from the side that holds their image.
  const slideDirection = isImageLeft ? "right" : "left";

  return (
    <ScrollReveal direction={slideDirection} delay={0} duration={700}>
      <article
        className={[
          "grid grid-cols-1 lg:grid-cols-12",
          "gap-8 md:gap-12 lg:gap-16",
          "items-center",
        ].join(" ")}
      >
        {/* Image -------------------------------------------------- */}
        <div
          className={[
            "lg:col-span-7",
            isImageLeft ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <CaseStudyImage
            image={image}
            brandName={brandName}
            placeholder={placeholder}
          />
        </div>

        {/* Text --------------------------------------------------- */}
        <div
          className={[
            "lg:col-span-5",
            isImageLeft ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          {/* Tag pills */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-body font-medium tracking-tight bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Brand name */}
          {brandName && (
            <h3 className="font-heading font-bold text-white text-3xl md:text-4xl lg:text-5xl tracking-[-0.025em] leading-[1.05] mb-6">
              {brandName}
            </h3>
          )}

          {/* Before → After metric row */}
          {before && after && (
            <MetricRow before={before} after={after} index={index} />
          )}

          {/* Strategy one-liner */}
          {strategy && (
            <p className="font-body text-soft text-base md:text-lg leading-relaxed mb-6">
              {strategy}
            </p>
          )}

          {/* Footer row: duration + view link */}
          <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
            <span className="font-body text-xs uppercase tracking-[0.28em] text-muted">
              {duration ? `In ${duration}` : ""}
            </span>
            <a
              href={href}
              className="group inline-flex items-center gap-2 font-heading font-medium text-primary text-sm hover:text-primary-soft transition-colors"
              aria-label={brandName ? `View full ${brandName} story` : "View full story"}
            >
              View Full Story
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

/* ----------------------------------------------------------------- */

function CaseStudyImage({ image, brandName, placeholder }) {
  return (
    <figure className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-dark">
      {/* Fallback gradient — always rendered behind the image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.35) 0%, #1B1B1B 60%, #111111 100%)",
        }}
      />

      {image ? (
        <img
          src={image}
          alt={brandName ? `${brandName} — ${brand.name} case study` : "Case study"}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}

      {/* Subtle bottom darken for any overlay text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
      />

      {/* Placeholder overlay — only when client hasn't shipped real
          assets yet. Subtle blur + intentional copy. */}
      {placeholder && (
        <div
          className="absolute inset-0 flex items-center justify-center text-center px-6 backdrop-blur-md bg-black/45"
          role="status"
        >
          <p className="font-body text-white/90 text-sm md:text-base max-w-xs leading-relaxed">
            Case studies from live projects —{" "}
            <span className="text-primary font-medium">launching soon.</span>
          </p>
        </div>
      )}
    </figure>
  );
}

/* ----------------------------------------------------------------- */

function MetricRow({ before, after, index }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-6">
      <Metric metric={before} variant="before" index={index} />
      <span
        aria-hidden="true"
        className="text-primary text-2xl md:text-3xl font-heading font-medium select-none"
      >
        →
      </span>
      <Metric metric={after} variant="after" index={index} />
    </div>
  );
}

function Metric({ metric, variant, index }) {
  // Animate the numeric portion. Suffix renders separately so we can
  // keep "K", "+", "%" etc. visible during the count.
  const target = Number.isFinite(Number(metric.number)) ? Number(metric.number) : 0;
  const { ref, displayValue } = useCounter({
    target,
    duration: 1800,
    suffix: metric.suffix || "",
  });

  const isAfter = variant === "after";
  const numberClass = [
    "font-heading font-bold tracking-[-0.02em] leading-none",
    "text-3xl md:text-4xl lg:text-5xl",
    isAfter ? "text-primary" : "text-white/70",
  ].join(" ");

  return (
    <div
      // Right-align "after" so the arrow sits between two metric blocks
      // that read inward.
      className={isAfter ? "text-right" : "text-left"}
    >
      <p ref={ref} className={numberClass} data-stagger={index}>
        {displayValue}
      </p>
      <p className="font-body text-[11px] uppercase tracking-[0.22em] text-muted mt-2">
        {metric.label}
      </p>
    </div>
  );
}
