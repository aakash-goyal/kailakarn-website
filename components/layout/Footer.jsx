import Link from "next/link";
import brand from "../../config/brand";
import navigation from "../../config/navigation";
import services from "../../config/services";

/**
 * Footer.
 *
 * Visual rules:
 *   - Very dark background (#0A0A0A) — deeper than the other dark
 *     sections so the footer reads as the bottom of the page.
 *   - 4-column grid on desktop, stacked on mobile.
 *   - Bottom bar with hairline top border + auto-updating year.
 *
 * All copy / links sourced from config — never hardcoded.
 */
export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative bg-darkest border-t border-white/[0.06]"
    >
      <div className="container-wide px-4 sm:px-6 lg:px-12 pt-16 md:pt-20 pb-8">
        {/* ============================================================
            Top — 4-column grid
            ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Col 1 — brand mark + description + social row */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label={`${brand.name} — home`}
              className="group inline-flex items-center gap-2 text-white hover:text-primary transition-colors mb-5"
            >
              {brand.assets?.logo && (
                <img
                  src={brand.assets.logo}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-auto select-none"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <span className="font-heading font-bold text-2xl tracking-[-0.02em]">
                {brand.name.toUpperCase()}
                <span className="text-primary">.</span>
              </span>
            </Link>

            <p className="font-body text-soft text-sm leading-relaxed max-w-sm mb-6">
              {brand.description}
            </p>

            <div className="flex items-center gap-3">
              <SocialIcon
                href={brand.social.instagram}
                label="Follow on Instagram"
                icon={<InstagramIcon />}
              />
              <SocialIcon
                href={brand.social.linkedin}
                label="Connect on LinkedIn"
                icon={<LinkedInIcon />}
              />
              <SocialIcon
                href={brand.social.threads}
                label="Follow on Threads"
                icon={<ThreadsIcon />}
              />
              <SocialIcon
                href={brand.social.whatsapp}
                label="Chat on WhatsApp"
                icon={<WhatsAppIcon />}
              />
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <FooterColumn title="Navigation" className="lg:col-span-2">
            <ul className="flex flex-col gap-3" role="list">
              {navigation.map((link) =>
                link.type === "page" ? (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-white/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </FooterColumn>

          {/* Col 3 — Services (auto-pulled from services.js) */}
          <FooterColumn title="Services" className="lg:col-span-3">
            <ul className="flex flex-col gap-3" role="list">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="font-body text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Col 4 — Contact */}
          <FooterColumn title="Contact" className="lg:col-span-3">
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="font-body text-sm text-white/70 hover:text-primary transition-colors break-all"
                >
                  {brand.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="font-body text-sm text-white/70 hover:text-primary transition-colors"
                >
                  {brand.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={brand.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/70 hover:text-primary transition-colors"
                >
                  WhatsApp the studio
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>

        {/* ============================================================
            Bottom bar
            ============================================================ */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted">
            Built for the internet — by humans who actually use it.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------- */

function FooterColumn({ title, children, className = "" }) {
  return (
    <div className={className}>
      <h4 className="font-body text-xs uppercase tracking-[0.28em] text-white/50 mb-5">
        {title}
      </h4>
      {children}
    </div>
  );
}

function SocialIcon({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/10 text-white/70 hover:text-primary hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center transition-all duration-200 ease-out"
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

function ThreadsIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.26 1.33-3.02.88-.724 2.104-1.13 3.542-1.175 1.036-.033 1.997.06 2.876.278-.06-.96-.345-1.7-.852-2.2-.577-.57-1.422-.86-2.51-.86l-.082.001c-.825.012-1.532.25-2.104.706l-1.34-1.545c.899-.738 2.034-1.138 3.382-1.19l.12-.002c1.616 0 2.9.476 3.819 1.416.828.847 1.3 2.03 1.408 3.519.378.19.727.406 1.044.648 1.095.837 1.865 1.993 2.228 3.342.476 1.77.238 3.87-1.274 5.392C18.2 22.88 15.788 23.98 12.186 24z" />
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
