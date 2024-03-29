import Vue from 'vue'
import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'
import { isNumeric, hasKey } from '~/utils'
import {
  ICartItem,
  ICartMPayload,
  IGoodsValueData,
  TCartItemIds,
  TCartItems,
} from '~/types'
import { getStorage, parseKey, printKey, setStore } from '~/utils/localstorage'

export const state = () => ({
  items: {} as TCartItems,
})

export const getters = getterTree(state, {
  items: state =>
    Object.keys(state.items).map(key => {
      const { cid, id } = parseKey(key)
      return { cid, id, amount: state.items[key] }
    }),

  item: state => (p: TCartItemIds) => {
    const key = printKey(p.cid, p.id)
    return state.items[key]
  },

  totalPrice: state => (goods: IGoodsValueData[]) => {
    const arr = Object.keys(state.items)

    let result = arr.reduce((acc, curr) => {
      const { cid, id } = parseKey(curr)

      const qty = state.items[curr]
      const good = goods.find(item => `${item.G}` === cid && `${item.T}` === id)

      if (good && good.P > 0) {
        const price = good.C
        return acc + price * qty
      }

      return acc
    }, 0)

    return result
  },
})

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

      if (!isNumeric(amount) || amount < 1) return false

      if (hasKey(state.items, key)) {
        commit('SET_AMOUNT', { key, amount: state.items[key] + amount })
      } else {
        commit('ADD_ITEM', { key, amount })
      }

      dispatch('save')
    },

    amount({ state, commit, dispatch }, { id, cid, amount }: ICartItem) {
      const key = printKey(cid, id)

      if (hasKey(state.items, key)) {
        if (amount < 1) return false

        commit('SET_AMOUNT', { key, amount })
        dispatch('save')
      }
    },

    delete({ commit, state, dispatch }, { id, cid }: TCartItemIds) {
      const key = printKey(cid, id)

      if (hasKey(state.items, key)) {
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
