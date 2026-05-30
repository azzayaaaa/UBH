import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060711',
        panel: 'rgba(12, 18, 34, 0.72)',
        line: 'rgba(148, 163, 184, 0.2)'
      },
      boxShadow: {
        glow: '0 0 40px rgba(59, 130, 246, 0.24)',
        violet: '0 0 50px rgba(124, 58, 237, 0.22)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
}

export default config
