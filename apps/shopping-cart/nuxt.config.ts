import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  server: {
    port: 3001,
  },
  head: {
    title: 'Shopping cart',
    link: [
      {
        rel: 'icon',
        href:
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🛒</text></svg>",
      },
    ],
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
