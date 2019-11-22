<template>
  <div>
		 <div class="">
		 	<div class="selector-wrap">
				<cur-select :curr-array="currArray" :base="[1, base[1]]" @change-base="setBase" style="margin:0 auto"/>
			</div>
			<div class="wrap-input">
				<input type="number" v-model.number="value" class="convert-input" placeholder="Введите сумму..." />
			</div>
		</div>

		<hr class="convert-line" />
		
		<div class="">
	 		<div class="selector-wrap">
				<cur-select :curr-array="currArray" :base="base" @change-base="setBase" style="margin:0 auto"/>
			</div>
			<div class="output">
				= {{ value * 2 }} USD
			</div>
		</div>
		

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CurSelect from '@/components/CurSelect'

export default {
	components: {CurSelect},
	computed: {
		...mapGetters([
			'currArray',
			'base'
		])
  	},
	data: () => ({
        options: ['list', 'of', 'options'],
		value: '30'
	}),
	methods: {
		setBase(arr) {
			this.$store.commit('updateBase', arr)
		}
	}
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
	margin: 20px 0;
}
.output {
	text-align: center;
	font-size: 60px;
}
</style>