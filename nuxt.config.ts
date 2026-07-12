import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  css: ['~/assets/styles/main.css'],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  telemetry: false,

  compatibilityDate: '2026-07-12'
})
