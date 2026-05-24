// ============================================================
// SOCIAL PROOF — Add your engagement screenshots here
// ============================================================
// Drop screenshot images in /public/images/social-proof/
// Then add entries below. The grid auto-adjusts.
//
// WHAT TO ADD:
//  - Instagram reach/impression spikes
//  - Viral reel view counts
//  - Follower growth graphs
//  - Engagement rate screenshots
//  - DM conversations showing results (blur client names)
//  - Comment sections with high engagement
//  - Ad performance dashboards
//
// HOW THE GRID DECIDES LAYOUT:
//  - 0 images   → graceful placeholder cards ("Results loading...")
//  - 1-3 images → centered row
//  - 4+ images  → CSS-columns masonry (no JS, varying heights)
//
// All headings/copy live here so the client can edit without
// touching the React component.
// ============================================================

const socialProof = {
  // Big punchy line at the top of the section.
  heading: "This is what happens when brands work with us.",

  // Optional secondary line shown only if the gallery is empty —
  // keeps the section feeling intentional while you collect assets.
  emptyMessage: "Results loading… work with us to be featured here.",

  images: [
    // Replace these with real screenshots in /public/images/social-proof/
    // { src: "/images/social-proof/reach-spike-1.jpg", alt: "Instagram reach growth for D2C brand" },
    // { src: "/images/social-proof/viral-reel.jpg",    alt: "Reel hitting 2M views" },
    // { src: "/images/social-proof/follower-growth.jpg", alt: "Follower growth from 2K to 15K" },
  ],
};

export default socialProof;
