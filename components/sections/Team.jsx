import { useRef } from "react";
import team from "../../config/team";
import ScrollReveal from "../ui/ScrollReveal";

/**
 * Team — culture / behind-the-scenes photo strip.
 *
 * Visual rules:
 *   - Warm ivory background (`bg-light` ≈ #F8F4EE) — the second
 *     light section in the page rhythm.
 *   - Heading + subtitle on the left, optional CTA arrows on the
 *     right (desktop only).
 *   - Below the heading: horizontal scroll-snap gallery with mixed
 *     image sizes (landscape / portrait / square) for that editorial
 *     photo-strip feel.
 *   - Pure CSS scroll. Arrow buttons (desktop) are sugar — they call
 *     scrollBy() on the rail; the rail still works on touch and
 *     trackpads without them.
 *   - Below the gallery: a short culture line.
 *
 * Empty state:
 *   - If no images exist yet, the gallery shows 5 ghost cards with
 *     "BTS coming soon" so the section structure stays intact.
 */
export default function Team() {
  const railRef = useRef(null);
  const images = Array.isArray(team.images) ? team.images : [];

  // CSS-only horizontal scroll — buttons just nudge the rail by
  // ~80% of its visible width.
  const scrollByDir = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: dir * Math.round(rail.clientWidth * 0.8),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="team"
      aria-label="Inside Kailakarn — culture and people"
      className="relative bg-light text-ink overflow-hidden"
    >
      {/* Tiny warmth so ivory doesn't read flat */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(40% 40% at 100% 0%, rgba(255,107,53,0.06), transparent 60%)",
        }}
      />

      <div className="relative section-padding">
        <div className="container-wide">
          {/* Heading row + (desktop) arrow buttons */}
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <div className="max-w-2xl">
              <ScrollReveal direction="up" duration={500}>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] font-body font-medium text-ink/60 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Studio life
                </span>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={80} duration={700}>
                <h2 className="font-heading font-bold text-ink text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02] mb-4">
                  {team.heading}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={160} duration={700}>
                <p className="font-body text-ink/60 text-base md:text-lg leading-relaxed">
                  {team.subtitle}
                </p>
              </ScrollReveal>
            </div>

            {/* Desktop-only arrow controls */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <ScrollArrow
                direction="left"
                onClick={() => scrollByDir(-1)}
                disabled={images.length === 0}
              />
              <ScrollArrow
                direction="right"
                onClick={() => scrollByDir(1)}
                disabled={images.length === 0}
              />
            </div>
          </div>
        </div>

        {/* Scrolling rail — full-bleed beyond container so the photo
            strip feels infinite. */}
        <ScrollReveal direction="up" delay={200} duration={700}>
          <div
            ref={railRef}
            role="region"
            aria-label="Behind the scenes gallery"
            className={[
              "no-scrollbar",
              "flex items-stretch gap-4 md:gap-5",
              // Edge padding matches the container's edges so the
              // first/last cards align with the heading column.
              "px-4 sm:px-6 lg:px-12",
              "overflow-x-auto",
              "[scroll-snap-type:x_mandatory]",
              "[-webkit-overflow-scrolling:touch]",
              "[scroll-padding-inline:1rem_1rem]",
              "sm:[scroll-padding-inline:1.5rem_1.5rem]",
              "lg:[scroll-padding-inline:3rem_3rem]",
            ].join(" ")}
          >
            {images.length > 0
              ? images.map((img, i) => (
                  <GalleryItem key={(img.src || "img") + i} image={img} />
                ))
              : Array.from({ length: 5 }).map((_, i) => (
                  <PlaceholderItem key={i} index={i} />
                ))}
          </div>
        </ScrollReveal>

        {/* Closing culture line */}
        {team.description && (
          <div className="container-wide mt-12 md:mt-16">
            <ScrollReveal direction="up" duration={700}>
              <p className="font-heading font-medium text-ink text-xl md:text-2xl lg:text-3xl tracking-[-0.02em] leading-snug max-w-3xl">
                {team.description}
              </p>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */

const SIZE_CLASSES = {
  // Tailwind doesn't ship arbitrary fixed dimensions for these tokens
  // by default, so we use bracketed utilities. Each image has a
  // shrink-0 baseline so flex doesn't squash them in the rail.
  landscape: "w-[280px] h-[200px] md:w-[400px] md:h-[280px]",
  portrait: "w-[200px] h-[280px] md:w-[280px] md:h-[400px]",
  square: "w-[240px] h-[240px] md:w-[320px] md:h-[320px]",
};

function GalleryItem({ image }) {
  const sizeClass = SIZE_CLASSES[image.size] || SIZE_CLASSES.landscape;

  return (
    <figure
      className={[
        "shrink-0 [scroll-snap-align:start]",
        sizeClass,
        "relative overflow-hidden rounded-[12px]",
        "shadow-[0_10px_30px_-12px_rgba(17,17,17,0.18)]",
        "bg-white/40 border border-ink/[0.06]",
        "transition-transform duration-300 ease-out",
        "hover:scale-[1.02]",
      ].join(" ")}
    >
      {image.src ? (
        <img
          src={image.src}
          alt={image.alt || "Behind the scenes"}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}

      {/* Soft fallback gradient — always rendered behind the image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.18) 0%, rgba(248,244,238,0.5) 60%, rgba(248,244,238,1) 100%)",
        }}
      />
    </figure>
  );
}

function PlaceholderItem({ index }) {
  // Cycle through the three sizes so the placeholder strip still
  // feels editorial, not uniform.
  const order = ["landscape", "portrait", "square", "landscape", "square"];
  const size = order[index % order.length];
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div
      className={[
        "shrink-0 [scroll-snap-align:start]",
        sizeClass,
        "relative overflow-hidden rounded-[12px]",
        "shadow-[0_10px_30px_-12px_rgba(17,17,17,0.12)]",
        "border border-ink/[0.08]",
        "flex items-center justify-center text-center px-4",
      ].join(" ")}
      role="status"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.10) 0%, rgba(248,244,238,1) 70%)",
        }}
      />
      <p className="relative font-body text-ink/55 text-sm md:text-base font-medium tracking-tight">
        BTS coming soon
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */

function ScrollArrow({ direction, onClick, disabled }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Scroll gallery left" : "Scroll gallery right"}
      className={[
        "w-11 h-11 rounded-full",
        "flex items-center justify-center",
        "border border-ink/15 text-ink/70 bg-white/40",
        "transition-all duration-200 ease-out",
        "hover:bg-ink hover:text-white hover:border-ink",
        "active:scale-95",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/40 disabled:hover:text-ink/70 disabled:hover:border-ink/15",
      ].join(" ")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ transform: isLeft ? "rotate(180deg)" : "none" }}
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
