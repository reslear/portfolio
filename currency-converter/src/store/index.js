import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currArray: [],
		base: ['EUR', 'PLN', 'USD'],
		fav : [['EUR'], ['PLN'], ['USD']]
	},
	mutations: {
		currUpdate(state, obj) {

			let outArray = [];

			Object.keys(obj).map(key => outArray.push({key, value: obj[key]}) );
			state.currArray = outArray;
		},
		updateBase(state, arr){
			state.base[arr[0]] = arr[1];
		}
	},
	actions: {
		async update({ commit, state }, base = 'USD') {
			const {data} = await axios('https://api.exchangeratesapi.io/latest?base=' + base);
			commit('currUpdate', data.rates);
	 	}
	},
	getters: {
		currArray: s => s.currArray,
		base: s => s.base,
		fav: s => s.fav
	},
	plugins: [createPersistedState()]
})
