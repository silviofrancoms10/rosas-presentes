import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  css: ['~/assets/styles/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: 'cloudflare-pages',
  },

  telemetry: false,

  compatibilityDate: '2026-07-12',
})
