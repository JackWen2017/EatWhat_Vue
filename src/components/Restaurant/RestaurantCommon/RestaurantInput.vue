<template>
  <div class="restaurant-input">
    <p class="title">{{ inputText }}:</p>
    <div
      v-for="(data, index) in inputData"
      :key="index"
      class="restaurant-choice"
    >
      <input
        :type="inputType"
        :class="inputType"
        :name="inputName"
        :id="`${inputName}_${index + 1}`"
        :value="index + 1"
        v-model="observeValue"
        :disabled="disabled"
      />
      <p>
        <label :for="`${inputName}_${index + 1}`">{{ data }}</label>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestaurantInput',
  props: {
    inputName: {
      type: String,
      required: true
    },
    inputText: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      required: true
    },
    inputData: {
      type: Array,
      required: true
    },
    value: {
      type: [Array, Number],
      default: null
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
