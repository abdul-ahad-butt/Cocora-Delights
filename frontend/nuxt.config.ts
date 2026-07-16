import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://cocoradelights.jerrystankas087.workers.dev'
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});
