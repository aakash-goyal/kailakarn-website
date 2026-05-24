// ============================================================
// CASE STUDIES — Add your client success stories here
// ============================================================
// For each case study:
// 1. Add a compelling image to /public/images/case-studies/
// 2. Fill in the data below
// 3. The section auto-adjusts to however many entries exist
//
// TIPS FOR GREAT CASE STUDIES:
//  - Use before/after numbers (specific numbers build trust)
//  - Keep strategy description to 1-2 lines
//  - Use the best visual (Instagram grid, campaign screenshot, etc.)
//
// IS THIS PLACEHOLDER DATA?
//   The exported `placeholder` flag tells the section to render a
//   subtle "launching soon" overlay over each card. Flip it to
//   `false` once these are real client wins so the overlay vanishes.
// ============================================================

export const placeholder = true;

const caseStudies = [
  // REPLACE every entry below with a real client case study.
  // The grid auto-adjusts however many entries you keep.
  {
    id: "brand-1",
    brandName: "Brand Name",          // REPLACE: real client / brand name
    image: "/images/case-studies/brand1.jpg",  // REPLACE: real screenshot
    tags: ["D2C Fashion", "Instagram Growth"], // REPLACE: real tags
    before: { number: 2, suffix: "K", label: "Followers" },
    after: { number: 15, suffix: "K", label: "Followers" },
    strategy:
      "Built a culture-driven content strategy that turned a new fashion label into an Instagram-first brand.",
    duration: "4 months",
  },
  {
    id: "brand-2",
    brandName: "Brand Name",
    image: "/images/case-studies/brand2.jpg",
    tags: ["Tech Startup", "Performance Marketing"],
    before: { number: 0, suffix: "", label: "Monthly Leads" },
    after: { number: 200, suffix: "+", label: "Monthly Leads" },
    strategy:
      "Designed a full-funnel ad system across Meta and Google that turned a zero-awareness startup into a lead machine.",
    duration: "3 months",
  },
  {
    id: "brand-3",
    brandName: "Brand Name",
    image: "/images/case-studies/brand3.jpg",
    tags: ["Event Brand", "Social Virality"],
    before: { number: 500, suffix: "", label: "Reach per post" },
    after: { number: 50, suffix: "K+", label: "Reach per post" },
    strategy:
      "Created a FOMO-driven content engine that made every event sell out before the ad budget was even spent.",
    duration: "2 months",
  },
];

export default caseStudies;
