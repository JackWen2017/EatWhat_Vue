<template>
  <div class="restaurant-nav">
    <div class="restaurant-box-ctrl" @click="show = !show">
      <span class="restaurant-box-text"
        >{{ show ? '隱藏' : '顯示' }}餐廳功能選單</span
      >
    </div>
    <transition name="slide">
      <div class="restaurant-box" v-if="showBox">
        <RestaurantForm @formSend="formSend" />
        <RestaurantCtl
          @changeFilter="changeFilter"
          @startRandom="startRandom"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import RestaurantForm from './RestaurantForm'
import RestaurantCtl from './RestaurantCtl'

export default {
  name: 'RestaurantNav',
  data() {
    return {
      show: true
    }
  },
  components: {
    RestaurantForm,
    RestaurantCtl
  },
  computed: {
    showBox() {
      let ctrlDisable = this.$store.getters['restaurant/ctrlDisable']
      let showBox = this.show && !ctrlDisable
      return showBox
    }
  },
  methods: {
    formSend(sendValue, callback) {
      this.$emit('formSend', sendValue, callback)
    },
    changeFilter(key, value) {
      this.$emit('changeFilter', key, value)
    },
    startRandom() {
      this.$emit('startRandom')
    }
  }
}
</script>

<style></style>
