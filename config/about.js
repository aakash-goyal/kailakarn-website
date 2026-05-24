// ============================================================
// ABOUT PAGE CONFIG — Edit text blocks here, no JSX needed
// ============================================================
// Every paragraph and value lives in this file. Replace the
// placeholder copy with the real story when you're ready.
//
// SECTIONS:
//   hero      — 50vh page hero (title + subtitle)
//   story     — two-column "our story" block
//   values    — values grid (icon key + title + one-line copy)
//   cta       — bottom CTA card text + button label / link
//
// VALUE ICONS:
//   Each value's `icon` key maps to a line-style SVG defined inside
//   components/sections/AboutValues. Available keys:
//     "data" | "culture" | "transparent" | "always-on" | "craft"
//     | "compass"
// ============================================================

const about = {
  hero: {
    title: "About Kailakarn",
    // Subtitle defaults to brand.description in the page component;
    // override here only if you want a different line on /about.
    subtitle: null,
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
    ],
  },

  story: {
    eyebrow: "The story",
    heading: "Started in a Telegram group. Now it's a studio.",
    // REPLACE THIS TEXT with your real founding story.
    paragraphs: [
      "Kailakarn began as a side project — a few writers and editors making reels for friends' brands at midnight. The reels worked. People asked who made them. The friends turned into clients.",
      "Today we run a tight studio across strategy, performance, content, and web. We've shipped for D2C brands, B2B SaaS, F&B, beauty, and a long list of founders who needed a team that actually understands the platforms they're selling on.",
      // REPLACE THIS TEXT with a closing point of view paragraph.
      "We don't do retainers without strategy. We don't make decks before we make work. And we never put your brand in a template.",
    ],
    // The quoted highlight stat shown inside the visual on the right.
    highlight: {
      value: "50+",
      label: "Brands shipped",
      caption: "Across India",
    },
  },

  values: {
    eyebrow: "What we stand for",
    heading: "How we show up.",
    subtitle:
      "These aren't on the wall. They're how every meeting, brief, and ship decision gets made.",
    items: [
      {
        icon: "data",
        title: "Data-Driven",
        body: "Every decision starts with a number we can measure later.",
      },
      {
        icon: "culture",
        title: "Culture-First",
        body: "We design for the platform, the audience, and the moment.",
      },
      {
        icon: "transparent",
        title: "Transparent Reporting",
        body: "Plain dashboards. No vanity metrics. You see what we see.",
      },
      {
        icon: "always-on",
        title: "Always On",
        body: "Small team, fast loops. We reply, and we ship, the same day.",
      },
    ],
  },

  cta: {
    eyebrow: "Take the next step",
    heading: "Ready to build something memorable?",
    body: "We'd love to hear what you're working on. A quick chat, no decks, no pitch.",
    primary: {
      label: "Start a conversation",
      // Where the primary button goes. Defaults to brand.social.whatsapp
      // when set to null — set a string here to override (e.g. "/contact").
      href: null,
    },
  },
};

export default about;
