<template>
  <div class="restaurant-view">
    <div class="list">
      <ResturantItem
        v-for="(resutrant, index) in list"
        :key="resutrant.id"
        :text="resutrant.name"
        :id="resutrant.id"
        :active="active(index)"
      />
    </div>
  </div>
</template>

<script>
import ResturantItem from './RestaurantItem'
const listTestData = {
  Restaurants: [
    { id: 1, name: '美食小館', distance: [1, 2], taste: [1] },
    { id: 2, name: '美食小館1', distance: [1], taste: [2] },
    { id: 3, name: '美食小館2', distance: [1], taste: [1, 2] }
  ]
}

export default {
  name: 'RestaurantView',
  components: {
    ResturantItem
  },
  computed: {
    list: {
      get() {
        return listTestData.Restaurants
      }
    },
    current: {
      get() {
        return 0
      }
    }
  },
  methods: {
    active(index) {
      return index === this.current
    }
  }
}
</script>

<style>
.restaurant-view {
  background: rgb(28, 206, 152);
  border: 3px solid rgb(19, 10, 145);
  border-radius: 10px 10px 0px 0px;
  box-shadow: 2px 2px 5px cornflowerblue;
  height: 65vh;
  width: 95%;
  margin: auto;
}
.list {
  height: 100%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
}
</style>
