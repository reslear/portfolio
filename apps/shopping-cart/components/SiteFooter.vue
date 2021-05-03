<template>
  <div class="text-center py-5 container">
    <div class="border-t border-gray-200 pt-5 text-gray-400 text-[14px]">
      <div class="mb-4">
        <a
          href="https://github.com/reslear/portfolio/tree/master/apps/shopping-cart"
          title="source code on github.com"
          class="opacity-70 hover:opacity-100 transition display inline-flex w-5 h-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            style="vertical-align:middle"
          >
            <path
              d="M16 2a14 14 0 00-4.4 27.3c.7.1 1-.3 1-.7v-2.4c-4 .9-4.7-1.8-4.7-1.8a3.7 3.7 0 00-1.7-2.1c-1.2-.9.1-.8.1-.8a3 3 0 012.2 1.4 3 3 0 004 1.2 3 3 0 011-2c-3.2-.3-6.4-1.5-6.4-6.8a5.4 5.4 0 011.4-3.8 5 5 0 01.2-3.7s1.1-.4 3.8 1.4a13.3 13.3 0 017 0c2.7-1.8 3.8-1.4 3.8-1.4a5 5 0 01.2 3.7 5.4 5.4 0 011.4 3.8c0 5.3-3.2 6.5-6.4 6.9a3.3 3.3 0 011 2.6v3.8c0 .5.2.8 1 .7A14 14 0 0016 2z"
            />
          </svg>
        </a>
      </div>

      <div>
        (c) {{ year }} - by
        <a href="https://github.com/reslear" class="hover:text-black transition"
          >@reslear</a
        >
      </div>
      <div class="flex space-x-2 justify-center mt-4">
        <span>made with</span>

        <svg
          class="animate-heartbeat"
          width="14"
          height="12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2.27c2.1 0 3.79 1.7 3.8 3.8 0 3.85-7 7.66-7 7.66S0 7.87 0 4.08a3.8 3.8 0 017-2.1A3.8 3.8 0 0110.2.28z"
            fill="#D7443E"
          />
        </svg>

        <span>from Minsk</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {},
  setup() {
    const year = new Date().getFullYear()
    return {
      year,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
