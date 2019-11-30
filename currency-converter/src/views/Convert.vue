<template>
  <div>
		 <div class="">
		 	<div class="selector-wrap">
			 	<cur-select :data="data" :selected="selected[1]" :favorite="favorite[1]" @change="setSelectedFav(1, $event)"/>
			</div>
			<div class="wrap-input">
				<input type="number" v-model.number="value" class="convert-input" placeholder="Введите сумму..." />
			</div>
		</div>

		<hr class="convert-line" />
		
		<div class="">
	 		<div class="selector-wrap">
				<cur-select :data="data" :selected="selected[2]" :favorite="favorite[2]" @change="setSelectedFav(2, $event)"/>
			</div>
			<div class="output">
			= {{ calculate }} {{selected[2]}}
			</div>
		</div>
		

  </div>
</template>

<script>
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
		...mapFields('curr', ['data']),

		calculate() {
			const fromCurrency = this.data[this.selected[1]];
			const toCurrency = this.data[this.selected[2]];
			
			let result = ((1 / fromCurrency) * toCurrency * this.value);			
			return parseFloat(result.toFixed(2)).toLocaleString();
		}
  	},
	created(){
		if(!Object.keys(this.data).length) {
			this.$store.dispatch('curr/update');
		}
	},
	methods: {
		setSelectedFav(id, obj) {
			this.$store.commit('app/setSelectedFav', {id, ...obj});
		},
	},
}
</script>

<style scoped>
.convert-input{
	height:70px;
	width: 100%;
	display: block;
	border: 0;
	outline: 0;
	font-size: 60px;
	padding: 0 16px;
	text-align: center;
	box-sizing: border-box;
	color:    var(--text-color-gray);
	margin-bottom: 48px;
	text-overflow: ellipsis
}

.convert-input::placeholder { 
	color:    var(--text-color-gray);
}

.selector-wrap{
	padding: 48px 0 32px;
	text-align: center;
}
.output {
	word-wrap: break-word;
	text-align: center;
	font-size: 60px;
	padding-bottom: 48px;
}
</style>