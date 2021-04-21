import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  server: {
    port: 3001,
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    'nuxt-typed-vuex',
    'nuxt-windicss',
  ],
  modules: ['@nuxtjs/axios'],
  serverMiddleware: ['~/api'],
  components: true,
}

export default config
