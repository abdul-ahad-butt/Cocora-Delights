import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ? (process.env.NUXT_PUBLIC_API_BASE.startsWith('http') ? process.env.NUXT_PUBLIC_API_BASE : `https://${process.env.NUXT_PUBLIC_API_BASE}`) : 'https://backend.jerrystankas087.workers.dev'
    }
  },

  routeRules: {
    '/**': {
      headers: {
        'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss:; style-src 'self' 'unsafe-inline' https:; img-src 'self' https: data: blob:;"
      }
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  vite: {
    build: {
      sourcemap: false
    },
    plugins: [
      tailwindcss()
    ]
  }
});
