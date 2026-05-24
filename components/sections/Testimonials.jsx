import { useEffect, useRef, useState } from "react";
import testimonials from "../../config/testimonials";
import SectionHeading from "../ui/SectionHeading";
import TestimonialCard from "../ui/TestimonialCard";

/**
 * Testimonials — "Words That Matter".
 *
 * Visual rules:
 *   - Dark background (#111111).
 *   - Heading on the left, subtitle below.
 *   - Desktop: cards laid out in a 2- or 3-column grid (clamped to
 *     `min(N, 3)` columns so 1 testimonial → 1 col, 2 → 2 cols,
 *     3+ → 3 cols).
 *   - Mobile: same cards rendered in a horizontal scroll-snap rail
 *     (`overflow-x-auto` + `[scroll-snap-type:x_mandatory]`). Dot
 *     indicator beneath shows the current slide.
 *
 * No auto-advance — entirely user-controlled, per spec.
 *
 * Each TestimonialCard already provides:
 *   - oversized orange quotation glyph at low opacity
 *   - 3px primary left border
 *   - Inter text-lg quote (the hero of the card)
 *   - initials avatar fallback when `image` is null
 *
 * The reveal stagger comes from the card's built-in ScrollReveal
 * wrapper (driven by the `index` prop).
 */
export default function Testimonials() {
  const items = Array.isArray(testimonials) ? testimonials : [];
  const count = items.length;

  // Desktop column count: clamp to 1..3 based on item count.
  const desktopCols = Math.min(Math.max(count, 1), 3);
  const desktopGridClass = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
  }[desktopCols];

  // Mobile rail state — updated by IntersectionObserver below.
  const railRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which slide is in view inside the mobile rail.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || count === 0) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Only observe inside the rail (root: rail).
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with highest intersection ratio.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = slideRefs.current.indexOf(visible.target);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      {
        root: rail,
        threshold: [0.5, 0.75, 1],
      }
    );

    const refs = slideRefs.current.filter(Boolean);
    refs.forEach((el) => observer.observe(el));
    return () => {
      refs.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [count]);

  // Click-to-scroll the rail to a slide (mobile dots).
  const scrollToSlide = (idx) => {
    const rail = railRef.current;
    const slide = slideRefs.current[idx];
    if (!rail || !slide) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({
      left: slide.offsetLeft - rail.offsetLeft,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  if (count === 0) return null;

  return (
    <section
      id="testimonials"
      aria-label="Testimonials — words from clients"
      className="relative bg-dark section-padding overflow-hidden"
    >
      {/* Faint warm wash so the dark reads distinct from neighbors. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(45% 40% at 0% 0%, rgba(255,107,53,0.06), transparent 60%)",
        }}
      />

      <div className="relative container-wide">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Testimonials"
            title="Words That Matter"
            subtitle="From the brands we've built with."
          />
        </div>

        {/* ============================================================
            DESKTOP — grid (visible md+)
            ============================================================ */}
        <div className={`hidden md:grid ${desktopGridClass} gap-6`}>
          {items.map((t, i) => (
            <TestimonialCard
              key={t.id}
              quote={t.quote}
              name={t.name}
              role={t.role}
              company={t.company}
              image={t.image}
              index={i}
            />
          ))}
        </div>

        {/* ============================================================
            MOBILE — horizontal scroll-snap rail
            ============================================================ */}
        <div className="md:hidden">
          <div
            ref={railRef}
            role="region"
            aria-label="Testimonials — swipe to read more"
            className={[
              "no-scrollbar",
              "flex items-stretch gap-4",
              "overflow-x-auto",
              "[scroll-snap-type:x_mandatory]",
              "[-webkit-overflow-scrolling:touch]",
              // Negative margin + padding gives the rail a soft inset
              // so the first/last cards align with section padding.
              "-mx-4 px-4",
              "[scroll-padding-inline:1rem_1rem]",
            ].join(" ")}
          >
            {items.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => (slideRefs.current[i] = el)}
                className="shrink-0 w-[88%] sm:w-[75%] [scroll-snap-align:start]"
                aria-roledescription="slide"
                aria-label={`Testimonial ${i + 1} of ${count}`}
              >
                <TestimonialCard
                  quote={t.quote}
                  name={t.name}
                  role={t.role}
                  company={t.company}
                  image={t.image}
                  index={i}
                />
              </div>
            ))}
          </div>

          {/* Dots indicator — only when there's more than one slide */}
          {count > 1 && (
            <div
              className="flex items-center justify-center gap-2 mt-6"
              role="tablist"
              aria-label="Testimonial slides"
            >
              {items.map((t, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => scrollToSlide(i)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={[
                      "block h-1.5 rounded-full",
                      "transition-all duration-300 ease-out",
                      isActive
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-white/25 hover:bg-white/40",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
