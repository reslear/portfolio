<template>
  <div class="pt-5">
    <h2>Data</h2>
    <section class="section-block">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="(cat, i) in catalog" :key="i">
          <header>
            <h1 class="bold text-xl">{{ cat.name }}</h1>
          </header>

          <div class="flex flex-col mt-2 space-y-2">
            <div v-for="(item, j) in cat.items" :key="j" class="flex space-x-2">
              <div class="flex-1">
                id {{ item.id }} - {{ item.name }} - {{ item.price }} -
                {{ item.amount }}
              </div>
              <div>
                <button
                  class="border-1px border-gray-500 px-3 py-1 text-sm rounded-sm"
                >
                  Купить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <h2>Cart</h2>
    <section class="section-block">123</section>
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
  defineAsyncComponent,
} from '@nuxtjs/composition-api'
import { DefaultDeserializer } from 'node:v8'
import Currency from '~/components/Currency.vue'
import { formatPrice, getCurrency, exchangePrice } from '~/composable/currency'
import { ICatalog } from '~/types'

export default defineComponent({
  components: { Currency },
  props: {},
  setup() {
    const { $axios } = useContext()

    const source = ssrRef<ICatalog | null>(null)
    const currency = ssrRef(0)

    useAsync(async () => {
      source.value = await $axios.$get('/api/v1/catalog')
      currency.value = await getCurrency()
    })

    const goods = computed(() => source.value?.goods.Value.Goods || [])
    const names = computed(() => source.value?.names || {})

    const getName = (cid: number, id: number) => {
      return names.value[cid]?.B[id]?.N || ''
    }

    const getCatName = (cid: number) => {
      return names.value[cid]?.G
    }

    const getPrice = (value: number) => {
      return formatPrice(exchangePrice(value, currency.value))
    }

    const currencyFormat = computed(() => formatPrice(currency.value))

    const catalog = computed(() => {
      let result: {
        [K: string]: {
          items: { id: number; price: string; amount: number; name: string }[]
          name: string
        }
      } = {}

      for (let { G: cid, T: id, C: price, P: amount } of goods.value) {
        if (!result[cid]) {
          result[cid] = {
            name: getCatName(cid),
            items: [],
          }
        }

        result[cid].items.push({
          id,
          name: getName(cid, id),
          price: getPrice(price),
          amount,
        })
      }

      return result
    })

    // generate catalog three O(n*2)
    // const catalog = computed(() => {
    //   let result = []

    //   for (let [catId, value] of Object.entries(names.value)) {
    //     const items = []

    //     for (let [id, item] of Object.entries(value.B)) {
    //       items.push({
    //         id,
    //         name: item.N,
    //       })
    //     }

    //     result.push({
    //       id: catId,
    //       name: value.G,
    //       items,
    //     })
    //   }

    //   return result
    // })

    return {
      catalog,
      currency,
      currencyFormat,
      goods,
      names,
      getName,
      getPrice,
    }
  },
})
</script>

<style lang="postcss" scoped>
.section-block {
  @apply bg-white shadow-2xl rounded-xl p-4 mb-8 mt-4;
}
</style>
