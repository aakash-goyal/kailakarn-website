import { useEffect, useRef, useState } from "react";
import brand from "../../config/brand";

/**
 * FloatingButtons — sticky support layer.
 *
 * Desktop:
 *   - 56px green WhatsApp FAB, fixed bottom-right.
 *   - Subtle scale pulse + animated halo ring (CSS-only).
 *   - Hover/click expands the FAB stack upward to reveal Instagram
 *     and LinkedIn buttons. Each button slides up with a 50ms stagger
 *     and shows a tooltip on hover.
 *
 * Mobile (< 768px):
 *   - 48px FAB (slightly smaller). Tap to expand.
 *   - A sticky bottom action bar with 4 sections — WhatsApp,
 *     Instagram, Call, Email — sits ABOVE the FAB with spacing.
 *
 * All links from brand.social / brand.contact.
 * No animation libs. Pure CSS + IntersectionObserver-free behavior.
 */
export default function FloatingButtons() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Outside click closes the expanded stack (mobile)
  useEffect(() => {
    const onDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  // Esc closes the expanded stack
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const phoneHref = `tel:${brand.contact.phone.replace(/[^+\d]/g, "")}`;

  return (
    <>
      {/* ============================================================
          FAB STACK
          ============================================================ */}
      <div
        ref={wrapperRef}
        className={[
          "fixed z-50",
          isMobile ? "bottom-24 right-4" : "bottom-8 right-6",
        ].join(" ")}
        onMouseEnter={() => !isMobile && setExpanded(true)}
        onMouseLeave={() => !isMobile && setExpanded(false)}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Expanded buttons (above the WhatsApp FAB).
              Per-pill translate + opacity (no overflow clip) so
              tooltips can escape the stack. */}
          <div
            className={[
              "flex flex-col items-center gap-3",
              // Inline transition keeps tooltips from being clipped.
              expanded ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
            aria-hidden={!expanded}
          >
            <ExpandPill
              expanded={expanded}
              order={2}
              href={phoneHref}
              label="Call us"
              accent="#9CA3AF"
              icon={<PhoneIcon className="w-5 h-5 text-white" />}
            />
            <ExpandPill
              expanded={expanded}
              order={1}
              href={brand.social.linkedin}
              label="Connect on LinkedIn"
              accent="#0A66C2"
              icon={<LinkedInIcon className="w-5 h-5 text-white" />}
            />
            <ExpandPill
              expanded={expanded}
              order={0}
              href={brand.social.instagram}
              label="Follow on Instagram"
              gradient="linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
              icon={<InstagramIcon className="w-5 h-5 text-white" />}
            />
          </div>

          {/* Main WhatsApp FAB ----------------------------------- */}
          <button
            type="button"
            onClick={() => {
              if (isMobile) setExpanded((v) => !v);
              else
                window.open(brand.social.whatsapp, "_blank", "noopener,noreferrer");
            }}
            aria-label="Chat on WhatsApp"
            aria-expanded={expanded}
            className={[
              "group relative",
              "flex items-center justify-center",
              "rounded-full shadow-lg shadow-black/40",
              "transition-transform duration-200 ease-out hover:scale-110",
              "active:scale-95",
              isMobile ? "w-12 h-12" : "w-14 h-14",
              // The pulse runs on the button itself but pauses on
              // hover so it stops "fighting" the user's interaction.
              "fab-pulse hover:[animation-play-state:paused]",
            ].join(" ")}
            style={{ backgroundColor: "#25D366" }}
          >
            {/* Pulsing halo ring */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#25D366] fab-halo group-hover:[animation-play-state:paused]"
            />

            <WhatsAppIcon
              className={isMobile ? "relative w-6 h-6 text-white" : "relative w-7 h-7 text-white"}
            />

            {/* Tooltip — desktop only, anchored to the right of the FAB */}
            <span
              aria-hidden="true"
              className={[
                "hidden md:block",
                "absolute right-full mr-3 top-1/2 -translate-y-1/2",
                "px-3 py-1.5 rounded-md",
                "bg-surface text-white text-xs font-body whitespace-nowrap",
                "border border-white/10 shadow-lg shadow-black/40",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-200 pointer-events-none",
              ].join(" ")}
            >
              Chat on WhatsApp
            </span>
          </button>
        </div>
      </div>

      {/* ============================================================
          MOBILE BOTTOM BAR (< 768px)
          Sits ABOVE the FAB with adequate spacing.
          ============================================================ */}
      {isMobile && (
        <nav
          aria-label="Quick contact"
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-white/[0.06] bg-dark/85 backdrop-blur-xl"
        >
          <div className="grid grid-cols-4 h-16">
            <BarLink
              href={brand.social.whatsapp}
              external
              label="WhatsApp"
              icon={<WhatsAppIcon className="w-5 h-5 text-[#25D366]" />}
            />
            <BarLink
              href={brand.social.instagram}
              external
              label="Instagram"
              icon={<InstagramIcon className="w-5 h-5 text-pink-500" />}
            />
            <BarLink
              href={phoneHref}
              label="Call"
              icon={<PhoneIcon className="w-5 h-5 text-emerald-400" />}
            />
            <BarLink
              href={`mailto:${brand.contact.email}`}
              label="Email"
              icon={<EmailIcon className="w-5 h-5 text-blue-400" />}
            />
          </div>
        </nav>
      )}
    </>
  );
}

/* ----------------------------------------------------------------- */

function ExpandPill({ href, label, accent, gradient, icon, expanded, order = 0 }) {
  // Stagger: each pill slides up 50ms after the previous one when
  // opening, and reverses gracefully when closing.
  const delayMs = expanded ? order * 50 : (2 - order) * 30;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      tabIndex={expanded ? 0 : -1}
      className={[
        "group relative w-12 h-12 rounded-full flex items-center justify-center",
        "shadow-lg shadow-black/30",
        "transition-all duration-300 ease-out",
        // Slide-up + fade. When collapsed, push pill down behind the FAB.
        expanded
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none",
        "hover:scale-110 active:scale-95",
      ].join(" ")}
      style={{
        background: gradient || accent,
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {icon}

      {/* Tooltip — slides in to the left of the pill on hover.
          Sits outside the (now overflow-visible) wrapper. */}
      <span
        aria-hidden="true"
        className={[
          "hidden md:block",
          "absolute right-full mr-3 top-1/2 -translate-y-1/2",
          "px-3 py-1.5 rounded-md",
          "bg-surface text-white text-xs font-body whitespace-nowrap",
          "border border-white/10 shadow-lg shadow-black/40",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-200 pointer-events-none",
        ].join(" ")}
      >
        {label}
      </span>
    </a>
  );
}

function BarLink({ href, label, icon, external }) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      {...externalProps}
      aria-label={label}
      className="flex flex-col items-center justify-center gap-1 text-white/70 active:text-white transition-colors duration-200"
    >
      {icon}
      <span className="font-body text-[10px] uppercase tracking-[0.18em]">
        {label}
      </span>
    </a>
  );
}

/* ----------------------------------------------------------------- */
/* Inline icons                                                        */

function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PhoneIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
