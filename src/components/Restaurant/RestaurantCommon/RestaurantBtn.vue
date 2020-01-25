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

<style></style>
