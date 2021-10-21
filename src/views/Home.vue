<template>
  <div class="body-wrapper" @click="deactiveAllState()">
    <div class="main-wrapper active">
      <Sidebar />
      <MainHome v-if="mainContent == 'home'" />
      <MainFolder v-if="mainContent == 'folder'" />
      <MainFile v-if="mainContent == 'file'" />
    </div>
  </div>
</template>
<script>
import { globalFunction } from "@/global/global.js";
import { mapState } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import MainHome from "@/components/MainHome.vue";
import MainFolder from "@/components/MainFolder.vue";
import MainFile from "@/components/MainFile.vue";
import System from "@/services/System";

export default {
  components: {
    Sidebar,
    MainHome,
    MainFolder,
    MainFile,
  },

  computed: {
    ...mapState({
      activeMainFolder: (state) => state.sidebar.activeMainFolder,
      mainContent: (state) => state.sidebar.mainContent,
    }),
  },

  data() {
    return {};
  },

  methods: {
    deactiveAllState() {
      this.$store.commit("sidebar/updateDelBtnState", false);
    },
  },

  created() {},
};
</script>

<style lang="scss"></style>
