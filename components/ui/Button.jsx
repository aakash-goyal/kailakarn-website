import Link from "next/link";
import brand from "../../config/brand";

/**
 * <Button /> — editorial action button.
 *
 * Props:
 *   variant   "primary" | "secondary" | "outline" | "ghost"
 *   size      "sm" | "md" | "lg"
 *   href      string — if provided, renders as <a> / <Link>
 *   onClick   click handler
 *   children  button content
 *   icon      optional ReactNode rendered to the right of children
 *   fullWidth boolean — stretches to container width
 *
 * Design language:
 *   - 10px border radius (rounded, not pill).
 *   - Clash Display medium for the label (font-heading + medium).
 *   - 200ms ease transitions.
 *   - Press: scale(0.98). Primary hover: scale(1.02) + orange glow.
 *
 * All visual values are tied to brand config via CSS vars / Tailwind
 * tokens. The shadow color references --color-primary so a brand
 * recolor flows through automatically.
 */

const SIZES = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

const VARIANTS = {
  // Burnt orange bg, dark text. Hover: glow + scale up. Press: scale down.
  primary: [
    "bg-primary text-dark",
    "shadow-[0_0_0_rgba(255,107,53,0)]",
    "hover:shadow-[0_0_20px_rgba(255,107,53,0.4)]",
    "hover:scale-[1.02]",
    "active:scale-[0.98]",
  ].join(" "),

  // Surface bg, white text, hairline border that warms to orange on hover.
  secondary: [
    "bg-surface text-white border border-white/10",
    "hover:border-primary",
    "active:scale-[0.98]",
  ].join(" "),

  // Hollow with orange border + text. Fills orange on hover.
  outline: [
    "bg-transparent text-primary border border-primary",
    "hover:bg-primary hover:text-dark",
    "active:scale-[0.98]",
  ].join(" "),

  // No border or fill — orange text with a subtle wash on hover.
  ghost: [
    "bg-transparent text-primary",
    "hover:bg-primary/10",
    "active:scale-[0.98]",
  ].join(" "),
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  icon,
  fullWidth = false,
  className = "",
  ...rest
}) {
  const base = [
    "inline-flex items-center justify-center",
    "rounded-[10px]",                  // brand-spec: rounded, not pill
    "font-heading font-medium",        // Clash Display medium
    "tracking-tight",
    "transition-all duration-200 ease-out",
    "select-none cursor-pointer whitespace-nowrap",
    SIZES[size] || SIZES.md,
    VARIANTS[variant] || VARIANTS.primary,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </>
  );

  // Render as the appropriate element based on the href shape.
  if (href) {
    if (/^https?:\/\//.test(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          {...rest}
        >
          {inner}
        </a>
      );
    }
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a href={href} className={base} {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={base} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base} {...rest}>
      {inner}
    </button>
  );
}

// brand import is intentional — keeps a hard reference even if a
// future variant pulls a value directly from config.
void brand;
