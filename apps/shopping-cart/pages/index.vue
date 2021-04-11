<template>
  <div>
    <h1>Data</h1>
    <div>
      <div v-for="(item, i) in catalog" :key="i">
        {{ item.id }} - ${{ item.price }}
      </div>
    </div>
    <h1>Cart</h1>
    <div>12</div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  useAsync,
  useContext,
  computed,
  defineComponent,
  ssrRef,
} from '@nuxtjs/composition-api'

import type { formatNames, formatGoods } from '~/api/utils'

export default defineComponent({
  props: {},
  setup() {
    const { $axios } = useContext()

    const catalog = ssrRef<ReturnType<typeof formatNames>>([])

    useAsync(async () => {
      catalog.value = await $axios.$get('/api/v1/catalog')
    })

    return {
      catalog,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
