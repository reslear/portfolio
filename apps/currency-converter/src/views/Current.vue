<template>
  <div class="current">
    <div class="selector-wrap">
      <cur-select
        :data="data"
        :selected="selected[0]"
        :favorite="favorite[0]"
        @change="setSelectedFav(0, $event)"
        style="margin:0 auto"
      />
    </div>
    <div class="eden">1 =</div>
    <hr />
    <div class="items">
      <template v-for="(value, key) in data">
        <div class="item" v-if="key != selected[0]" :key="key">
          <div class="item-content">
            <span
              class="flag"
              :style="{
                backgroundImage: `url(https://lipis.github.io/flag-icon-css/flags/4x3/${key
                  .toLowerCase()
                  .substr(0, 2)}.svg)`
              }"
            ></span>
            <span class="value">{{ fixNumbers(value) }}</span>
            <span class="key">{{ key.toLowerCase() }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import CurSelect from "@/components/CurSelect";

export default {
  name: "current",
  components: { CurSelect },

  computed: {
    ...mapFields("app", ["value", "selected", "favorite"]),
    ...mapFields("curr", ["data", "base"])
  },
  created() {
    this.changeSelect(this.selected[0]);
  },
  methods: {
    setSelectedFav(id, obj) {
      this.$store.commit("app/setSelectedFav", { id, ...obj });

      if (obj.type == "selected") this.changeSelect(obj.value);
    },
    fixNumbers(value) {
      return parseFloat(value.toFixed(2)).toLocaleString();
    },
    changeSelect(value) {
      this.$store.dispatch("curr/update", value);
    }
  }
};
</script>

<style scoped>
.selector-wrap {
  padding-top: 48px;
  padding-bottom: 24px;
  text-align: center;
}
.eden {
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  padding: 0 0 48px;
}

.items {
  padding: 24px 16px 40px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 0 25%;
}

@media (max-width: 680px) {
  .item {
    flex: 0 33%;
  }
}
@media (max-width: 420px) {
  .item {
    flex: 0 50%;
  }
}

.item-content {
  display: flex;
  padding-top: 16px;
  padding-left: 20px;
}

.item .value {
  padding-left: 16px;
  font-weight: bold;
  font-size: 14px;
}

.item .key {
  padding-left: 8px;
  font-variant-numeric: tabular-nums;
}
</style>
