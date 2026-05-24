# Kailakarn — Digital Marketing Studio

A culture-led growth studio website built as a static-export Next.js site.
Editorial / internet-native brand energy, dark-first, no animation libraries.

[**Live preview (local)**](http://localhost:3000) · `npm run dev`

---

## Stack

- **Next.js 14** (Pages Router) — `output: 'export'` for fully static HTML.
- **Tailwind CSS** with brand-color CSS variables.
- **Clash Display** (self-hosted WOFF2) + **Inter** via `next/font/google`.
- **Zero animation libraries** — every motion is CSS keyframes + IntersectionObserver hooks.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → /out
```

## Project shape

```
kailakarn-website/
├── components/
│   ├── layout/        Navbar · Footer · FloatingButtons
│   ├── sections/      Hero · SocialProof · Culture · Framework · CaseStudies · Services · Team · Testimonials · FinalCTA · Contact
│   └── ui/            Button · ServiceCard · CaseStudyCard · TestimonialCard · SectionHeading · ScrollReveal · ServiceIcons · StatCard
├── config/            brand.js · services.js · caseStudies.js · testimonials.js · culture.js · socialProof.js · team.js · navigation.js · about.js · clients.js
├── hooks/             useScrollReveal · useCounter · useMousePosition · useActiveSection
├── pages/             index.js · about.js · _app.js · _document.js
├── public/
│   ├── fonts/clash-display/   self-hosted WOFF2 weights
│   └── images/                logo.png · case-studies/ · social-proof/ · team/ · clients/
├── styles/            globals.css
├── utils/             scrollTo.js
└── tailwind.config.js · next.config.js · postcss.config.js
```

## Editing for the client

`config/brand.js` is the **single source of truth** for colors, fonts, social
links, contact info, SEO, framework copy, and Google Form IDs. Every other
config file (services, testimonials, case studies, culture, team, etc.)
follows the same pattern — top-of-file comment block explaining how to
add / remove / reorder entries.

Drop assets into `public/images/<section>/` and reference the paths from
the matching config file. The components fall back to placeholder cards
gracefully when an image is missing or a list is empty, so the site never
looks broken while you're collecting real content.

## Static deploy

`npm run build` produces `/out` — a folder of plain HTML / CSS / JS that
deploys to any static host: Netlify, Vercel, GitHub Pages, S3 + CloudFront,
Cloudflare Pages.
