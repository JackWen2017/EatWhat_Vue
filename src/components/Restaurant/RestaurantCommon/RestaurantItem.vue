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
