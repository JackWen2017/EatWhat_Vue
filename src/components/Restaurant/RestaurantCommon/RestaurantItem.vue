<template>
  <div class="restaurant-item" :class="{ active }">
    {{ text }}
    <input type="button" value="X" class="delete" @click="deleteRestaurant" />
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'RestaurantItem',
  props: {
    text: {
      style: String,
      required: true
    },
    active: {
      style: Boolean,
      required: true
    },
    id: {
      Style: Number,
      required: true
    }
  },
  methods: {
    async deleteRestaurant() {
      if (confirm(`確定刪除${this.text}?`)) {
        await this.$store.dispatch('DELETE_RESTAURANT', this.id)
        this.$store.commit('restaurant/SET_CURRENT', 0)
        // await this.$store.dispatch("GET_RESTAURANT")
        let resturants = this.$store.state.restaurants
        let deleterData = resturants.find(resturant => resturant.id === this.id)
        let index = resturants.indexOf(deleterData)
        let newData = resturants
          .slice(0, index)
          .concat(resturants.slice(index + 1))
        this.$store.commit('SET_RESTAURANT', newData)
      }
    }
  }
}
</script>

<style>
.restaurant-item {
  height: 10px;
  font-size: 20px;
  margin: 10px;
  position: relative;
}
.restaurant-item.active {
  color: yellow;
}
.restaurant-item.active::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 3px;
  border-top: 10px solid rgba(0, 0, 0, 0);
  border-bottom: 10px solid rgba(0, 0, 0, 0);
  border-left: 10px solid yellow;
}
.delete {
  background-color: rgb(150, 3, 3);
  width: 20px;
  border-radius: 10px;
  text-align: center;
  padding: 0;
  color: #fff;
  font-weight: bold;
  margin-left: 10px;
}
.delete:hover {
  background-color: red;
}
</style>
