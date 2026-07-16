import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        brand: {
          'cocoa-dark': '#1a1818',
          'bg': '#141212',
          'gold': '#d4af37',
          'caramel': '#c68e17',
          'cream': '#f8f5f0',
          'burgundy': '#4a0404'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  }
}
