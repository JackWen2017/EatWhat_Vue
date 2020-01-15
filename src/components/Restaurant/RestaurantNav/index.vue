<template>
  <div class="restaurant-nav">
    <RestaurantForm />
    <RestaurantCtl />
  </div>
</template>

<script>
import RestaurantForm from './RestaurantForm'
import RestaurantCtl from './RestaurantCtl'
export default {
  name: 'RestaurantNav',
  components: {
    RestaurantForm,
    RestaurantCtl
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
