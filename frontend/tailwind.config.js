/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        surface: 'var(--surface)',
        panel: 'var(--panel)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        accentSoft: 'var(--accent-soft)',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      boxShadow: {
        card: '0 20px 50px rgba(0,0,0,0.18)',
      },
      borderRadius: {
        xl: '18px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
