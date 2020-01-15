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
import RestaurantBtn from './RestaurantBtn'
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
      btnDisabled: false,
      restaurant: '',
      filterValue: this.$store.getters.filterVal
    }
  },
  computed: {
    btnList() {
      let btns = []
      let id = 1
      for (const key in btnNameList) {
        let value = this.filterValue[key] ? this.filterValue[key] : 0
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
        this.btnDisabled = true
        alert('抽籤')
        this.btnDisabled = false
      } else {
        this.$store.commit('SET_CURRENT', 0)
        let value = (btn.value + 1) % btnNameList[key].length
        this.changeFilterValue(key, value)
      }
    },
    changeFilterValue(key, value) {
      this.$store.commit('SET_FILTER', { key, value })
    }
  }
}
</script>

<style>
.restaurant-ctl {
  background: rgb(252, 183, 119);
  width: 100%;
  border-radius: 0px 0px 5px 0px;
  border: 1.5px solid rgb(19, 10, 145);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
