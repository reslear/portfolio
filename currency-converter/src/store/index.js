import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currArray: [],
		selected: ['EUR', 'PLN', 'USD'],
		favorite : [['EUR'], ['PLN'], ['USD']]
	},
	mutations: {
		currUpdate(state, obj) {

			let outArray = [];

			Object.keys(obj).map(key => outArray.push({key, value: obj[key]}) );
			state.currArray = outArray;
		},
		setSelectedFav: (state, obj) => {
			Vue.set(state[obj.type], obj.id, obj.value);
		},
		
	},
	getters: {
		currArray: s => s.currArray,
		selected: s => s.selected,
		favorite: s => s.favorite
	},
	plugins: [createPersistedState()]
})
