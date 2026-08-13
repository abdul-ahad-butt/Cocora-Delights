// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://cocoradelights.jerrystankas087.workers.dev'
    }
  },

  nitro: {
    preset: 'cloudflare-pages-static',
    output: {
      dir: '.output',
      publicDir: '.output/public'
    }
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0' }
      ]
    }
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    // '/admin/**': { ssr: false } // optional if fully client-side rendered, but we'll leave default SSR for now
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
