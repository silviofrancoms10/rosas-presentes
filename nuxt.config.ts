import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Rosas Presentes | Floricultura e Cestas de Presentes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Encontre os melhores buquês de rosas, cestas de café da manhã e presentes especiais. Entregamos amor e carinho em forma de flores.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'shortcut icon', href: '/favicon.ico' }
      ]
    }
  },

  modules: ['@pinia/nuxt'],

  css: ['~/assets/styles/main.css'],

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/.wrangler/**'],
      },
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === 'SOURCEMAP_BROKEN' &&
            (warning.plugin === 'nuxt:module-preload-polyfill' ||
              warning.plugin?.includes('tailwindcss'))
          ) {
            return
          }
          warn(warning)
        },
      },
    },
  },

  hooks: {
    async 'vite:extendConfig'(config) {
      const { createLogger } = await import('vite')
      const logger = createLogger()
      const originalWarn = logger.warn
      logger.warn = (msg, options) => {
        if (
          msg.includes('Sourcemap is likely to be incorrect') &&
          (msg.includes('nuxt:module-preload-polyfill') || msg.includes('tailwindcss'))
        ) {
          return
        }
        originalWarn(msg, options)
      }
      config.customLogger = logger
    },
  },

  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      nodeCompat: true,
    },
  },

  telemetry: false,

  compatibilityDate: '2026-07-12',
})
