import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import brand from "../../config/brand";
import navigation from "../../config/navigation";
import useActiveSection from "../../hooks/useActiveSection";
import scrollTo from "../../utils/scrollTo";

/**
 * Navbar — fixed, transparent over the hero, glass-dark on scroll.
 *
 * Desktop:
 *   - Wordmark left, links centered (Inter, slightly wide letter spacing).
 *   - "Let's Talk" small primary button on the right → WhatsApp.
 *   - Active section link is rendered in primary orange (driven by
 *     useActiveSection on the homepage).
 *
 * Mobile:
 *   - Hamburger animates into an X via three CSS-transformed lines.
 *   - Opens a full-screen #111 overlay (100vh) with large Clash
 *     Display links and a social icon row at the bottom.
 *   - Body scroll is locked while the menu is open.
 */
export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Section IDs for active highlighting (homepage only).
  const sectionIds = useMemo(
    () =>
      navigation
        .filter((n) => n.type === "scroll")
        .map((n) => n.href.replace("#", "")),
    []
  );
  const active = useActiveSection(router.pathname === "/" ? sectionIds : []);

  // Scroll detection — activate dark glass background past 50px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock when mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on route change.
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const handleScrollClick = useCallback(
    (e, link) => {
      if (link.type !== "scroll") return;
      e.preventDefault();
      if (router.pathname !== "/") {
        router.push(`/${link.href}`);
        return;
      }
      scrollTo(link.href);
      setOpen(false);
    },
    [router]
  );

  const isActive = (link) =>
    link.type === "page"
      ? router.pathname === link.href
      : link.href === `#${active}`;

  return (
    <>
      <header
        role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-colors duration-500 ease-out",
          scrolled
            ? "bg-dark/85 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <nav
          aria-label="Primary"
          className="container-wide px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16 md:h-20"
        >
          {/* Wordmark / logo */}
          <Link
            href="/"
            aria-label={`${brand.name} — home`}
            className="group flex items-center gap-2 text-white hover:text-primary transition-colors"
          >
            {brand.assets?.logo && (
              <img
                src={brand.assets.logo}
                alt=""
                aria-hidden="true"
                className="h-7 md:h-8 w-auto select-none"
                onError={(e) => {
                  // Logo file missing → hide gracefully, the wordmark text below carries the brand.
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <span className="font-heading font-bold text-xl md:text-2xl tracking-[-0.02em]">
              {brand.name.toUpperCase()}
              <span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navigation.map((link) => (
              <li key={link.label}>
                <NavLink
                  link={link}
                  active={isActive(link)}
                  onClick={(e) => handleScrollClick(e, link)}
                />
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href={brand.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center gap-2",
                "rounded-[10px] px-4 py-2 text-sm",
                "font-heading font-medium tracking-tight",
                "bg-primary text-dark",
                "transition-all duration-200 ease-out",
                "hover:bg-primary-soft hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]",
                "active:scale-[0.98]",
              ].join(" ")}
            >
              Let&apos;s Talk
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
          >
            <span className="sr-only">Menu</span>
            <span className="relative w-5 h-3.5 block">
              <span
                className={[
                  "absolute left-0 right-0 h-px bg-white",
                  "origin-center transition-all duration-300 ease-out",
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 right-0 h-px bg-white top-1/2 -translate-y-1/2",
                  "transition-opacity duration-200 ease-out",
                  open ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 right-0 h-px bg-white",
                  "origin-center transition-all duration-300 ease-out",
                  open
                    ? "bottom-1/2 translate-y-1/2 -rotate-45"
                    : "bottom-0",
                ].join(" ")}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-40 lg:hidden",
          "transition-opacity duration-300 ease-out",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Solid dark backdrop, full 100vh */}
        <div className="absolute inset-0 bg-dark" onClick={() => setOpen(false)} />

        <div
          className={[
            "relative h-full w-full flex flex-col px-6 pt-24 pb-10",
            "transition-transform duration-500 ease-out",
            open ? "translate-y-0" : "-translate-y-3",
          ].join(" ")}
        >
          {/* Big centered links */}
          <ul
            className="flex flex-col items-center justify-center flex-1 gap-2"
            role="list"
          >
            {navigation.map((link, i) => (
              <li key={link.label} className="w-full max-w-sm">
                {link.type === "page" ? (
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass(isActive(link))}
                    style={mobileLinkDelay(open, i)}
                  >
                    <span>{link.label}</span>
                    <span className="font-body text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollClick(e, link)}
                    className={mobileLinkClass(isActive(link))}
                    style={mobileLinkDelay(open, i)}
                  >
                    <span>{link.label}</span>
                    <span className="font-body text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Social row at the bottom */}
          <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/[0.06]">
            <SocialIconLink
              href={brand.social.instagram}
              label="Instagram"
              icon={<InstagramIcon />}
            />
            <SocialIconLink
              href={brand.social.linkedin}
              label="LinkedIn"
              icon={<LinkedInIcon />}
            />
            <SocialIconLink
              href={brand.social.whatsapp}
              label="WhatsApp"
              icon={<WhatsAppIcon />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* ----------------------------------------------------------------- */

function NavLink({ link, active, onClick }) {
  const base =
    "relative inline-flex items-center px-4 py-2 text-sm font-body font-medium tracking-[0.01em] transition-colors duration-200 ease-out";
  const stateClass = active
    ? "text-primary"
    : "text-white/70 hover:text-white";

  if (link.type === "page") {
    return (
      <Link href={link.href} className={`${base} ${stateClass}`}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} onClick={onClick} className={`${base} ${stateClass}`}>
      {link.label}
    </a>
  );
}

function mobileLinkClass(active) {
  return [
    "flex items-center justify-between gap-4",
    "py-5 px-2 border-b border-white/[0.06]",
    "font-heading font-semibold text-2xl md:text-3xl tracking-[-0.02em]",
    "transition-all duration-300 ease-out",
    active ? "text-primary" : "text-white hover:text-primary",
  ].join(" ");
}

// Stagger each menu item's entrance.
function mobileLinkDelay(open, i) {
  if (!open) return undefined;
  return {
    transitionDelay: `${i * 60}ms`,
  };
}

function SocialIconLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full border border-white/15 text-white/75 hover:text-primary hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center transition-all duration-200 ease-out"
    >
      {icon}
    </a>
  );
}

/* ----------------------------------------------------------------- */
/* Inline icons                                                        */

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
