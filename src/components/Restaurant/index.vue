<template>
  <div>
    <RestaurantView />
    <div class="restaurant-nav">
      <RestaurantForm @formSend="formSend" />
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
    async startRandom() {
      await this.$store.dispatch('restaurant/CHANGE_RANDOM')
      let nowRestaurant = this.$store.getters['restaurant/nowRestaurant']
      if (nowRestaurant) alert('就選 ' + nowRestaurant)
    },
    async insertData(resturants, data) {
      let add = await this.$store.dispatch('INSERT_RESTAURANT', data)
      let result =
        add && JSON.stringify(add) !== '{}'
          ? resturants.concat(add)
          : resturants
      return result
    },
    async updateData(resturants, data, repeatData) {
      let id = repeatData.id
      let restaurant = { id, data }
      let update = await this.$store.dispatch('UPDATE_RESTAURANT', restaurant)
      let index = resturants.indexOf(repeatData)
      let result =
        update && JSON.stringify(update) !== '{}'
          ? resturants
              .slice(0, index)
              .concat(update)
              .concat(resturants.slice(index + 1))
          : resturants
      return result
    },
    async formSend(sendValue) {
      let resturants = this.$store.state.restaurants
      let repeatData = resturants.find(
        resturant => resturant.name === sendValue.name
      )
      let newData = resturants
      if (repeatData) {
        newData = await this.updateData(resturants, sendValue, repeatData)
      } else {
        newData = await this.insertData(resturants, sendValue)
      }
      if (newData !== resturants) {
        this.$store.commit('SET_RESTAURANT', newData)
      }
      // await this.$store.dispatch('GET_RESTAURANT')
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
