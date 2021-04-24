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
      <div v-else class="flex flex-col space-y-3 w-full overflow-x-auto">
        <table class="cart-table border-collapse w-full">
          <tbody>
            <tr class="text-left">
              <th>Product name</th>
              <th>Amount</th>
              <th>Price</th>
              <th></th>
            </tr>
            <tr v-for="(item, i) in cartItems" :key="i">
              <td width="50%">{{ item.name }}</td>
              <td width="10%">
                <input
                  type="number"
                  min="1"
                  :value="item.amount"
                  @change.prevent="cartSetAmount($event, item.cid, item.id)"
                  class="bg-gray-100 rounded px-2 w-full"
                />
              </td>
              <td>price</td>
              <td class="text-right">
                <button
                  @click="deleteFromCart(item.cid, item.id)"
                  class="transition hover:opacity-50"
                  title="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M424 64h-88V48c0-26-22-48-48-48h-64c-26 0-48 22-48 48v16H88c-22 0-40 18-40 40v56c0 9 7 16 16 16h9l14 290c1 26 22 46 48 46h242c26 0 47-20 48-46l14-290h9c9 0 16-7 16-16v-56c0-22-18-40-40-40zM208 48c0-9 7-16 16-16h64c9 0 16 7 16 16v16h-96zM80 104c0-4 4-8 8-8h336c4 0 8 4 8 8v40H80zm313 361c0 8-7 15-16 15H135c-9 0-16-7-16-15l-14-289h302z"
                    />
                    <path
                      d="M256 448c9 0 16-7 16-16V224a16 16 0 00-32 0v208c0 9 7 16 16 16zm80 0c9 0 16-7 16-16V224a16 16 0 00-32 0v208c0 9 7 16 16 16zm-160 0c9 0 16-7 16-16V224a16 16 0 00-32 0v208c0 9 7 16 16 16z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
import { debounce, isNumeric } from '~/utils'

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

    const cartSetAmount = (
      event: { target: HTMLInputElement },
      cid: string,
      id: string
    ) => {
      const value = parseInt(event.target.value)

      if (isNumeric(value)) {
        accessor.cart.amount({ cid, id, amount: value })
      }
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
      cartSetAmount: debounce(cartSetAmount, 300),
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
.cart-table td,
.cart-table th {
  @apply pr-4 pb-2;
}
</style>
