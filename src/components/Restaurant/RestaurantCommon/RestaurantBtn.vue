<template>
  <div class="restaurant-btn">
    <input type="button" :value="text" class="btn" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  name: 'RestaurantBtn',
  props: {
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.restaurant-btn {
  display: flex;
  justify-content: center;
}
.btn {
  border-radius: 10px;
  width: 70%;
  background-color: rgb(15, 98, 175);
  color: #fff;
  font-weight: bold;
  margin-left: 10px;
}
.btn:hover {
  background-color: rgb(0, 162, 255);
  color: #ff0;
}
.btn:disabled {
  background-color: rgba(15, 98, 175, 0.5);
  color: rgba(255, 255, 255, 0.5);
}
</style>
