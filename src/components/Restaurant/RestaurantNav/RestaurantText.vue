<template>
  <div class="restaurant-text">
    <p class="title">
      <label :for="inputName">{{ inputText }}:</label>
    </p>
    <input
      type="text"
      class="text"
      :id="inputName"
      v-model.trim="observeValue"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'RestaurantText',
  props: {
    inputName: {
      type: String,
      required: true
    },
    inputText: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    observeValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style>
.restaurant-text {
  padding-left: 5px;
  display: flex;
  align-items: center;
}
.text {
  margin-left: 5px;
  margin-right: 5px;
  width: 50%;
}
</style>
