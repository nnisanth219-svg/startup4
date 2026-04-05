/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0A0B0F',
        'midnight-2': '#0F1015',
        'midnight-3': '#1A1D29',
        emerald: {
          DEFAULT: '#10B981',
          dim: '#0D9F6F',
          600: '#10B981',
          500: '#34D399',
        },
        teal: {
          DEFAULT: '#14B8A6',
          dim: 'rgba(20, 184, 166, 0.15)',
        },
        accent: {
          DEFAULT: '#F1F5F9',
          dim: 'rgba(241, 245, 249, 0.5)',
          muted: 'rgba(241, 245, 249, 0.25)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.85' }],
        '11xl': ['12rem', { lineHeight: '0.8' }],
      },
      backgroundImage: {
        'emerald-glow': 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
        'midnight-gradient': 'linear-gradient(180deg, #0A0B0F 0%, #0F1015 100%)',
      },
      animation: {
        'scan-line': 'scan-line 10s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'text-glow': 'text-glow 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'unlock-pulse': 'unlock-pulse 2s ease-in-out infinite',
        'ticker-scroll': 'ticker-scroll 30s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};