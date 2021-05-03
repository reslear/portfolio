import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  head: {
    title: 'Shopping cart',
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
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },
}

export default config
