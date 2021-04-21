<template>
  <header class="bg-white shadow-xl fixed top-0 h-12 w-full">
    <div class="container flex h-full justify-between items-center">
      <div class="flex space-x-4">
        <nuxt-link to="/" class="link">Catalog</nuxt-link>
        <nuxt-link to="/cart" class="link">Cart</nuxt-link>
      </div>
      <Currency />
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
.link {
  @apply text-black;
}
.link.nuxt-link-exact-active {
  @apply text-opacity-50;
}
</style>
