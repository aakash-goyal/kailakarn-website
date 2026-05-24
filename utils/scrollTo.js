/**
 * scrollTo
 * --------------------------------------------------------------
 * Smooth-scrolls to a section id, offsetting for the fixed navbar.
 *
 *   scrollTo("services");
 *   scrollTo("#services");        // accepts a leading hash too
 *   scrollTo("services", { offset: 96 });
 *
 * Notes:
 *   - Reads the navbar offset from the `--navbar-height` CSS var
 *     when available, falling back to 80px.
 *   - Honors prefers-reduced-motion (jumps instead of smooth scroll).
 *   - No-ops cleanly if the target element doesn't exist or if
 *     called in an SSR / non-browser context.
 */
export const NAV_OFFSET = 80;

export default function scrollTo(sectionId, { offset } = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!sectionId) return;

  const id = String(sectionId).replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  // Resolve the navbar offset: explicit > CSS var > default.
  let navOffset = NAV_OFFSET;
  if (typeof offset === "number" && Number.isFinite(offset)) {
    navOffset = offset;
  } else if (typeof window.getComputedStyle === "function") {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--navbar-height")
      .trim();
    const parsed = parseInt(v, 10);
    if (Number.isFinite(parsed)) navOffset = parsed;
  }

  const reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Prefer scrollIntoView for native behavior; manually offset by
  // adjusting via a follow-up window.scrollBy on next frame so the
  // navbar doesn't cover the heading.
  el.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });

  if (navOffset > 0) {
    // Schedule a tiny correction after scrollIntoView starts so the
    // section's top sits below the fixed navbar.
    requestAnimationFrame(() => {
      window.scrollBy({
        top: -navOffset,
        left: 0,
        behavior: reduced ? "auto" : "smooth",
      });
    });
  }
}
