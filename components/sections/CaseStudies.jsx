import caseStudies, { placeholder } from "../../config/caseStudies";
import SectionHeading from "../ui/SectionHeading";
import CaseStudyCard from "../ui/CaseStudyCard";

/**
 * CaseStudies — cinematic alternating-layout brand stories.
 *
 * Visual rules:
 *   - Slightly lighter dark background (`bg-surface` ≈ #1B1B1B) so
 *     this section reads distinct from the surrounding #111 sections.
 *   - Significant vertical space between cards (zigzag editorial rhythm).
 *   - Alternating image position: card 0 → image left, card 1 → right,
 *     card 2 → left, etc.
 *   - Cards slide in from the side that holds their image.
 *   - When `placeholder` is true (config flag), each card overlays the
 *     "launching soon" copy so the section structure stays intentional.
 */
export default function CaseStudies() {
  const items = Array.isArray(caseStudies) ? caseStudies : [];

  return (
    <section
      id="case-studies"
      aria-label="Case studies — real client stories"
      className="relative bg-surface section-padding overflow-hidden"
    >
      {/* Soft warm wash so the surface reads "warm dark", not flat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(50% 50% at 0% 100%, rgba(255,107,53,0.06), transparent 60%)",
        }}
      />

      <div className="relative container-wide">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Selected work"
            title="Real Stories. Real Growth."
            subtitle="Not just metrics. Transformations."
          />
        </div>

        {/* Cards — generous vertical breathing room between */}
        <div className="flex flex-col gap-24 md:gap-32 lg:gap-40 mt-4">
          {items.map((cs, i) => (
            <CaseStudyCard
              key={cs.id || i}
              brandName={cs.brandName}
              image={cs.image}
              tags={cs.tags}
              before={cs.before}
              after={cs.after}
              strategy={cs.strategy}
              duration={cs.duration}
              imagePosition={i % 2 === 0 ? "left" : "right"}
              placeholder={placeholder}
              href={cs.href || "#"}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
