import { useEffect, useMemo, useRef, useState } from "react";
import brand from "../../config/brand";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";

/**
 * Contact — channel cards on the left, Google Forms-backed form on
 * the right. All field IDs / URLs / channel links are sourced from
 * config/brand.js so the client can swap them without touching JSX.
 *
 * Service dropdown is auto-built from config/services.js — adding a
 * new service there shows up here automatically.
 */
export default function Contact() {
  // Service options come from brand.contactForm.serviceOptions —
  // those strings must match the Google Form's checkbox question
  // options exactly, otherwise the Form rejects the submission.
  // Keep them in sync with the Form (see comment in config/brand.js).
  const serviceOptions = useMemo(() => {
    const list = brand.contactForm?.serviceOptions;
    return Array.isArray(list) && list.length > 0
      ? list
      : ["Not Sure - Need Consultation"];
  }, []);

  return (
    <section
      id="contact"
      aria-label="Get in touch with Kailakarn"
      className="relative bg-surface section-padding overflow-hidden"
    >
      {/* Subtle warm wash to keep the surface from reading flat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(45% 50% at 100% 0%, rgba(255,107,53,0.07), transparent 60%), radial-gradient(45% 40% at 0% 100%, rgba(255,107,53,0.05), transparent 60%)",
        }}
      />

      <div className="relative container-wide">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Get in touch"
            title="Get in Touch"
            subtitle="Choose your channel. We respond within 2 hours."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — channel cards */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" duration={650}>
              <ul className="flex flex-col gap-4" role="list">
                <ChannelCard
                  href={brand.social.whatsapp}
                  external
                  accent="#25D366"
                  title="Chat on WhatsApp"
                  meta="Fastest response"
                  icon={<WhatsAppIcon />}
                />
                <ChannelCard
                  href={brand.social.instagram}
                  external
                  // Instagram pink — matches the brand-mark gradient family
                  accent="#E1306C"
                  title="DM on Instagram"
                  meta="Follow + Message"
                  icon={<InstagramIcon />}
                />
                <ChannelCard
                  href={`mailto:${brand.contact.email}`}
                  accent="#FF6B35"
                  title="Email us"
                  meta={brand.contact.email}
                  icon={<EmailIcon />}
                />
                <ChannelCard
                  href={`tel:${brand.contact.phone.replace(/[^+\d]/g, "")}`}
                  accent="#9CA3AF"
                  title="Call directly"
                  meta={brand.contact.phone}
                  icon={<PhoneIcon />}
                />
              </ul>
            </ScrollReveal>
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={120} duration={700}>
              <ContactForm serviceOptions={serviceOptions} />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CHANNEL CARD
   ============================================================ */

function ChannelCard({ href, external, accent, title, meta, icon }) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <li>
      <a
        href={href}
        {...externalProps}
        // Per-card accent color flows through CSS vars so the hover
        // border + icon tint stay tied to the card's accent.
        style={{ "--accent": accent }}
        className={[
          "group block",
          "rounded-2xl p-5 md:p-6",
          // Glass-dark surface
          "bg-dark/60 border border-white/[0.06] backdrop-blur-md",
          "border-l-[3px]",
          // 3px left accent — uses inline color so it matches `accent`
          "transition-all duration-300 ease-out",
          "hover:-translate-y-0.5",
          "hover:border-[color:var(--accent)] hover:shadow-[0_8px_30px_-12px_var(--accent)]",
        ].join(" ")}
      >
        <div className="flex items-center gap-4">
          {/* Icon tile */}
          <div
            className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: `${accent}15`,
              color: accent,
              borderLeft: `3px solid ${accent}`,
            }}
          >
            {icon}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-heading font-medium text-white text-base md:text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
              {title}
            </p>
            <p className="font-body text-soft text-xs md:text-sm truncate">
              {meta}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
          >
            →
          </span>
        </div>
      </a>
    </li>
  );
}

/* ============================================================
   CONTACT FORM
   ============================================================ */

const initialState = {
  name: "",
  email: "",
  phone: "",
  services: [], // multi-select
  message: "",
};

function ContactForm({ serviceOptions }) {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Phone field: strip everything that isn't a digit, hard-cap at 10.
    // This prevents users from typing letters/symbols and keeps the
    // value aligned with what the Google Form's 10-digit validator
    // expects, so we never submit something the Form will reject.
    const cleaned = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setData((prev) => ({ ...prev, [name]: cleaned }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Toggle a service in the multi-select array.
  const toggleService = (svc) => {
    setData((prev) => {
      const next = prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc];
      return { ...prev, services: next };
    });
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!data.name || data.name.trim().length < 2) {
      next.name = "Tell us your name (2+ characters).";
    }
    // Phone: required, exactly 10 digits — matches the Google Form's
    // built-in regex validation so client + server agree.
    const phoneDigits = (data.phone || "").replace(/\D/g, "");
    if (!data.phone) {
      next.phone = "We need a phone number to reach you.";
    } else if (phoneDigits.length !== 10) {
      next.phone = "Please enter a 10-digit phone number.";
    }
    // Email: optional, but if provided it must look like an email.
    const email = data.email.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Hmm, that doesn't look right.";
    }
    if (!data.services || data.services.length === 0) {
      next.services = "Pick at least one service.";
    }
    // Message is fully optional.
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const reset = () => setData(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      // Build form-urlencoded body. URLSearchParams handles repeated
      // keys natively — that's how we send multi-select services.
      const params = new URLSearchParams();
      const f = brand.contactForm.fields;
      params.append(f.Name, data.name);
      if (data.email) params.append(f.Email, data.email);
      params.append(f["Phone number"], data.phone);
      data.services.forEach((s) => params.append(f.Service, s));
      if (data.message) params.append(f.Message, data.message);

      // Dev-only: log the exact payload so the dev console shows
      // what we're sending. Network tab will also show the POST.
      if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        // eslint-disable-next-line no-console
        console.log("[Contact] POST →", brand.contactForm.googleFormURL);
        // eslint-disable-next-line no-console
        console.log("[Contact] Body  →", params.toString());
      }

      // Fetch with mode: "no-cors" is the canonical way to submit to
      // Google Forms from a static site. The response is opaque
      // (we can't read it) but the POST itself goes through reliably,
      // unlike the hidden-iframe trick which Chrome sometimes silently
      // blocks. Google Forms accepts URL-encoded bodies on /formResponse.
      await fetch(brand.contactForm.googleFormURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        reset();
      }, 3500);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[Contact] submit failed:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[420px] rounded-2xl bg-dark/60 border border-white/[0.06] backdrop-blur-md p-8 md:p-12">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-5">
          <svg
            className="w-7 h-7 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-white text-2xl md:text-3xl tracking-tight mb-2">
          Got it. We&apos;re on it.
        </h3>
        <p className="font-body text-soft">
          We&apos;ll be in touch within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-dark/60 border border-white/[0.06] backdrop-blur-md p-6 md:p-8 lg:p-10"
    >
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
        >
          <p className="font-body text-red-300 text-sm">
            Something went sideways. Please try WhatsApp or email instead.
          </p>
        </div>
      )}

      {/* Name + Phone (both required) on a single row at md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Name"
          name="name"
          type="text"
          placeholder="Your name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
          disabled={status === "submitting"}
          required
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="numeric"
          maxLength={10}
          pattern="\d{10}"
          placeholder="10-digit number"
          value={data.phone}
          onChange={handleChange}
          error={errors.phone}
          disabled={status === "submitting"}
          required
        />
      </div>

      {/* Email — optional */}
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@brand.co (optional)"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        disabled={status === "submitting"}
      />

      {/* Service multi-select with chips for selected items */}
      <ServiceMultiSelect
        label="Service"
        options={serviceOptions}
        selected={data.services}
        onToggle={toggleService}
        error={errors.services}
        disabled={status === "submitting"}
        required
      />

      {/* Message — optional */}
      <TextareaField
        label="Message"
        name="message"
        placeholder="A few lines on what you're trying to build (optional)…"
        value={data.message}
        onChange={handleChange}
        error={errors.message}
        disabled={status === "submitting"}
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className={[
          "w-full mt-2",
          "inline-flex items-center justify-center gap-2",
          "rounded-[10px] px-6 py-4",
          "font-heading font-medium text-base",
          "bg-primary text-dark",
          "transition-all duration-200 ease-out",
          "hover:bg-primary-soft hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]",
          "active:scale-[0.99]",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none",
        ].join(" ")}
      >
        {status === "submitting" ? (
          <>
            <svg
              className="w-4 h-4 animate-spin-slow"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          <>Send Message</>
        )}
      </button>
    </form>
  );
}

/* ----------------------------------------------------------------- */
/* Form fields                                                         */

const FIELD_BASE = [
  "w-full",
  "rounded-xl",
  // Subtle dark fill — sits on the dark form card without screaming.
  "bg-white/[0.04]",
  "border border-white/10",
  "text-white font-body text-sm",
  "placeholder-white/30",
  // py-3.5 + line-height keeps the input ≥ 48px tall — comfortably
  // larger than the 44px tap-target minimum on touch devices.
  "px-4 py-3.5",
  "transition-all duration-200 ease-out",
  "hover:bg-white/[0.06] hover:border-white/15",
  "focus:outline-none focus:bg-white/[0.06] focus:border-primary focus:ring-2 focus:ring-primary/25",
  "disabled:opacity-50 disabled:cursor-not-allowed",
].join(" ");

function FieldLabel({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-body text-xs uppercase tracking-[0.22em] text-soft mb-2"
    >
      {children}
      {required && <span className="text-primary ml-1">*</span>}
    </label>
  );
}

function FieldError({ children }) {
  if (!children) return null;
  return <p className="font-body text-xs text-red-300 mt-1.5">{children}</p>;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled,
  required,
  autoComplete,
  inputMode,
  maxLength,
  pattern,
}) {
  return (
    <div className="mb-5">
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        pattern={pattern}
        aria-invalid={!!error}
        className={`${FIELD_BASE} ${error ? "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20" : ""}`}
      />
      <FieldError>{error}</FieldError>
    </div>
  );
}

function ServiceMultiSelect({
  label,
  options,
  selected,
  onToggle,
  error,
  disabled,
  required,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const triggerLabel =
    selected.length === 0
      ? "Pick one or more services"
      : `${selected.length} selected`;

  return (
    <div className="mb-5">
      <FieldLabel htmlFor="service-trigger" required={required}>
        {label}
      </FieldLabel>

      <div ref={wrapperRef} className="relative">
        {/* Trigger */}
        <button
          ref={buttonRef}
          id="service-trigger"
          type="button"
          onClick={() => !disabled && setOpen((v) => !v)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={!!error}
          className={[
            FIELD_BASE,
            "flex items-center justify-between text-left cursor-pointer",
            error
              ? "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20"
              : "",
          ].join(" ")}
        >
          <span
            className={
              selected.length === 0 ? "text-white/30" : "text-white"
            }
          >
            {triggerLabel}
          </span>
          <svg
            aria-hidden="true"
            className={[
              "w-4 h-4 text-white/50 transition-transform duration-200",
              open ? "rotate-180" : "",
            ].join(" ")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <ul
            role="listbox"
            aria-multiselectable="true"
            aria-label={label}
            className={[
              "absolute z-30 left-0 right-0 mt-2",
              "rounded-xl bg-surface border border-white/10",
              "shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]",
              "overflow-hidden",
              "max-h-72 overflow-y-auto",
            ].join(" ")}
          >
            {options.map((opt) => {
              const isSelected = selected.includes(opt);
              return (
                <li key={opt} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => onToggle(opt)}
                    className={[
                      "w-full px-4 py-3 text-left",
                      "flex items-center gap-3",
                      "font-body text-sm",
                      "transition-colors duration-150",
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "text-white hover:bg-white/[0.04]",
                    ].join(" ")}
                  >
                    {/* Checkbox indicator */}
                    <span
                      aria-hidden="true"
                      className={[
                        "shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-white/30",
                      ].join(" ")}
                    >
                      {isSelected && (
                        <svg
                          className="w-2.5 h-2.5 text-dark"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Selected chips — only shown when there's at least one pick */}
      {selected.length > 0 && (
        <ul
          className="flex flex-wrap gap-2 mt-3"
          aria-label="Selected services"
        >
          {selected.map((s) => (
            <li key={s}>
              <span className="inline-flex items-center gap-2 pl-2.5 pr-1.5 py-1 rounded-full text-xs font-body bg-primary/15 text-primary border border-primary/30">
                {s}
                <button
                  type="button"
                  onClick={() => onToggle(s)}
                  aria-label={`Remove ${s}`}
                  className="w-4 h-4 rounded-full inline-flex items-center justify-center hover:bg-primary/25 transition-colors"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <FieldError>{error}</FieldError>
    </div>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  required,
}) {
  return (
    <div className="mb-6">
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        className={[
          FIELD_BASE,
          "resize-none",
          error
            ? "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20"
            : "",
        ].join(" ")}
      />
      <FieldError>{error}</FieldError>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* Inline icons                                                        */

function WhatsAppIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
