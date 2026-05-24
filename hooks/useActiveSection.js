import { useEffect, useState } from "react";

/**
 * useActiveSection
 * --------------------------------------------------------------
 * Tracks which of the given section IDs is currently in the
 * top portion of the viewport. Used by the navbar to highlight
 * the active link.
 *
 *   const active = useActiveSection(["hero", "services", "contact"]);
 *
 * Behavior:
 *   - One IntersectionObserver instance, observes all sections.
 *   - rootMargin pulls the active band toward the top of the
 *     viewport so links flip the moment a section reaches it.
 *   - Picks the entry with the highest intersection ratio when
 *     multiple sections are visible at once (smooth handoff).
 *   - Cleans up the observer on unmount or when the IDs change.
 */
export default function useActiveSection(sectionIds = []) {
  const ids = Array.isArray(sectionIds) ? sectionIds : [];
  const key = ids.join("|");
  const [active, setActive] = useState(ids[0] || "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (ids.length === 0) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Track each section's latest intersection ratio so we can pick
    // the most-visible one in a single pass.
    const ratios = new Map(ids.map((id) => [id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        // Pick the section with the highest current ratio.
        let bestId = "";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId) {
          setActive((prev) => (prev === bestId ? prev : bestId));
        }
      },
      {
        // Active band sits in the top ~40% of the viewport.
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const observed = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    });

    return () => {
      observed.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
