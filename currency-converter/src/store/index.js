import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { getField, updateField } from 'vuex-map-fields';

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
				data: {} 
			},
			mutations: {
				update(state, data) {
					state.data = data;
				}
			},
			getters: {
				data: s => s.data,
			}
		}
	},
	plugins: [

		...['app', 'curr'].map(name => createPersistedState({key: name, paths: [name]}))
		// createPersistedState({key:'app', paths: ['app']}),
		// createPersistedState({key:'app', paths: ['app']})
	]
})
