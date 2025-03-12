// Theme configuration for Zafiro Jewelry Management System
// Incorporating Mexican flag colors (green, white, red) with jewelry-themed colors

export const zafiroColors = {
  // Mexican flag inspired colors
  mexican: {
    green: {
      50: '#e6f7ed',
      100: '#c3ecd3',
      200: '#9ddeb6',
      300: '#74d198',
      400: '#4dc47a',
      500: '#006847', // Mexican flag green
      600: '#005e40',
      700: '#004d34',
      800: '#003d29',
      900: '#002c1e',
    },
    white: '#ffffff', // Mexican flag white
    red: {
      50: '#feebeb',
      100: '#fcd0d0',
      200: '#f9a8a8',
      300: '#f68080',
      400: '#f35858',
      500: '#ce1126', // Mexican flag red
      600: '#b80f22',
      700: '#970c1c',
      800: '#760917',
      900: '#550711',
    },
  },
  
  // Jewelry-themed colors
  jewelry: {
    gold: {
      50: '#fdf9e7',
      100: '#fbf0c0',
      200: '#f8e699',
      300: '#f5dc71',
      400: '#f2d24a',
      500: '#d4af37', // Gold
      600: '#bf9e32',
      700: '#9f8329',
      800: '#7f6820',
      900: '#5f4d18',
    },
    silver: {
      50: '#f7f7f7',
      100: '#ececec',
      200: '#dfdfdf',
      300: '#c7c7c7',
      400: '#afafaf',
      500: '#c0c0c0', // Silver
      600: '#9e9e9e',
      700: '#7e7e7e',
      800: '#5e5e5e',
      900: '#3e3e3e',
    },
    diamond: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#e0e0e0', // Diamond
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    emerald: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981', // Emerald
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    ruby: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Ruby
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    sapphire: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Sapphire
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
  
  // UI colors
  ui: {
    background: '#ffffff',
    foreground: '#171717',
    primary: '#006847', // Mexican green as primary
    secondary: '#ce1126', // Mexican red as secondary
    accent: '#d4af37', // Gold as accent
    muted: '#f5f5f5',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

// Theme configuration for light and dark modes
export const themeConfig = {
  light: {
    background: zafiroColors.ui.background,
    foreground: zafiroColors.ui.foreground,
    primary: zafiroColors.mexican.green[500],
    secondary: zafiroColors.mexican.red[500],
    accent: zafiroColors.jewelry.gold[500],
    muted: zafiroColors.ui.muted,
    border: zafiroColors.ui.border,
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#ededed',
    primary: zafiroColors.mexican.green[300],
    secondary: zafiroColors.mexican.red[300],
    accent: zafiroColors.jewelry.gold[300],
    muted: '#27272a',
    border: '#3f3f46',
  },
};

// Export default theme
export default themeConfig;