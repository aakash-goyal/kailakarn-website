import { forwardRef, useEffect, useRef, useState } from "react";
import brand from "../../config/brand";
import ScrollReveal from "../ui/ScrollReveal";

/**
 * Framework — the A.T.T.N. methodology.
 *
 * Layout:
 *   Desktop (lg+): two columns. Left 40% is sticky; the right 60%
 *                  is the scrollable narrative of 4 steps.
 *   Mobile:        single column, heading on top, steps stacked.
 *
 * Activation (no scroll hijacking):
 *   A single IntersectionObserver tracks which step occupies the
 *   "active band" of the viewport (top-third area). The most-visible
 *   step becomes the active one. Each step then gets one of three
 *   states based on its index relative to active:
 *     - above  → already passed, stays fully visible
 *     - active → background letter brightens, title goes white,
 *                a 3px orange left border appears
 *     - below  → not reached yet, muted (opacity 0.3)
 *
 * All step content (letter, title, description) comes from
 * brand.framework.steps in config/brand.js.
 */
export default function Framework() {
  const { framework } = brand;
  const steps = Array.isArray(framework?.steps) ? framework.steps : [];

  const stepRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (steps.length === 0) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Track each step's latest intersection ratio so we can pick the
    // most-visible one in a single pass.
    const ratios = new Array(steps.length).fill(0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = stepRefs.current.indexOf(entry.target);
          if (idx === -1) continue;
          ratios[idx] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }

        let bestIdx = -1;
        let bestRatio = 0;
        for (let i = 0; i < ratios.length; i++) {
          if (ratios[i] > bestRatio) {
            bestRatio = ratios[i];
            bestIdx = i;
          }
        }

        if (bestIdx >= 0) {
          setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
        }
      },
      {
        // Active band sits in the top third of the viewport so the
        // step "lights up" the moment it reaches eye level.
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const refs = stepRefs.current.filter(Boolean);
    refs.forEach((el) => observer.observe(el));

    return () => {
      refs.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [steps.length]);

  if (steps.length === 0) return null;

  return (
    <section
      id="framework"
      aria-label={framework.name}
      className="relative bg-dark text-white overflow-hidden"
    >
      {/* Subtle warmth so this dark section reads distinct from
          the next/previous dark beats. Decorative only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(45% 40% at 100% 0%, rgba(255,107,53,0.07), transparent 60%)",
        }}
      />

      <div className="relative section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* ============================================================
                LEFT COLUMN — sticky on desktop
                ============================================================ */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <ScrollReveal direction="up" duration={600}>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] font-body font-medium text-primary mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {framework.name}
                  </span>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={80} duration={700}>
                  <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.02] mb-6">
                    How We Build
                    <br />
                    Unforgettable Brands
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={160} duration={700}>
                  <p className="font-body text-soft text-base md:text-lg leading-relaxed max-w-md">
                    {framework.tagline}
                  </p>
                </ScrollReveal>

                {/* Step indicator dots — quiet visual progress meter
                    that updates with the active step. Desktop only. */}
                <div className="hidden lg:flex items-center gap-3 mt-12">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className={[
                        "block h-px transition-all duration-500 ease-out",
                        i === activeIndex
                          ? "w-12 bg-primary"
                          : i < activeIndex
                          ? "w-6 bg-white/40"
                          : "w-6 bg-white/15",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>
            </aside>

            {/* ============================================================
                RIGHT COLUMN — scrolling steps
                ============================================================ */}
            <div className="lg:col-span-7">
              <ol className="flex flex-col" role="list">
                {steps.map((step, i) => {
                  const state =
                    i === activeIndex
                      ? "active"
                      : i < activeIndex
                      ? "above"
                      : "below";

                  return (
                    <FrameworkStep
                      key={i}
                      step={step}
                      index={i}
                      isFirst={i === 0}
                      state={state}
                      ref={(el) => (stepRefs.current[i] = el)}
                    />
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

/**
 * Single framework step.
 *
 * The huge background letter is positioned absolutely and tinted via
 * `opacity` — 0.15 by default, 0.4 when active. The orange left border
 * fades in only when active. Color/opacity changes are CSS transitions
 * so the activation feels smooth as it scrolls into the band.
 */
const FrameworkStep = forwardRef(function FrameworkStep(
  { step, index, isFirst, state },
  ref
) {
  // Map state → visual tokens
  const isActive = state === "active";
  const isBelow = state === "below";

  return (
    <li
      ref={ref}
      data-state={state}
      className={[
        "relative",
        // Vertical padding ≥ 60px between steps as per spec
        isFirst ? "pt-0 pb-16 md:pb-24" : "py-16 md:py-24",
        // Border between steps (1px white at ~6% opacity)
        isFirst ? "" : "border-t border-white/[0.06]",
        // Subtle orange left border that appears only when active
        "border-l-[3px]",
        isActive ? "border-l-primary" : "border-l-transparent",
        "pl-6 md:pl-10",
        // Below-the-active dimming + transition
        "transition-all duration-500 ease-out",
        isBelow ? "opacity-30" : "opacity-100",
      ].join(" ")}
    >
      {/* Massive decorative letter ------------------------------- */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none select-none",
          "absolute right-2 sm:right-4 md:right-8 top-6 md:top-10",
          "font-heading font-bold text-primary",
          "text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem]",
          "leading-none tracking-tightest",
          "transition-opacity duration-500 ease-out",
          isActive ? "opacity-40" : "opacity-[0.15]",
        ].join(" ")}
      >
        {step.letter}
      </span>

      {/* Step body --------------------------------------------- */}
      <div className="relative z-10 max-w-[36rem]">
        {/* Step number — tiny editorial cue */}
        <span className="block font-body text-xs uppercase tracking-[0.32em] text-muted mb-4">
          Step {String(index + 1).padStart(2, "0")}
        </span>

        {/* Title — color shifts based on active state */}
        <h3
          className={[
            "font-heading font-bold text-2xl md:text-3xl tracking-[-0.02em] leading-tight mb-4",
            "transition-colors duration-500 ease-out",
            isActive ? "text-white" : "text-soft",
          ].join(" ")}
        >
          {step.title}
        </h3>

        <p className="font-body text-soft text-base md:text-lg leading-relaxed">
          {step.description}
        </p>
      </div>
    </li>
  );
});
