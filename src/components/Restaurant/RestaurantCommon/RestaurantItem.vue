<template>
  <div class="restaurant-item" :class="{ active }">
    {{ text }}
    <input type="button" value="X" class="delete" @click="deleteRestaurant" />
  </div>
</template>

<script>
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
        this.$emit('deleteData', this.id)
      }
    }
  }
}
</script>

<style></style>
