import Head from "next/head";
import Link from "next/link";
import brand from "../config/brand";
import about from "../config/about";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingButtons from "../components/layout/FloatingButtons";
import ScrollReveal from "../components/ui/ScrollReveal";
import Button from "../components/ui/Button";
import Framework from "../components/sections/Framework";

/**
 * About page.
 *
 * Sections (in order):
 *   1. Page hero — 50vh, dark, centered title + breadcrumb
 *   2. Story    — warm ivory, two-column (text 60% / visual 40%)
 *   3. Values   — dark, glass-dark cards with orange icons
 *   4. Framework — reuses the homepage component as a standalone beat
 *   5. Bottom CTA — subtle orange gradient
 *
 * All copy comes from config/about.js.
 */
export default function About() {
  const heroSubtitle = about.hero.subtitle || brand.description;
  const ctaHref = about.cta.primary.href || brand.social.whatsapp;

  return (
    <>
      <Head>
        <title>{`About — ${brand.name}`}</title>
        <meta
          name="description"
          content={`Inside ${brand.fullName}. ${brand.description}`}
        />
        <meta property="og:title" content={`About — ${brand.name}`} />
        <meta
          property="og:description"
          content={`Inside ${brand.fullName} — the studio behind the brand.`}
        />
        <link rel="canonical" href={`${brand.seo.url}/about`} />
      </Head>

      <Navbar />

      <main id="main-content">
        <AboutHero subtitle={heroSubtitle} />
        <AboutStory />
        <AboutValues />
        <Framework />
        <AboutCTA ctaHref={ctaHref} />
      </main>

      <Footer />
      <FloatingButtons />
    </>
  );
}

/* ----------------------------------------------------------------- */
/* Hero — 50vh                                                         */

function AboutHero({ subtitle }) {
  return (
    <section
      aria-label="About — page hero"
      className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-dark grain-overlay"
    >
      {/* Background mesh */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-surface" />
        <div className="absolute top-1/3 right-1/4 w-[440px] h-[440px] rounded-full bg-primary/[0.08] blur-[140px] animate-mesh-1" />
      </div>

      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-12 pt-28 pb-16 md:pt-32 md:pb-20 w-full">
        {/* Breadcrumb — sits in normal flow at the top of the hero
            so it never overlaps the centered headline below. */}
        <ScrollReveal direction="up" duration={500}>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/50 font-body mb-12 md:mb-16"
          >
            {about.hero.breadcrumb.map((crumb, i) => {
              const isLast = i === about.hero.breadcrumb.length - 1;
              return (
                <span key={crumb.href} className="flex items-center gap-2">
                  {!isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-primary transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                  {!isLast && <span aria-hidden="true">/</span>}
                </span>
              );
            })}
          </nav>
        </ScrollReveal>

        {/* Centered title block */}
        <div className="text-center max-w-3xl mx-auto">
          <ScrollReveal direction="up" delay={80} duration={700}>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-body text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              The studio
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} duration={800}>
            <h1 className="font-heading font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.035em] leading-[0.98] mb-6">
              {about.hero.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250} duration={700}>
            <p className="font-body text-soft text-base md:text-lg lg:text-xl leading-relaxed">
              {subtitle}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/* Story — warm ivory, two-column                                     */

function AboutStory() {
  return (
    <section
      aria-label="Our story"
      className="relative bg-light text-ink overflow-hidden"
    >
      {/* Whisper of warmth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(45% 50% at 0% 0%, rgba(255,107,53,0.07), transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(255,107,53,0.05), transparent 60%)",
        }}
      />

      <div className="relative section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* TEXT — 60% */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="up" duration={500}>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-body text-ink/60 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {about.story.eyebrow}
                </span>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={80} duration={700}>
                <h2 className="font-heading font-bold text-ink text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] leading-[1.02] mb-8">
                  {about.story.heading}
                </h2>
              </ScrollReveal>

              <div className="flex flex-col gap-5">
                {about.story.paragraphs.map((p, i) => (
                  <ScrollReveal
                    key={i}
                    direction="up"
                    delay={120 + i * 80}
                    duration={700}
                  >
                    <p
                      className="font-body text-base md:text-lg leading-relaxed"
                      style={{ color: i === about.story.paragraphs.length - 1 ? "#666666" : "#333333" }}
                    >
                      {p}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* VISUAL — 40% */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="up" delay={150} duration={700}>
                <StoryVisual highlight={about.story.highlight} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryVisual({ highlight }) {
  return (
    <figure className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden border border-ink/10 shadow-[0_30px_60px_-30px_rgba(17,17,17,0.18)]">
      {/* Layered abstract background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #F8F4EE 40%, rgba(255,107,53,0.30) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top corner meta */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-ink/55 font-body">
        <span>Studio</span>
        <span>EST. {new Date().getFullYear() - 2}</span>
      </div>

      {/* Center stat */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="font-heading font-bold text-primary text-7xl md:text-8xl tracking-[-0.04em] leading-none mb-3">
          {highlight.value}
        </p>
        <p className="font-body text-ink/70 text-sm uppercase tracking-[0.28em]">
          {highlight.label}
        </p>
      </div>

      {/* Bottom corner meta */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-ink/55 font-body">
        <span>{highlight.caption}</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
    </figure>
  );
}

/* ----------------------------------------------------------------- */
/* Values — dark grid                                                 */

function AboutValues() {
  const items = Array.isArray(about.values?.items) ? about.values.items : [];

  return (
    <section
      aria-label="Our values"
      className="relative bg-dark section-padding overflow-hidden"
    >
      {/* Subtle warm wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(45% 50% at 100% 0%, rgba(255,107,53,0.07), transparent 60%)",
        }}
      />

      <div className="relative container-wide">
        <div className="max-w-3xl">
          <ScrollReveal direction="up" duration={500}>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-body text-primary mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {about.values.eyebrow}
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={80} duration={700}>
            <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[0.98] mb-6">
              {about.values.heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={160} duration={700}>
            <p className="font-body text-soft text-base md:text-lg leading-relaxed mb-12 md:mb-16">
              {about.values.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((v, i) => (
            <ScrollReveal
              key={i}
              direction="up"
              delay={i * 90}
              duration={650}
            >
              <article
                className={[
                  "h-full p-6 md:p-7 rounded-2xl",
                  "bg-surface/80 border border-white/[0.06] backdrop-blur-md",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-primary/40",
                  "hover:shadow-[0_8px_40px_-12px_rgba(255,107,53,0.4)]",
                ].join(" ")}
              >
                <div className="text-primary mb-5">
                  <ValueIcon name={v.icon} />
                </div>
                <h3 className="font-heading font-semibold text-white text-lg md:text-xl tracking-tight mb-2">
                  {v.title}
                </h3>
                <p className="font-body text-soft text-sm md:text-base leading-relaxed">
                  {v.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/* Bottom CTA                                                          */

function AboutCTA({ ctaHref }) {
  return (
    <section
      aria-label="Bottom call to action"
      className="relative overflow-hidden"
      style={{
        // Subtle orange gradient backdrop
        background:
          "radial-gradient(60% 80% at 50% 50%, rgba(255,107,53,0.18), rgba(17,17,17,1) 70%)",
        backgroundColor: "#111111",
      }}
    >
      {/* Hairline framing */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative container-wide px-4 sm:px-6 lg:px-12 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <ScrollReveal direction="up" duration={500}>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-body text-primary mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {about.cta.eyebrow}
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80} duration={700}>
            <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.035em] leading-[1.02] mb-5">
              {about.cta.heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} duration={700}>
            <p className="font-body text-soft text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
              {about.cta.body}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={220} duration={700}>
            <Button href={ctaHref} variant="primary" size="lg">
              {about.cta.primary.label}
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/* Value icons — line-style SVGs (24×24, stroke-width 1.5)            */

function ValueIcon({ name }) {
  const Comp = ICONS[name] || ICONS.data;
  return <Comp />;
}

const sharedSvgProps = {
  width: 36,
  height: 36,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const ICONS = {
  // Data → bar chart climbing right
  data: () => (
    <svg {...sharedSvgProps}>
      <path d="M3 20h18" />
      <path d="M5 20V13" />
      <path d="M10 20V9" />
      <path d="M15 20V11" />
      <path d="M20 20V5" />
    </svg>
  ),
  // Culture → orbit / community
  culture: () => (
    <svg {...sharedSvgProps}>
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
    </svg>
  ),
  // Transparent → eye + line
  transparent: () => (
    <svg {...sharedSvgProps}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  // Always-on → 24h dial
  "always-on": () => (
    <svg {...sharedSvgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
    </svg>
  ),
  // Craft — pen nib (extra option)
  craft: () => (
    <svg {...sharedSvgProps}>
      <path d="M14 4l6 6-10 10H4v-6L14 4z" />
      <line x1="13" y1="6" x2="18" y2="11" />
    </svg>
  ),
  // Compass — direction (extra option)
  compass: () => (
    <svg {...sharedSvgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7l2 5-2 5-2-5z" fill="currentColor" stroke="none" />
    </svg>
  ),
};
