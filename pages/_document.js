import { Html, Head, Main, NextScript } from "next/document";
import brand from "../config/brand";

/**
 * Custom Document — preloads self-hosted Clash Display, sets meta,
 * structured data. Inter is loaded via next/font/google in _app.js.
 */
export default function Document() {
  // LocalBusiness schema — gives Google a richer card than the
  // generic Organization type and surfaces phone/email/address.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.fullName,
    alternateName: brand.name,
    description: brand.description,
    url: brand.seo.url,
    telephone: brand.contact.phone,
    email: brand.contact.email,
    priceRange: "$$",
    sameAs: [
      brand.social.instagram,
      brand.social.linkedin,
      brand.social.threads,
    ],
    image: brand.seo.ogImage,
    logo: brand.seo.ogImage,
  };

  return (
    <Html lang="en">
      <Head>
        {/* Preload critical Clash Display weights for faster paint */}
        <link
          rel="preload"
          href="/fonts/clash-display/ClashDisplay-Semibold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/clash-display/ClashDisplay-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href={brand.assets?.appleTouchIcon || brand.assets?.logo || "/favicon.ico"}
        />

        {/* SEO */}
        <meta name="description" content={brand.seo.description} />
        <meta property="og:title" content={brand.seo.title} />
        <meta property="og:description" content={brand.seo.description} />
        <meta property="og:image" content={brand.seo.ogImage} />
        <meta property="og:url" content={brand.seo.url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={brand.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={brand.seo.title} />
        <meta name="twitter:description" content={brand.seo.description} />
        <meta name="twitter:image" content={brand.seo.ogImage} />
        <meta name="theme-color" content={brand.colors.dark} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
