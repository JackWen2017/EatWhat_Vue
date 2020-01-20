<template>
  <div>
    <RestaurantView />
    <div class="restaurant-nav">
      <RestaurantForm />
      <RestaurantCtl @changeFilter="changeFilter" @startRandom="startRandom" />
    </div>
  </div>
</template>

<script>
import RestaurantView from './RestaurantView'
import RestaurantForm from './RestaurantForm'
import RestaurantCtl from './RestaurantCtl'
export default {
  name: 'Restaurant',
  components: {
    RestaurantView,
    RestaurantForm,
    RestaurantCtl
  },
  methods: {
    changeFilter(key, value) {
      this.$store.commit('restaurant/SET_CURRENT', 0)
      this.$store.commit('restaurant/SET_FILTER', { key, value })
    },
    startRandom() {
      this.$store.commit('restaurant/SET_CTRL_DISABLE', true)
      alert('Random')
      this.$store.commit('restaurant/SET_CTRL_DISABLE', false)
    }
  }
}
</script>

<style>
.restaurant-nav {
  display: flex;
  justify-content: center;
  width: 95%;
  border: 3px solid rgb(19, 10, 145);
  border-radius: 0px 0px 10px 10px;
  box-shadow: 2px 2px 5px cornflowerblue;
  margin: auto;
}
</style>
