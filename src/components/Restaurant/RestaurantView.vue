<template>
  <div class="restaurant-view">
    <div class="list">
      <ResturantItem
        v-for="(resutrant, index) in list"
        :key="resutrant.id"
        :text="resutrant.name"
        :id="resutrant.id"
        :active="active(index)"
        @deleteData="deleteData"
      />
    </div>
  </div>
</template>

<script>
import ResturantItem from './RestaurantCommon/RestaurantItem'
export default {
  name: 'RestaurantView',
  components: {
    ResturantItem
  },
  computed: {
    list: {
      get() {
        return this.$store.getters['restaurant/restaurantList']
      }
    },
    current: {
      get() {
        return this.$store.state.restaurant.current
      }
    }
  },
  methods: {
    active(index) {
      return index === this.current
    },
    deleteData(id) {
      this.$emit('deleteData', id)
    }
  }
}
</script>

<style></style>
