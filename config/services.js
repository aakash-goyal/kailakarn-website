// ============================================================
// SERVICES — Edit titles, subtitles, and descriptions here
// ============================================================
// Each service has:
//   title:       The bold name (action-oriented, not generic)
//   subtitle:    One-line transformation promise (rendered in orange)
//   description: 2-3 line explanation
//   icon:        Icon identifier (mapped to inline SVGs in the component)
//   features:    Key deliverables (shown as subtle tags)
//
// TO ADD A NEW SERVICE: append a new object to this array.
// TO REMOVE:            delete the object. Grid auto-adjusts.
// TO REORDER:           move the object up/down in the array.
//
// CONSULTATION CARD:
//   The last entry has `isConsultation: true`. The Services
//   section renders it full-width on its own row with a different
//   background, orange border, and a CTA button. It's the section
//   close-out — no extra CTA needed below it.
// ============================================================

const services = [
  {
    id: "build-brand",
    title: "Build Your Brand",
    subtitle: "Turn your online presence into a recognizable internet identity.",
    description:
      "Complete social media management — content planning, daily posting, community building, and growth strategy that turns profiles into brands.",
    icon: "brand",
    features: [
      "Content Calendar",
      "Daily Posting",
      "Community Management",
      "Brand Strategy",
    ],
  },
  {
    id: "build-attention",
    title: "Build Attention",
    subtitle: "Paid growth strategies designed to make people notice your brand.",
    description:
      "Data-driven ad campaigns across Meta, Google, and LinkedIn. We optimize every rupee to deliver attention that converts.",
    icon: "attention",
    features: ["Meta Ads", "Google Ads", "LinkedIn Ads", "ROI Optimization"],
  },
  {
    id: "viral-content",
    title: "Create Viral Content",
    subtitle: "Content engineered for shares, saves, reach, and relevance.",
    description:
      "Scroll-stopping reels, trend-driven scripts, hooks that grab, and content systems that make brands part of the conversation.",
    icon: "content",
    features: [
      "Reels & Hooks",
      "Trend Scripts",
      "Content Strategy",
      "Short-Form Video",
    ],
  },
  {
    id: "get-discovered",
    title: "Get Discovered",
    subtitle: "Make your brand visible when customers search online.",
    description:
      "SEO and search visibility strategies that put your brand in front of people actively looking for what you offer.",
    icon: "discover",
    features: [
      "SEO Strategy",
      "Search Visibility",
      "Organic Traffic",
      "Google Ranking",
    ],
  },
  {
    id: "design-visuals",
    title: "Design Your Visuals",
    subtitle: "Visual identity that stops the scroll and stays in memory.",
    description:
      "Professional editing, motion design, thumbnails, and brand creatives that make your visual presence unmistakable.",
    icon: "visuals",
    features: [
      "Video Editing",
      "Motion Graphics",
      "Carousel Design",
      "Visual Branding",
    ],
  },
  {
    id: "build-website",
    title: "Build Your Website",
    subtitle: "Digital experiences that convert visitors into believers.",
    description:
      "Modern, fast, conversion-focused websites. Landing pages, business sites, and UI/UX that works as hard as your content.",
    icon: "website",
    features: [
      "Landing Pages",
      "Business Websites",
      "UI/UX Design",
      "Conversion Optimization",
    ],
  },
  {
    id: "growth-plan",
    title: "Need a Growth Plan?",
    subtitle: "Not sure where to start? Let's build your roadmap.",
    description:
      "A free consultation where we audit your current presence, identify opportunities, and map out a growth strategy tailored to your brand.",
    icon: "plan",
    isConsultation: true,
    features: ["Free Audit", "Custom Strategy", "Growth Roadmap", "No Commitment"],
  },
];

export default services;
