import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
      },
    },

    extend: {
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale( .75 )' },
          '50%': { transform: 'scale(1)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 2s ease-in-out infinite',
      },
    },
  },
})
