import { defineNuxtConfig } from '@nuxtjs/composition-api'

export default defineNuxtConfig({
  server: {
    port: 3001,
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    'nuxt-windicss',
  ],
  modules: ['@nuxtjs/axios'],
  serverMiddleware: ['~/api'],
})
