import type { Config } from 'tailwindcss';
import { zafiroColors } from './lib/theme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Mexican flag colors
        'mexican-green': zafiroColors.mexican.green,
        'mexican-white': zafiroColors.mexican.white,
        'mexican-red': zafiroColors.mexican.red,
        
        // Jewelry colors
        'gold': zafiroColors.jewelry.gold,
        'silver': zafiroColors.jewelry.silver,
        'diamond': zafiroColors.jewelry.diamond,
        'emerald': zafiroColors.jewelry.emerald,
        'ruby': zafiroColors.jewelry.ruby,
        'sapphire': zafiroColors.jewelry.sapphire,
        
        // UI colors
        border: zafiroColors.ui.border,
        input: zafiroColors.ui.border,
        ring: zafiroColors.mexican.green[500],
        background: zafiroColors.ui.background,
        foreground: zafiroColors.ui.foreground,
        primary: {
          DEFAULT: zafiroColors.ui.primary,
          foreground: zafiroColors.mexican.white,
          ...zafiroColors.mexican.green
        },
        secondary: {
          DEFAULT: zafiroColors.ui.secondary,
          foreground: zafiroColors.mexican.white,
          ...zafiroColors.mexican.red
        },
        accent: {
          DEFAULT: zafiroColors.ui.accent,
          foreground: zafiroColors.ui.foreground,
          ...zafiroColors.jewelry.gold
        },
        destructive: {
          DEFAULT: zafiroColors.ui.error,
          foreground: zafiroColors.mexican.white,
        },
        muted: {
          DEFAULT: zafiroColors.ui.muted,
          foreground: '#737373',
        },
        success: {
          DEFAULT: zafiroColors.ui.success,
          foreground: zafiroColors.mexican.white,
        },
        warning: {
          DEFAULT: zafiroColors.ui.warning,
          foreground: zafiroColors.ui.foreground,
        },
        info: {
          DEFAULT: zafiroColors.ui.info,
          foreground: zafiroColors.mexican.white,
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
};

export default config;