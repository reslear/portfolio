<template>
  <div>
		 <div class="">
		 	<div class="selector-wrap">
			 	<cur-select :data="data" :selected="selected[1]" :favorite="favorite[1]" @change="setSelectedFav(1, $event)" style="margin:0 auto"/>
			</div>
			<div class="wrap-input">
				<input type="number" v-model.number="value" class="convert-input" placeholder="Введите сумму..." />
			</div>
		</div>

		<hr class="convert-line" />
		
		<div class="">
	 		<div class="selector-wrap">
				<cur-select :data="data" :selected="selected[2]" :favorite="favorite[2]" @change="setSelectedFav(2, $event)" style="margin:0 auto"/>
			</div>
			<div class="output">
			= {{ calculate }} {{selected[2]}}
			</div>
		</div>
		

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

import CurSelect from '@/components/CurSelect'


export default {
	components: {CurSelect},
	computed: {
		...mapFields('app', [
			'value',
			'selected',
			'favorite'
		]),
		...mapGetters('curr', ['data']),

		calculate() {
			const fromCurrency = this.data[this.selected[1]];
			const toCurrency = this.data[this.selected[2]];

			return ((1 / fromCurrency) * toCurrency * this.value).toFixed(2);
		}
  	},
	methods: {
		setSelectedFav(id, obj) {
			this.$store.commit('app/setSelectedFav', {id, ...obj});
		},
	},
}
</script>

<style>
.convert-input{
	height:70px;
	width: 100%;
	display: block;
	border: 0;
	outline: 0;
	font-size: 60px;
	padding: 0 20px;
	text-align: center;
	box-sizing: border-box;
	color:    var(--text-color-gray);
}

.convert-input::placeholder { 
	color:    var(--text-color-gray);
}

.convert-line {
	margin: 20px 0;
}

.selector-wrap{
	padding: 20px 0;
}
.output {
	text-align: center;
	font-size: 60px;
}
</style>