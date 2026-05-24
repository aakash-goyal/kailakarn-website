import services from "../../config/services";
import brand from "../../config/brand";
import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "../ui/ServiceCard";
import Button from "../ui/Button";
import ScrollReveal from "../ui/ScrollReveal";
import { getServiceIcon } from "../ui/ServiceIcons";

/**
 * Services — "What We Build". Editorial framing, not "Our Services".
 *
 * Layout:
 *   - Dark background (#111111).
 *   - Standard service cards render in a 2-column grid (3 rows of 2).
 *   - The consultation card (entry with `isConsultation: true`)
 *     drops onto its own row at full-width with a different
 *     treatment — it's the section's CTA.
 *   - 24px gap between cards on mobile/desktop.
 *
 * Reveal:
 *   - Each ServiceCard fades in with a stagger via its built-in
 *     ScrollReveal wrapper.
 *   - The consultation card has its own fade-in.
 */
export default function Services() {
  const items = Array.isArray(services) ? services : [];
  const standard = items.filter((s) => !s.isConsultation);
  const consultation = items.find((s) => s.isConsultation);

  return (
    <section
      id="services"
      aria-label="Services — what we build"
      className="relative bg-dark section-padding overflow-hidden"
    >
      {/* Faint orange wash, top-right — keeps the dark from reading flat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(50% 40% at 100% 0%, rgba(255,107,53,0.07), transparent 60%)",
        }}
      />

      <div className="relative container-wide">
        {/* Heading — "What We Build", not "Our Services" */}
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Capabilities"
            title="What We Build"
            subtitle="Not services. Growth systems."
          />
        </div>

        {/* Standard cards — 2-col grid, 24px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {standard.map((s, i) => (
            <ServiceCard
              key={s.id}
              title={s.title}
              subtitle={s.subtitle}
              description={s.description}
              icon={s.icon}
              features={s.features}
              index={i}
            />
          ))}
        </div>

        {/* Consultation card — full-width, on its own row */}
        {consultation && (
          <div className="mt-6">
            <ConsultationCard data={consultation} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */

/**
 * The bottom card. Visually distinct from the regular service cards:
 *   - Full-width (its own row).
 *   - Subtle orange gradient background.
 *   - Solid primary border (not a hairline white border).
 *   - Big inviting CTA button.
 *   - Reads like an invitation, not "Service #7".
 */
function ConsultationCard({ data }) {
  const Icon = getServiceIcon(data.icon);
  const ctaHref = brand.social?.whatsapp || "#contact";

  return (
    <ScrollReveal direction="up" duration={650}>
      <article
        className={[
          "relative overflow-hidden",
          "rounded-2xl border border-primary/40",
          "p-7 md:p-10 lg:p-12",
          "transition-all duration-300 ease-out",
          "hover:border-primary/60 hover:shadow-[0_8px_50px_-12px_rgba(255,107,53,0.45)]",
        ].join(" ")}
        style={{
          // Subtle orange-tinted background that still reads "card on dark"
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.10) 0%, rgba(27,27,27,0.95) 60%, rgba(17,17,17,1) 100%)",
        }}
      >
        {/* Soft glow blob in the top-right */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,107,53,0.25), transparent 70%)",
          }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left: icon + copy */}
          <div className="lg:col-span-8">
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                <Icon size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-bold text-white text-2xl md:text-3xl lg:text-4xl tracking-[-0.025em] leading-[1.1] mb-2">
                  {data.title}
                </h3>
                <p className="font-body text-primary text-sm md:text-base mb-4 leading-snug">
                  {data.subtitle}
                </p>
                <p className="font-body text-soft text-base md:text-lg leading-relaxed max-w-2xl">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Features as understated tag pills */}
            {Array.isArray(data.features) && data.features.length > 0 && (
              <ul
                className="flex flex-wrap gap-2 mt-6 pl-0 lg:pl-[68px]"
                role="list"
              >
                {data.features.map((f, i) => (
                  <li
                    key={i}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-body font-medium tracking-tight bg-white/5 text-white/80 border border-white/[0.08]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: CTA */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
            <Button href={ctaHref} variant="primary" size="lg">
              Let&apos;s Talk
            </Button>
            <a
              href="#contact"
              className="font-body text-xs uppercase tracking-[0.28em] text-muted hover:text-primary transition-colors"
            >
              or send a brief →
            </a>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
