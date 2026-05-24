// ============================================================
// KAILAKARN BRAND CONFIG — Edit this file to change everything
// ============================================================
// This is the SINGLE SOURCE OF TRUTH for the entire website.
// Change a color here → entire site updates.
// Change a link here → all buttons/icons update.
// Change text here → all copy updates.
// ============================================================

const brand = {
  // === COMPANY ===
  name: "Kailakarn",
  fullName: "Kailakarn Digital Marketing",
  tagline: "We Build Brands the Internet Remembers.",
  description:
    "A culture-led growth studio helping startups, D2C brands, and modern businesses become digitally relevant.",

  // === SECONDARY TAGLINES (used in various sections) ===
  // Change these to rotate messaging across the site
  taglines: {
    secondary: "Culture-Led Growth for Modern Brands.",
    hero: "Brands Don't Become Relevant by Accident.",
    heroSub:
      "Kailakarn builds internet-first brands engineered for attention, culture, and growth.",
    cta: "Ready to Build Something People Remember?",

    // CTA headline broken into segments so the client can swap which
    // word(s) render in primary orange without touching JSX.
    // Concatenating `text` reproduces the full sentence above.
    ctaWords: [
      { text: "Ready to Build Something ", highlight: false },
      { text: "People Remember", highlight: true },
      { text: "?", highlight: false },
    ],

    // Hero headline broken into segments so the client can swap which
    // word(s) are highlighted in primary orange without touching JSX.
    // Render order is preserved; concatenating `text` reproduces the
    // full sentence above.
    heroWords: [
      { text: "Brands Don't Become ", highlight: false },
      { text: "Relevant", highlight: true },
      { text: " by Accident.", highlight: false },
    ],

    // Small trust / social-proof line below the hero CTAs.
    heroTrust: "Trusted by 20+ modern brands.",
  },

  // === COLORS ===
  // Change these 11 values to rebrand the entire site.
  // Mirror them into styles/globals.css :root for Tailwind.
  colors: {
    primary: "#FF6B35",
    primarySoft: "#FF9B78",
    primaryDark: "#E55A25",
    dark: "#111111",
    darkest: "#0A0A0A",   // Footer / deepest dark
    surface: "#1B1B1B",
    light: "#F8F4EE",
    textPrimary: "#FFFFFF",
    textSecondary: "#B7B7B7",
    textMuted: "#7A7A7A",
    textDark: "#111111",
  },

  // === TYPOGRAPHY ===
  fonts: {
    heading: "'Clash Display', sans-serif",
    body: "'Inter', sans-serif",
  },

  // === SOCIAL & CONTACT ===
  social: {
    instagram: "https://www.instagram.com/kailakarn_marketing",
    linkedin: "https://www.linkedin.com/company/kailakarn-maketing/",
    whatsapp: "https://wa.me/917742618563",
    threads: "https://www.threads.net/@kailakarnmarketing.team",
  },

  contact: {
    email: "admin@kailakarnmarketing.com",
    phone: "+91-7742618563",
  },

  // === GOOGLE FORM ===
  // ----------------------------------------------------------
  // HOW TO GET YOUR GOOGLE FORM IDs:
  //   1. Open your Google Form in the browser (must be your own form).
  //   2. Click the 3-dot menu (top right) → "Get pre-filled link".
  //   3. Type DUMMY data into every visible field:
  //        e.g. Name → "TEST_NAME", Email → "test@test.com", etc.
  //   4. Click "Get link" at the bottom, then click "Copy link".
  //   5. Paste the URL somewhere you can read it. It looks like:
  //        https://docs.google.com/forms/d/e/1FAIpQL.../viewform?
  //        usp=pp_url&entry.2005620554=TEST_NAME&entry.1045781291=test%40test.com&...
  //   6. For `googleFormURL` below, take that base URL and replace
  //        /viewform  →  /formResponse
  //      so it ends in: /e/<long-id>/formResponse
  //   7. For each field in `fields` below, copy the entry.XXXXXXXXXX
  //      number that sits in front of your dummy value. The KEY on the
  //      left ("Name", "Email", "Business Name", "Service", "Message")
  //      MUST match the field labels rendered in the contact form.
  //
  // The form posts via a hidden iframe (no CORS), so once the IDs
  // line up, submissions land in your Google Form responses tab.
  //
  // The Service dropdown options are auto-generated from
  // config/services.js — you do NOT add them here.
  // ----------------------------------------------------------
  contactForm: {
    googleFormURL:
      "https://docs.google.com/forms/d/e/1FAIpQLSfnvvCgOQtjv0NbYXJxP4vpuVzacqZtXoo3R04u7SAUTe_Maw/formResponse",
    fields: {
      Name: "entry.2005620554",
      Email: "entry.1045781291",
      "Phone number": "entry.1166974658",
      Service: "entry.2034717969",
      Message: "entry.839337160",
    },

    // ----------------------------------------------------------
    // SERVICE OPTIONS — must match your Google Form checkbox question EXACTLY
    // ----------------------------------------------------------
    // The Service field on your Google Form is a CHECKBOX question.
    // Google Forms validates incoming values against the question's
    // options and silently rejects submissions with unknown values.
    //
    // Every string below must match an option on the Form character
    // for character (capitalization, hyphens, spacing, slashes).
    //
    // To add or remove a service:
    //   1. Edit the question's options in the Google Form.
    //   2. Update this array to mirror those options exactly.
    //   3. (Optional) Update config/services.js if you want the new
    //      service to appear in the Services section of the site too.
    //
    // The action-oriented titles in config/services.js are used for
    // marketing copy. The strings here are used for form submissions.
    // They can read differently — they describe the same capability
    // from two angles.
    // ----------------------------------------------------------
    serviceOptions: [
      "Build Your Brand",
      "Build Attention",
      "Get Discovered",
      "Create Viral Content",
      "Design Your Visuals",
      "Build Your Website",
      "Need a Growth Plan?",
    ],
  },

  // === SEO ===
  seo: {
    title: "Kailakarn — We Build Brands the Internet Remembers",
    description:
      "Culture-led growth studio helping startups, D2C brands, and modern businesses become digitally relevant for Gen Z and millennial audiences.",
    url: "https://kailakarn.com",
    ogImage: "/images/og-image.jpg",
  },

  // === ASSETS ===
  // Image paths the site relies on. Update these if you change the
  // file name in /public.
  //
  // Recommended files (drop into /public/images/):
  //   - logo.svg            ← preferred, vector, scales crisp
  //   - logo.png            ← raster fallback (transparent, ~512×512)
  //   - apple-touch-icon.png  (180×180)
  //   - og-image.jpg          (1200×630, used in seo.ogImage)
  //
  // The Navbar / Footer prefer `logo` if set; if it points to a
  // missing file, the components fall back to a CSS wordmark.
  assets: {
    logo: "/images/logo.png",      // primary brand mark
    logoAlt: null,                 // optional light-bg variant; null = same as logo
    appleTouchIcon: "/images/apple-touch-icon.png",
  },

  // === A.T.T.N. FRAMEWORK ===
  framework: {
    name: "The A.T.T.N. Model",
    tagline: "Our proprietary framework for building unforgettable brands.",
    steps: [
      {
        letter: "A",
        title: "Attention",
        description:
          "Stop the scroll. Make people notice your brand in a sea of content.",
      },
      {
        letter: "T",
        title: "Trust",
        description:
          "Build authority and premium perception that makes people believe in your brand.",
      },
      {
        letter: "T",
        title: "Tribe",
        description:
          "Create community and belonging. Turn followers into advocates.",
      },
      {
        letter: "N",
        title: "Numbers",
        description:
          "Turn attention into measurable growth. Revenue, reach, relevance.",
      },
    ],
  },
};

export default brand;
