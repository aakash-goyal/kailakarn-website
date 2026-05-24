import Head from "next/head";
import brand from "../config/brand";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingButtons from "../components/layout/FloatingButtons";
import Hero from "../components/sections/Hero";
import SocialProof from "../components/sections/SocialProof";
import Culture from "../components/sections/Culture";
import Framework from "../components/sections/Framework";
import CaseStudies from "../components/sections/CaseStudies";
import Services from "../components/sections/Services";
import Team from "../components/sections/Team";
import Testimonials from "../components/sections/Testimonials";
import FinalCTA from "../components/sections/FinalCTA";
import Contact from "../components/sections/Contact";

/**
 * Homepage — strict section order per the brand brief.
 *
 *   Navbar
 *   Hero            (#111111)
 *   SocialProof     (#1B1B1B  — surface, distinct from hero)
 *   Culture         (#F8F4EE  — warm ivory, BREAK)
 *   Framework       (#111111)
 *   CaseStudies     (#1B1B1B  — surface)
 *   Services        (#111111)
 *   Team            (#F8F4EE  — warm ivory, BREAK)
 *   Testimonials    (#111111)
 *   FinalCTA        (#111111  — subtle orange gradient)
 *   Contact         (#1B1B1B  — surface)
 *   Footer          (#0A0A0A)
 *   FloatingButtons
 *
 * Each section owns its own background per the rhythm above.
 * Section IDs are stable so the navbar's active-link tracking
 * keeps working without changes.
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>{brand.seo.title}</title>
        <link rel="canonical" href={brand.seo.url} />
      </Head>

      <Navbar />

      <main id="main-content">
        <Hero />
        <SocialProof />
        <Culture />
        <Framework />
        <CaseStudies />
        <Services />
        <Team />
        <Testimonials />
        <FinalCTA />
        <Contact />
      </main>

      <Footer />
      <FloatingButtons />
    </>
  );
}
