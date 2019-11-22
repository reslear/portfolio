<template>
  <div>
	  


	  1 <img :src="`http://www.nbrb.by/i/flags/flags/4x3/${base[0].substr(0, 2)}.svg`" class="flag"> {{ base[0] }}
	  <hr>
	<div v-if="currArray" class="all">
	  	<div v-for="(item, index) in currArray" class="item" :key="index">
			<div><img :src="`http://www.nbrb.by/i/flags/flags/4x3/${item.key.substr(0, 2)}.svg`" class="flag"></div> 
			<div class="name">{{item.key}}</div>
			<div>–</div>
			<div>{{ item.value.toFixed(2) }}</div>
		</div>
	</div>
	<div v-else>Загрузка ...</div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters } from 'vuex';

export default {
  	name: 'current',
  	computed: {
		...mapGetters([
			'currArray',
			'base'	
		])
  	},
  	components: {
		HelloWorld
 	}
}
</script>

<style scoped>
.wrap-input {
}

.current-input{
	display: block;
	width:100%;
	height: 50px;
}


.all{
	width:500px;
	display: flex;
	flex-wrap: wrap;
	text-align: left;
}
.item {
	width: 200px;
	display: flex;
}
.name {
	width: 40px;
}
.item > div {
	padding-left: 10px;
}
.flag {
	border-radius: 3px;
	height: 16px;
}
</style>