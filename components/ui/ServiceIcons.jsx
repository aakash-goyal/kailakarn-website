/**
 * Service icon set — clean, line-style SVGs.
 *
 * Style rules:
 *   - 24x24 viewBox (scaled up via the `size` prop on the wrapper)
 *   - stroke-width 1.5, round caps + joins
 *   - default color: brand primary orange (#FF6B35)
 *   - tone: minimal, geometric — Feather Icons energy, custom shapes
 *
 * Add a new icon: define a component, then register it in `iconMap`.
 *
 * Default size renders at 24px. Pass `size={48}` to scale up via the
 * outer <svg width/height> attributes — strokes scale proportionally.
 */

const DEFAULT_COLOR = "#FF6B35"; // mirrors brand.colors.primary

function svgProps({ size, color, viewBox = "0 0 24 24" }) {
  return {
    width: size,
    height: size,
    viewBox,
    fill: "none",
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
}

/* ----------------------------------------------------------------- */
/* Icons                                                               */

/** Brand — circle with an inner spark (identity / mark). */
export function BrandIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg {...svgProps({ size, color })}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 5.5 L13.5 10.5 L18.5 12 L13.5 13.5 L12 18.5 L10.5 13.5 L5.5 12 L10.5 10.5 Z" />
    </svg>
  );
}

/** Attention — radiating signal / megaphone abstract. */
export function AttentionIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg {...svgProps({ size, color })}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7 7 A7 7 0 0 1 17 7" />
      <path d="M5 5 A10 10 0 0 1 19 5" />
      <path d="M7 17 A7 7 0 0 0 17 17" />
      <path d="M5 19 A10 10 0 0 0 19 19" />
    </svg>
  );
}

/** Content — play triangle inside a soft square (reel / clip). */
export function ContentIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg {...svgProps({ size, color })}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <path d="M10 8.5 L16 12 L10 15.5 Z" />
    </svg>
  );
}

/** Discover — magnifying glass with a gentle plus (search / discover). */
export function DiscoverIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg {...svgProps({ size, color })}>
      <circle cx="11" cy="11" r="6.5" />
      <line x1="15.8" y1="15.8" x2="20" y2="20" />
      <line x1="11" y1="8.5" x2="11" y2="13.5" />
      <line x1="8.5" y1="11" x2="13.5" y2="11" />
    </svg>
  );
}

/** Visuals — overlapping frames / layered design surfaces. */
export function VisualsIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg {...svgProps({ size, color })}>
      <rect x="3.5" y="7" width="13" height="13" rx="2" />
      <rect x="7.5" y="3" width="13" height="13" rx="2" />
    </svg>
  );
}

/** Website — browser frame with a content rail. */
export function WebsiteIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg {...svgProps({ size, color })}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <circle cx="6" cy="6.5" r="0.6" fill={color} stroke="none" />
      <circle cx="8.5" cy="6.5" r="0.6" fill={color} stroke="none" />
      <circle cx="11" cy="6.5" r="0.6" fill={color} stroke="none" />
      <line x1="6" y1="13" x2="14" y2="13" />
      <line x1="6" y1="16" x2="11" y2="16" />
    </svg>
  );
}

/** Plan — compass arrow over a circle (route / strategy). */
export function PlanIcon({ size = 24, color = DEFAULT_COLOR }) {
  return (
    <svg {...svgProps({ size, color })}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.5 L14 12 L12 17.5 L10 12 Z" />
    </svg>
  );
}

/* Backwards-compatible aliases — keep old keys working in case any
   other config still references them. */
export const SocialIcon = BrandIcon;
export const PerformanceIcon = AttentionIcon;
export const SeoIcon = DiscoverIcon;
export const ViralIcon = ContentIcon;
export const VideoIcon = VisualsIcon;
export const WebIcon = WebsiteIcon;
export const StrategyIcon = PlanIcon;

/* ----------------------------------------------------------------- */
/* Resolver                                                            */

const iconMap = {
  // Spec keys
  brand: BrandIcon,
  attention: AttentionIcon,
  content: ContentIcon,
  discover: DiscoverIcon,
  visuals: VisualsIcon,
  website: WebsiteIcon,
  plan: PlanIcon,

  // Legacy keys (match anything older that imports getServiceIcon)
  social: BrandIcon,
  performance: AttentionIcon,
  seo: DiscoverIcon,
  viral: ContentIcon,
  video: VisualsIcon,
  web: WebsiteIcon,
  strategy: PlanIcon,
};

export function getServiceIcon(key) {
  return iconMap[key] || BrandIcon;
}
