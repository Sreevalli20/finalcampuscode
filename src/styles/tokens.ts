/**
 * CAMPUSCODE — DESIGN SYSTEM TOKENS
 * Premium Dark Editorial & Contemporary Technology Aesthetics
 * Strictly enforces WCAG AA contrast, hairline spatial discipline, and zero-slop restraint.
 */

export const tokens = {
  colors: {
    // Canvas & Surfaces (60% Dominant Neutral Canvas + 30% Structural Surfaces)
    nearBlack: {
      canvas: '#070709',
      surface: '#0D0E12',
      elevated: '#12141B',
    },
    charcoal: {
      subtle: '#171922',
      muted: '#1E202B',
      border: '#2A2D3D',
      hairline: 'rgba(255, 255, 255, 0.08)',
      hairlineActive: 'rgba(255, 255, 255, 0.16)',
    },
    // Typographic Text (Warm white & refined hierarchy)
    text: {
      warmWhite: '#FDFBF7',
      primary: '#F4F2ED',
      secondary: '#B3B6C4',
      tertiary: '#7A7D8F',
      disabled: '#484B59',
    },
    // Electric Orange Accent (10% High-Intent Budget)
    accent: {
      electricOrange: '#FF5722',
      light: '#FF7043',
      dark: '#E64A19',
      glow: 'rgba(255, 87, 34, 0.15)',
      hairline: 'rgba(255, 87, 34, 0.35)',
    },
    // Semantic States
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#0EA5E9',
    },
  },
  typography: {
    fonts: {
      display: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      body: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    scales: {
      hero: 'clamp(2.25rem, 4.5vw, 3.75rem)',
      displayLarge: '2.25rem', // 36px
      displayMedium: '1.75rem', // 28px
      title: '1.25rem', // 20px
      bodyLarge: '1.0625rem', // 17px
      bodyRegular: '0.9375rem', // 15px
      caption: '0.8125rem', // 13px
      metadata: '0.6875rem', // 11px
    },
  },
  spacing: {
    outerContainerPadding: '2rem',
    cardInnerPadding: '1.5rem',
    childGap: '1rem',
    hairlineDivider: '1px solid rgba(255, 255, 255, 0.08)',
  },
  borders: {
    hairline: '1px solid rgba(255, 255, 255, 0.08)',
    hairlineHover: '1px solid rgba(255, 255, 255, 0.18)',
    accent: '1px solid rgba(255, 87, 34, 0.4)',
    radius: {
      sm: '0.375rem', // 6px
      md: '0.5rem', // 8px
      lg: '0.75rem', // 12px
      xl: '1rem', // 16px
      '2xl': '1.25rem', // 20px
      full: '9999px',
    },
  },
  shadows: {
    card: '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
    modal: '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
    orangeGlow: '0 0 25px rgba(255, 87, 34, 0.2)',
  },
} as const;
