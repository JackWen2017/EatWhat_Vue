<template>
  <div class="restaurant-ctl">
    <RestaurantBtn
      v-for="btn in btnList"
      :key="btn.id"
      :text="btnName(btn.key, btn.value)"
      :disabled="btnDisabled"
      @click.native="changeBtn(btn)"
    />
  </div>
</template>

<script>
import RestaurantBtn from './RestaurantCommon/RestaurantBtn'
const btnNameList = {
  distance: ['全部距離', '遠距離', '近距離'],
  taste: ['全部口味', '清淡', '不清淡'],
  random: ['開始抽籤']
}

export default {
  name: 'RestaurantCtl',
  components: {
    RestaurantBtn
  },
  data() {
    return {
      restaurant: ''
    }
  },
  computed: {
    btnDisabled() {
      let ctrlDisable = this.$store.getters['restaurant/ctrlDisable']
      return ctrlDisable ? ctrlDisable : false
    },
    btnList() {
      let btns = []
      let id = 1
      let filterValue = this.$store.getters['restaurant/filterValues']
      for (const key in btnNameList) {
        let value = filterValue && filterValue[key] ? filterValue[key] : 0
        btns.push({ id, key, value })
        id++
      }
      return btns
    }
  },
  methods: {
    btnName(key, value) {
      return btnNameList[key][value]
    },
    changeBtn(btn) {
      let key = btn.key
      if (key === 'random') {
        this.startRandom()
      } else {
        let value = (btn.value + 1) % btnNameList[key].length
        this.changeFilterValue(key, value)
      }
    },
    changeFilterValue(key, value) {
      this.$emit('changeFilter', key, value)
    },
    startRandom() {
      this.$emit('startRandom')
    }
  }
}
</script>

<style></style>
