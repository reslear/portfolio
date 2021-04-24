import Vue from 'vue'
import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'
interface ICartItem {
  id: string
  cid: string
  amount: number
}
type TCartItemIds = Pick<ICartItem, 'id' | 'cid'>

type TCartItems = { [K: string]: number }

let isNum = (n: any) => !isNaN(parseFloat(n)) && isFinite(n)
const isPlainObj = (o: any) => typeof o == 'object' && o.constructor == Object

const LOCAL_STORAGE_KEY = 'cart'
const delimiterKey = '_'
const parseKey = (key: string) => {
  const [cid, id] = key.split(delimiterKey)
  return { cid, id }
}
const printKey = (cid: string, id: string) => {
  return cid + delimiterKey + id
}

const setStore = (items: TCartItems) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
}

const getStorage = () => {
  if (!process.browser) return {}

  try {
    const context: TCartItems = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || ''
    )

    if (!isPlainObj(context)) {
      return {}
    }

    const result: TCartItems = {}

    for (let [key, amount] of Object.entries(context)) {
      const { cid, id } = parseKey(key)

      if (cid && id && isNum(amount) && amount > 0) {
        result[printKey(cid, id)] = amount
      }
    }

    return result
  } catch (e) {
    console.error(e)
  }
  return {}
}

export const state = () => ({
  items: {} as TCartItems,
})

export const getters = getterTree(state, {
  items: (state) =>
    Object.keys(state.items).map((key) => {
      const { cid, id } = parseKey(key)
      return { cid, id, amount: state.items[key] }
    }),
})

interface ICartMPayload {
  key: string
  amount: number
}

export const mutations = mutationTree(state, {
  ADD_ITEM(state, p: ICartMPayload) {
    Vue.set(state.items, p.key, p.amount)
  },

  DELETE_ITEM(state, p: Pick<ICartMPayload, 'key'>) {
    Vue.delete(state.items, p.key)
  },

  SET_ITEMS(state, items: TCartItems) {
    state.items = items
  },

  SET_AMOUNT(state, p: ICartMPayload) {
    Vue.set(state.items, p.key, p.amount)
  },
})

const checkCartItem = (state: any, cid: string, id: string) => {
  const key = printKey(cid, id)

  if (!state.items[key]) {
    return {}
  }

  return {
    key,
  }
}

export const actions = actionTree(
  { state, getters, mutations },
  {
    init({ commit }) {
      commit('SET_ITEMS', getStorage())
    },

    save({ state }) {
      setStore(state.items)
    },

    add({ commit, state, dispatch }, { id, cid, amount = 1 }: ICartItem) {
      const key = printKey(cid, id)

      if (!state.items[key] && isNum(amount)) {
        commit('ADD_ITEM', { key, amount })
        dispatch('save')
      }
    },

    amount(
      { state, commit, dispatch },
      { minus, id, cid }: ICartItem & { minus?: boolean }
    ) {
      const { key } = checkCartItem(state, cid, id)

      if (key) {
        const amount = state.items[key]
        const value = minus ? amount - 1 : amount + 1

        if (value < 1) return false

        commit('SET_AMOUNT', { amount, key })
        dispatch('save')
      }
    },

    delete({ commit, state, dispatch }, { id, cid }: TCartItemIds) {
      const { key } = checkCartItem(state, cid, id)

      if (key) {
        commit('DELETE_ITEM', { key })
        dispatch('save')
      }
    },
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {},
})
