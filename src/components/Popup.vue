<template>
  <div class="popup-common" :class="{ active: isActivePopup }">
    <div class="popup-overlay"></div>
    <div class="popup-content">
      <div
        class="popup-type type-create-folder"
        v-if="isActiveCreateFolderPopup"
      >
        <div class="popup-heading">
          <h2>Folder exits the system!</h2>
        </div>
        <div class="popup-main">
          <div class="btn-confirm-wrap">
            <div class="btn-confirm no-confirm" @click="closePopup()">
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { globalFunction } from "@/global/global.js";

export default {
  computed: {
    ...mapState({
      isActivePopup: (state) => state.sidebar.isActivePopup,
      isActiveCreateFolderPopup: (state) =>
        state.sidebar.isActiveCreateFolderPopup,
    }),
  },

  data() {
    return {};
  },

  components: {},

  methods: {
    closePopup() {
      this.$store.dispatch("sidebar/closePopup");
    },
  },
};
</script>

<style></style>
