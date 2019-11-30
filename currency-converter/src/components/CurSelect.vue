<template>
    <div class="cur-select">

        <div :class="['cur-selected', {show}]" v-if="active" @click="show = !show">
            <span class="flag" :style="{backgroundImage: `url(http://www.nbrb.by/i/flags/flags/4x3/${active.substr(0, 2)}.svg)`}"></span>    
            <span class="title">{{ active }}</span>
            <svg  class="arrow" viewBox="0 0 10 6" width="10" height="6" fill="#A7ADC6"><path d="M5 3.3L7.87.44A.8.8 0 019 1.57L5.52 5.01c-.3.3-.77.3-1.06 0L1.01 1.56A.8.8 0 012.14.43L5 3.3z"/></svg>
        </div>

        <div v-show="show" v-if="Object.keys(items).length" class="dropdown">
            <div v-for="(item, key) in items" class="item" :key="key"> 
                <div class="item-content">
                    <div class="left" @click="select(key)">
                        <span class="flag" :style="{backgroundImage: `url(http://www.nbrb.by/i/flags/flags/4x3/${key.substr(0, 2)}.svg)`}"></span>    
                        <span class="title">{{ key }}</span>
                    </div>
                    <svg :class="['star', {'fav' : isFav(key)}]" @click="toggleFav(key)"><title>Добавить в избранное</title><use xlink:href="#star" /></svg>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    props: {
        data: {
            default: () => ({}),
            type: Object
        },
        selected: {
            default: '',
            type: String
        },
        favorite: {
           default: () => ([]),
            type: Array
        },
    },
    data: () => ({
        show: false,     
        items: [],
        active: '',
        active_fav: []
    }),
    methods: {
        select(value){
            this.$emit('change', {type: 'selected', value});
            
            this.show = false;
            this.active = value;
        },
        toggleFav(key){

            const index = this.active_fav.indexOf(key);

            if(index != -1) {
                this.active_fav.splice(index, 1); 
            } else {
                this.active_fav.push(key);
            }

            this.$emit('change', {type: 'favorite', value: this.active_fav});
            this.renderItems();
        },
        toggleDropdown (e) {
            this.show = !this.show
        },
        close (e) {
            if (!this.$el.contains(e.target)) {
                this.show = false
            }
        },
        isFav(key){
            return this.active_fav.includes(key);
        },
        renderItems(){
            let sortedObj = Object.entries(this.data).sort(a => {
                return this.isFav(a[0]) ? -1 : 1
            });

            this.items = Object.fromEntries(sortedObj);
        }
    },
    mounted() {
        document.addEventListener('click', this.close);

        this.active_fav = this.favorite;

        this.renderItems();
        this.active = this.selected ? this.selected : this.items[0].key;
    },
    beforeDestroy () {
        document.removeEventListener('click',this.close)
    },
    watch: {
        'fav' : 'renderItems'
    }
}
</script>

<style scoped>
.cur-select{
    font-size: 14px;
    width: 100px;
    position:relative;
}
.cur-selected{
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}



/*  hover effects */
.cur-selected:hover .title, .cur-selected.show .title{
    color: var(--text-color-black);
}
.cur-selected:hover svg, .cur-selected.show svg{
    fill: var(--text-color-black);
}

.cur-selected:hover .flag, .cur-selected.show .flag{
    opacity:1;
}

.title {
    margin:0 8px;
    font-weight: bold;
    color: var(--text-color-gray);
}

/* dropdown */
.dropdown {
    position: absolute;
    margin-top: 8px;
    margin-left: -8px;
    z-index: 10;
    background: #fff;
    box-shadow: 0 5px 20px 0 var(--text-color-gray);
    border-radius: 3px;
    overflow-y: auto;
    max-height: 200px;
}

.item .left, .item .star {
    cursor: pointer;
    height: 40px;
    padding: 0 16px;
}
.item .left{
    display: flex;
    align-items: center;
}
.item:nth-child(even){
    background: rgba(0,0,0,.03);
}

.item-content{
    display: inline-flex;
    align-items: center;
}
.item .flag {opacity: 1}

.item:hover {background: #E7EDFF;}
.item:hover .title {color: #4256E8;}
.item:hover .star {opacity:1;}

.item .title{flex: 1;margin-right: auto;width: 30px;}
.star{width:12px;height:12px;opacity:0;fill: var(--text-color-gray);}
.star:hover, .star.fav{fill: #E5AA17; opacity: 1}


.arrow{
    animation: arrow 3s linear infinite alternate;
}

@keyframes arrow {
    0% {transform: translateY(1px)}		
    50% {transform: translateY(-1px);}	
    100% {transform: translateY(0px)}	
}
</style>