<template>
  <div>
    <div class="restaurant" v-if="isLoading">資料讀取中...</div>
    <Restaurant v-else />
  </div>
</template>

<script>
import Restaurant from '@/components/Restaurant'
export default {
  components: {
    Restaurant
  },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>

<style>
.restaurant {
  background: rgb(28, 206, 152);
  border: 3px solid rgb(19, 10, 145);
  border-radius: 10px;
  box-shadow: 2px 2px 5px cornflowerblue;
  width: 95%;
  margin: auto;
  text-align: center;
  line-height: 90vh;
  font-size: 23px;
  color: blue;
}
</style>
