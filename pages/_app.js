import { Inter } from "next/font/google";
import "../styles/globals.css";

/**
 * Inter loaded via next/font/google → outputs a CSS variable used in
 * tailwind.config.js (`var(--font-body)`). The `--font-inter` variable
 * is also exported for any place that wants to reference Inter directly.
 *
 * Clash Display is self-hosted via @font-face in styles/globals.css.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <div className={`${inter.variable} font-body`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
