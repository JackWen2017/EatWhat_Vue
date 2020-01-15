<template>
  <div id="app">
    <Restaurant />
  </div>
</template>

<script>
import Restaurant from "@/pages/Restaurant.vue";

export default {
  name: "app",
  components: {
    Restaurant
  }
};
</script>

<style>
body {
  background-color: rgb(58, 232, 255);
}
input {
  border: none;
  text-decoration: none;
  border-radius: 6px;
  height: 22px;
  font-size: 14px;
}
</style>
