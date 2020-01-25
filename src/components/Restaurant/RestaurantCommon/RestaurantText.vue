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
      :disabled="disabled"
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
    },
    disabled: {
      type: Boolean,
      default: false
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

<style></style>
