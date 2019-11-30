<template>
	<div class="current">
		<div class="selector-wrap">
			<cur-select :data="data" :selected="selected[0]" :favorite="favorite[0]" @change="setSelectedFav(0, $event)" style="margin:0 auto"/>
		</div>
		<div class="eden">1 =</div>
		<hr>
		<div class="items">
			<template v-for="(value, key) in data">		
				<div class="item" v-if="key != selected[0]" :key="key">
					<span class="flag" :style="{backgroundImage: `url(http://www.nbrb.by/i/flags/flags/4x3/${key.substr(0, 2)}.svg)`}"></span>    
					<span class="value">{{ fixNumbers(value) }}</span>
					<span class="key">{{ key.toLowerCase() }}</span>
				</div>
			</template>
		</div>
  </div>
</template>

<script>
import {getExchange} from '@/api';
import { mapFields } from 'vuex-map-fields';
import CurSelect from '@/components/CurSelect'

export default {
  	name: 'current',
	components: {CurSelect},

  	computed: {
		...mapFields('app', [
			'value',
			'selected',
			'favorite'
		]),
		...mapFields('curr', [
			'data', 
			'base'
		]),
  	},
	created(){
		this.changeSelect(this.selected[0]);
	},
	methods: {
		setSelectedFav(id, obj) {
			this.$store.commit('app/setSelectedFav', {id, ...obj});

			if(obj.type == 'selected') this.changeSelect(obj.value);
		},
		fixNumbers(value){
			return parseFloat(value.toFixed(2)).toLocaleString();
		},
		changeSelect(value){

			getExchange(value).then( data => {
				this.$store.commit('curr/update', data);
			}).catch(error => {
				console.error(error.message);
			});
		}
	},

}
</script>

<style scoped>
.selector-wrap{
	padding-top: 48px;
	padding-bottom: 24px;
}
.eden{
	font-size: 60px;
	font-weight: bold;
	text-align: center;
	padding: 0 0 48px;
}

.items{
	padding: 40px 0;
	display: grid;
  	grid-template-columns: repeat(3, 1fr);
	grid-row-gap: 16px;
}

@media (max-width: 680px) {
	.items{
		grid-template-columns: 1fr 1fr;
	}
}

.item {
	margin-left: 70px;
	display: flex;
}
.item .value{
	padding-left: 16px;
	font-weight: bold;
	font-size: 14px;
}

.item .key{
	padding-left: 8px
}
</style>