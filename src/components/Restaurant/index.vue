<template>
  <div>
    <RestaurantNav
      @changeFilter="changeFilter"
      @startRandom="startRandom"
      @formSend="formSend"
    />
    <RestaurantView @deleteData="deleteData" />
  </div>
</template>

<script>
import RestaurantNav from './RestaurantNav'
import RestaurantView from './RestaurantView'
export default {
  name: 'Restaurant',
  components: {
    RestaurantView,
    RestaurantNav
  },
  methods: {
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
    async formSend(sendValue, callback) {
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
      callback()
    },
    changeFilter(key, value) {
      this.$store.commit('restaurant/SET_CURRENT', 0)
      this.$store.commit('restaurant/SET_FILTER', { key, value })
    },
    async startRandom() {
      await this.$store.dispatch('restaurant/CHANGE_RANDOM')
      let nowRestaurant = this.$store.getters['restaurant/nowRestaurant']
      if (nowRestaurant) alert('就選 ' + nowRestaurant)
      this.$store.commit('restaurant/SET_CURRENT', 0)
    },
    async deleteData(id) {
      await this.$store.dispatch('DELETE_RESTAURANT', id)
      this.$store.commit('restaurant/SET_CURRENT', 0)
      // await this.$store.dispatch("GET_RESTAURANT")
      let resturants = this.$store.state.restaurants
      let deleterData = resturants.find(resturant => resturant.id === id)
      let index = resturants.indexOf(deleterData)
      let newData = resturants
        .slice(0, index)
        .concat(resturants.slice(index + 1))
      this.$store.commit('SET_RESTAURANT', newData)
    }
  }
}
</script>

<style></style>
