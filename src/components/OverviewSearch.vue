<template>
  <div class="wrapper">
    <div class="overview-block overview-search">
      <ul class="file-list">
        <li
          v-for="(folder, index) in searchItemTypeFolder"
          :key="index"
          class="file-list-item"
          @click="selectFolder(folder)"
        >
          <div class="file-list-item-wrap">
            <span class="icon-folder"></span>
            <span class="file-text">{{ folder.name }}</span>
          </div>
        </li>
      </ul>
      <ul class="file-list file-preview">
        <li
          v-for="(image, index) in searchItemTypeImage"
          :key="index"
          class="file-list-item"
          :class="{
            'active-del-action': isActiveDelBtn && fileSelectedId == image.id,
          }"
          @click.stop="selectFile(image)"
        >
          <div class="file-list-item-wrap">
            <div
              class="preview-bg"
              :style="{ backgroundImage: `url(${globalUrl}${image.url})` }"
            ></div>
            <img src="@/assets/images/bg-transparent.png" alt="" />
            <div class="file-text" @click.stop="openFileDetails(image)">
              {{ image.name }}
            </div>
          </div>
        </li>
      </ul>
      <ul class="file-list file-preview">
        <li
          v-for="(file, index) in searchItemTypeFile"
          :key="index"
          class="file-list-item"
          :class="{
            'active-del-action': isActiveDelBtn && fileSelectedId == file.id,
          }"
          @click.stop="selectFile(file)"
        >
          <div class="file-list-item-wrap">
            <span class="icon-file-empty"></span>
            <img src="@/assets/images/bg-transparent.png" alt="" />
            <span class="file-text" @click.stop="openFileDetails(file)">
              {{ file.name }}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <div class="action-row folder-action-row">
      <div class="col-btn del-btn" v-if="isActiveDelBtn" @click="deleteFile()">
        Delete File
      </div>
    </div>
  </div>
</template>
<script>
import { globalFunction } from "@/global/global.js";
import { mapState } from "vuex";
import System from "@/services/System";

export default {
  components: {},

  computed: {
    ...mapState({
      isActiveDelBtn: (state) => state.sidebar.isActiveDelBtn,
      fileSelectedId: (state) => state.sidebar.fileSelectedId,
      searchItemTypeFolder: (state) => state.sidebar.searchItemTypeFolder,
      searchItemTypeImage: (state) => state.sidebar.searchItemTypeImage,
      searchItemTypeFile: (state) => state.sidebar.searchItemTypeFile,
      globalUrl: (state) => state.sidebar.globalUrl,
    }),
  },

  data() {
    return {};
  },

  methods: {
    selectFile(file) {
      this.$store.dispatch("sidebar/selectFile", file);
    },

    openFileDetails(file) {
      this.$store.commit("sidebar/setFile", file);
      this.$store.commit("sidebar/updateMainContentState", "file");
    },

    deleteFile() {
      this.$store.dispatch("sidebar/deleteFileInOverviewSearch");
    },

    selectFolder(folderData) {
      this.$store.dispatch("sidebar/selectFolderInOverview", { folderData });
    },
  },

  created() {
    this.$store.commit("sidebar/setFileUrl");
  },
};
</script>

<style lang="scss"></style>
