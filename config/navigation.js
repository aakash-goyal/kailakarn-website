// ============================================================
// NAVIGATION CONFIG
// ============================================================
// type: "scroll" → smooth-scroll to a #section on the homepage
// type: "page"   → navigate to a separate page (e.g. /about)
//
// `targetId` (scroll only) is the DOM id to highlight when the user
// is currently in that section. Defaults to href without the #.

const navigation = [
  { label: "Home", href: "#hero", type: "scroll" },
  { label: "Work", href: "#case-studies", type: "scroll" },
  { label: "Services", href: "#services", type: "scroll" },
  { label: "About", href: "/about", type: "page" },
  { label: "Contact", href: "#contact", type: "scroll" },
];

export default navigation;
