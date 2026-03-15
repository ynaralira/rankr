/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0B1120',
        'secondary-bg': '#111827',
        'border-color': '#1F2937',
        'primary-text': '#F9FAFB',
        'secondary-text': '#9CA3AF',
        'neon-cyan': '#22D3EE',
        'tech-purple': '#7C3AED',
        'deep-blue': '#1E3A8A',
        'stars-color': '#A5F3FC',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #22D3EE 0%, #7C3AED 100%)',
      },
    },
  },
  plugins: [],
}

