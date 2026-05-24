/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // Colors reference CSS custom properties set in globals.css.
      // Single source of truth lives in config/brand.js; globals.css mirrors
      // the values into CSS vars so Tailwind can consume them.
      colors: {
        primary: 'var(--color-primary)',
        'primary-soft': 'var(--color-primary-soft)',
        'primary-dark': 'var(--color-primary-dark)',
        dark: 'var(--color-dark)',
        darkest: 'var(--color-darkest)',
        surface: 'var(--color-surface)',
        light: 'var(--color-light)',
        ink: 'var(--color-text-dark)',

        // Convenience text aliases (used by `text-muted`, `text-soft`)
        muted: 'var(--color-text-muted)',
        soft: 'var(--color-text-secondary)',

        // Backwards-compatible alias for older components
        'dark-alt': 'var(--color-surface)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-heading)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
      },
      fontSize: {
        // Editorial display sizes for hero / section headings
        'display-sm': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display': ['clamp(3rem, 9vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(4rem, 12vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.05em' }],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'mesh-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(40px, -30px) scale(1.1)' },
        },
        'mesh-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-30px, 40px) scale(1.05)' },
        },
        'mesh-3': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.15)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 50s linear infinite',
        'mesh-1': 'mesh-1 14s ease-in-out infinite',
        'mesh-2': 'mesh-2 18s ease-in-out infinite',
        'mesh-3': 'mesh-3 22s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
