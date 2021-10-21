<template>
  <div id="app">
    <router-view />
    <Popup />
  </div>
</template>

<script>
import Popup from "@/components/Popup.vue";

export default {
  name: "App",
  components: {
    Popup,
  },
};
</script>

<style lang="scss">
@import "css/main.scss";
</style>
