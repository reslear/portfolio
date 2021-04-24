<template>
  <div>
    <SiteHeader />
    <main class="container mt-12">
      <Nuxt />
    </main>

    <SiteFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useAccessor } from '~/composable/store'

export default defineComponent({
  props: {},
  setup() {
    const accessor = useAccessor()

    onMounted(() => {
      accessor.cart.init()
    })

    return {}
  },
})
</script>

<style lang="postcss">
body {
  @apply bg-[#F5F7FB];
}
</style>
