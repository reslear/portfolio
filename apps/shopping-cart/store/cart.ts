import Vue from 'vue'
import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'

interface ICartItem {
  id: number
  cid: number
  amount: number
}
type TCartItemIds = Pick<ICartItem, 'id' | 'cid'>

let isNum = (n: any) => !isNaN(parseFloat(n)) && isFinite(n)

const getStorage = () => {
  try {
    const context: ICartItem[] = JSON.parse(localStorage.getItem('cart') || '')

    if (!Array.isArray(context) || !context.length) {
      return []
    }

    const result: ICartItem[] = []

    for (let { id, cid, amount } of context) {
      if (isNum(id) && isNum(cid) && isNum(amount) && amount > 0) {
        result.push({ id, cid, amount })
      }
    }

    return result
  } catch (e) {}
  return []
}

export const state = () => ({
  items: [] as ICartItem[],
})

export const getters = getterTree(state, {
  getItemIndex: (state) => ({ id, cid }: TCartItemIds) =>
    state.items.findIndex((item) => item.id === id && item.cid === cid),
})

export const mutations = mutationTree(state, {
  SET_ITEMS(state, payload: ICartItem[]) {
    state.items = payload
  },

  ADD_ITEM(state, { id, cid, amount = 1 }: ICartItem) {
    state.items.push({ id, cid, amount })
  },

  SET_FIELD(
    state,
    { index, key, value }: { index: number; key: string; value: any }
  ) {
    Vue.set(state.items[index], key, value)
    return true
  },

  DELETE_ITEM(state, index: number) {
    return !!state.items.splice(index, 1)
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    init({ commit }) {
      commit('SET_ITEMS', getStorage())
    },

    add({ commit, getters }, { id, cid, amount }: ICartItem) {
      const index = getters.getItemIndex({ id, cid })
      if (index === -1) return false

      commit('ADD_ITEM', { id, cid, amount })
    },

    amount(
      { state, commit, getters },
      { minus, id, cid }: ICartItem & { minus?: boolean }
    ) {
      const index = getters.getItemIndex({ id, cid })

      if (index === -1) return false

      const amount = state.items[index].amount
      const value = minus ? amount - 1 : amount + 1

      if (value < 1) return false

      return commit('SET_FIELD', { index, key: 'amount', value })
    },

    delete({ commit, getters }, { id, cid }: TCartItemIds) {
      const index = getters.getItemIndex({ id, cid })

      if (index === -1) {
        return false
      }

      return commit('DELETE_ITEM', index)
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
