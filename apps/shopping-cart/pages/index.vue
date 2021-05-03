<template>
  <div class="pt-5">
    <h2>Goods</h2>
    <section class="section-block">
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div v-for="(cat, i) in catalog" :key="i">
          <header>
            <h1 class="font-medium text-xl">{{ cat.name }}</h1>
          </header>

          <div class="flex flex-col mt-2 space-y-4">
            <div
              v-for="(item, j) in cat.items"
              :key="j"
              class="flex items-start space-x-2"
              :class="{
                'opacity-50 pointer-events-none':
                  getCartItem(`${cat.cid}`, `${item.id}`) >= item.amount,
              }"
            >
              <div class="flex-1 pl-4">
                <div>{{ item.name }}</div>
                <div class="text-opacity-70 text-black text-[12px] mt-2">
                  <span>left</span>
                  <span class="font-mono">{{
                    getItemLeft(`${cat.cid}`, `${item.id}`, item.amount)
                  }}</span>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div
                  class="py-1 px-2 font-mono text-[12px] rounded"
                  :class="{
                    'bg-green-500': item.price > item.old_price,
                    'bg-red-500': item.price < item.old_price,
                    'bg-gray-100': item.price === item.old_price,
                  }"
                >
                  <span>{{ convertPrice(item.price) }}</span>
                </div>

                <button
                  class="border-1px border-gray-500 px-3 py-1 text-sm rounded-sm"
                  @click="addToCart(`${cat.cid}`, `${item.id}`)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 426.7 426.7"
                  >
                    <path
                      d="M128 341c-24 0-42 19-42 43s18 43 42 43a43 43 0 100-86zM151 235h159c16 0 30-9 38-22l76-139c2-3 3-6 3-10 0-12-10-21-22-21H90L70 0H0v43h43l76 161-28 53c-4 6-6 13-6 20 0 24 19 43 43 43h256v-43H137c-3 0-5-2-5-5v-3l19-34zM341 341c-23 0-42 19-42 43s19 43 42 43a43 43 0 100-86z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <h2>Cart</h2>
    <section class="section-block">
      <div>
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

        <div
          class="border-t-1 border-gray-100 pt-4 flex items-center"
          v-if="cartItems.length"
        >
          <div>total:</div>
          <div
            class="bg-gray-100 rounded py-1 mx-3 px-2 font-mono text-[12px] inline-flex font-bold"
          >
            {{ totalPrice }}
          </div>
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
  onMounted,
} from '@nuxtjs/composition-api'

import { formatPrice, getCurrency, exchangePrice } from '~/composable/currency'
import { ICatalog, TCartItemIds } from '~/types'
import { useAccessor } from '~/composable/store'
import { debounce, isNumeric } from '~/utils'
import { getRandomNumber } from '~/api/utils'

export default defineComponent({
  props: {},
  setup() {
    const { $axios } = useContext()
    const accessor = useAccessor()

    const source = ssrRef<ICatalog | null>(null)
    const currency = computed(() => accessor.currency)

    useAsync(async () => {
      source.value = await $axios.$get('/api/v1/catalog')
    })

    const refreshData = async () => {
      console.log('refresh')
      const data = await $axios.$get<ICatalog>('/api/v1/catalog?rand=1')

      data.goods.Value.Goods.forEach(item => {
        if (!source.value) return
        const oldIndex = source.value?.goods.Value.Goods.findIndex(
          o => o.G === item.G && item.T === o.T
        )

        if (oldIndex !== undefined) {
          source.value.goods.Value.Goods[oldIndex].O =
            source.value?.goods.Value.Goods[oldIndex].C
          source.value.goods.Value.Goods[oldIndex].C = item.C
        } else {
          source.value.goods.Value.Goods.push(item)
        }
      })
      accessor.SET_CURRENCY(getRandomNumber(20, 80))
    }

    onMounted(() => {
      if (process.browser) {
        setInterval(() => {
          refreshData()
        }, 15 * 1000)
      }
    })

    const goods = computed(() => source.value?.goods.Value.Goods || [])
    const names = computed(() => source.value?.names || {})

    const getName = (cid: number | string, id: number | string) => {
      return names.value[cid]?.B[id]?.N || ''
    }

    const getGood = (cid: number | string, id: number | string) => {
      return goods.value.find(item => `${item.T}` === id && `${item.G}` === cid)
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
          items: {
            id: number
            price: number
            old_price: number
            amount: number
            name: string
          }[]
        }
      } = {}

      for (let {
        G: cid,
        T: id,
        C: price,
        P: amount,
        O: old_price,
      } of goods.value) {
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
          price,
          old_price: old_price ?? price,
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
      let value = parseInt(event.target.value)

      const goodCount = getGood(cid, id)?.P || 1
      const cartCount = getCartItem(cid, id)

      if (!isNumeric(value) || value <= 0) {
        value = 0
      }

      console.log(cartCount, goodCount, cartCount >= goodCount)

      if (value >= goodCount) {
        value = goodCount
        console.log(cartCount, goodCount)
      }

      event.target.value = `${value}`
      accessor.cart.amount({ cid, id, amount: value })
    }

    const cartItems = computed(() =>
      accessor.cart.items.map(item => ({
        ...item,
        name: getName(item.cid, item.id),
      }))
    )

    const getCartItem = (cid: string, id: string) =>
      accessor.cart.item({ cid, id })

    const totalPrice = computed(() =>
      convertPrice(accessor.cart.totalPrice(goods.value))
    )

    const getItemLeft = (cid: string, id: string, amount: number) => {
      const value = getCartItem(cid, id) || 0
      const result = amount - value
      return result
    }

    return {
      getItemLeft,
      totalPrice,
      getCartItem,
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
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.section-block {
  @apply bg-white shadow-2xl rounded-xl p-4 mb-8 mt-4;
}
.cart-table td,
.cart-table th {
  @apply pr-4 pb-2;
}
</style>
