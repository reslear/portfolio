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
                  @click="addToCart(`${cat.cid}`, `${item.id}`)"
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
    <section class="section-block">
      <div v-if="!cartItems.length" class="text-center">
        <span class="text-black text-opacity-50">No items in the cart</span>
        <span>🙂</span>
      </div>
      <div v-else>
        <div v-for="(item, i) in cartItems" :key="i">
          {{ item.name }} - {{ item.id }} {{ item.cid }} - {{ item.amount }}
          <button @click="deleteFromCart(item.cid, item.id)">x</button>
        </div>
      </div>
    </section>
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

import Currency from '~/components/Currency.vue'
import { formatPrice, getCurrency, exchangePrice } from '~/composable/currency'
import { ICatalog } from '~/types'
import { useAccessor } from '~/composable/store'

export default defineComponent({
  components: { Currency },
  props: {},
  setup() {
    const { $axios } = useContext()
    const accessor = useAccessor()

    const source = ssrRef<ICatalog | null>(null)
    const currency = ssrRef(0)

    useAsync(async () => {
      source.value = await $axios.$get('/api/v1/catalog')
      currency.value = await getCurrency()
    })

    const goods = computed(() => source.value?.goods.Value.Goods || [])
    const names = computed(() => source.value?.names || {})

    const getName = (cid: number | string, id: number | string) => {
      return names.value[cid]?.B[id]?.N || ''
    }

    const getCatName = (cid: number) => {
      return names.value[cid]?.G
    }

    const convertPrice = (value: number) => {
      return formatPrice(exchangePrice(value, currency.value))
    }

    const currencyFormat = computed(() => formatPrice(currency.value))

    const catalog = computed(() => {
      let result: {
        [K: string]: {
          cid: number
          name: string
          items: { id: number; price: string; amount: number; name: string }[]
        }
      } = {}

      for (let { G: cid, T: id, C: price, P: amount } of goods.value) {
        if (!result[cid]) {
          result[cid] = {
            cid,
            name: getCatName(cid),
            items: [],
          }
        }

        result[cid].items.push({
          id,
          name: getName(cid, id),
          price: convertPrice(price),
          amount,
        })
      }

      return result
    })

    const addToCart = (cid: string, id: string) => {
      accessor.cart.add({ id, cid, amount: 1 })
    }

    const deleteFromCart = (cid: string, id: string) => {
      accessor.cart.delete({ id, cid })
    }

    const cartItems = computed(() =>
      accessor.cart.items.map((item) => {
        return {
          ...item,
          name: getName(item.cid, item.id),
        }
      })
    )

    return {
      deleteFromCart,
      cartItems,
      addToCart,
      catalog,
      currency,
      currencyFormat,
      goods,
      names,
      getName,
      convertPrice,
    }
  },
})
</script>

<style lang="postcss" scoped>
.section-block {
  @apply bg-white shadow-2xl rounded-xl p-4 mb-8 mt-4;
}
</style>
