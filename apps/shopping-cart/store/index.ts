import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex'

import { getCurrency, formatPrice } from '~/composable/currency'
import * as cart from '~/store/cart'

export const state = () => ({
  currency: 0 as number,
})

export const getters = getterTree(state, {
  formatCurrency: (state) => formatPrice(state.currency),
})

export const mutations = mutationTree(state, {
  SET_CURRENCY(state, currency: number) {
    state.currency = currency
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getCurrency({ commit }) {
      const currency = await getCurrency()
      commit('SET_CURRENCY', currency)
    },

    async nuxtServerInit({ dispatch }) {
      await dispatch('getCurrency')
      await dispatch('cart/init')
    },
  }
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    cart,
  },
})
