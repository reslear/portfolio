import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { getField, updateField } from 'vuex-map-fields';
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({

	modules: {
		app: {
			namespaced: true,
			state: {
				selected: ['EUR', 'PLN', 'USD'],
				favorite : [['EUR'], ['PLN'], ['USD']],
				value: '',
			},			
			mutations: {
				updateField,
				setSelectedFav: (state, obj) => {
					Vue.set(state[obj.type], obj.id, obj.value);
				},
			},
			getters: {
				getField,
			},	
		},
		curr: {
			namespaced: true,
			state: {
				data: {},
				base: 'USD'
			},
			mutations: {
				update(state, data) {
					state.data = data.rates;
					state.base = data.base;
				}
			},
			getters: {
				getField,
			}
		}
	},
	plugins: [
		...['app', 'curr'].map(name => createPersistedState({key: name, paths: [name]}))
	]
})
