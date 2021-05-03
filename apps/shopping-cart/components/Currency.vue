<template>
  <div class="flex items-center space-x-2 text-[14px]">
    <img
      class="w-4 h-4 rounded-full object-cover"
      src="https://lipis.github.io/flag-icon-css/flags/4x3/us.svg"
    />
    <div>$1 - {{ currency }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import { useAccessor } from '~/composable/store'

export default defineComponent({
  setup() {
    const accessor = useAccessor()
    const currency = computed(() => accessor.formatCurrency)

    return {
      currency,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
