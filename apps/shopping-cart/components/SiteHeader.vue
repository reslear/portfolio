<template>
  <header
    class="header bg-white shadow-xl fixed top-0 h-12 w-full z-100 bg-opacity-50"
  >
    <div class="container flex h-full justify-between items-center">
      <div class="flex space-x-4 items-center">
        <span>🛒</span>
        <span class="title">Shopping cart</span>
      </div>
      <div class="flex">
        <Currency />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {},
  setup() {
    return {}
  },
})
</script>

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap');
.title {
  font-family: 'Caveat Brush', cursive;
  font-size: 24px;
}
.header {
  backdrop-filter: saturate(180%) blur(10px);
}
.link {
  @apply text-black;
}
.link.nuxt-link-exact-active {
  @apply text-opacity-50;
}
</style>
