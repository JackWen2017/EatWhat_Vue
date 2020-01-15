<template>
  <div>
    <RestaurantView />
    <RestaurantNav />
  </div>
</template>

<script>
import RestaurantView from "./RestaurantView/index";
import RestaurantNav from "./RestaurantNav/index";
export default {
  name: "Restaurant",
  components: {
    RestaurantView,
    RestaurantNav
  }
};
</script>

<style>
</style>