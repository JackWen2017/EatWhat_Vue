<template>
  <div>
    <div class="restaurant" v-if="isLoading">資料讀取中...</div>
    <Restaurant v-else />
  </div>
</template>

<script>
import Restaurant from '@/components/Restaurant'
import restaurants from '@/store/Restaurants'
export default {
  components: {
    Restaurant
  },
  data() {
    return {
      isLoading: false
    }
  },
  async mounted() {
    this.isLoading = true
    await this.$store.dispatch('GET_RESTAURANT')
    if (!this.$store.hasModule('restaurant')) {
      this.$store.registerModule('restaurant', restaurants())
    }
    this.isLoading = false
  },
  beforeDestroy() {
    if (this.$store.hasModule('restaurant')) {
      this.$store.unregisterModule('restaurant')
    }
  }
}
</script>

<style src="@/assets/css/restaurant.css"></style>
