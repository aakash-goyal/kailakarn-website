/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — generates pure HTML/CSS/JS files
  // Deploy to any static host (Netlify, Vercel, GitHub Pages, S3, etc.)
  output: 'export',

  // Required for static export — Next.js Image Optimization
  // doesn't work without a server, so we disable it
  images: {
    unoptimized: true,
  },

  // Trailing slashes help with static hosting compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
