<template>
  <div class="main-content main-home">
    <div class="top-row">
      <div class="search-box">
        <span class="icon-search" @click="doSearch()"></span>
        <input
          class="search-input"
          type="text"
          placeholder="Type to search..."
          :class="[searchValue !== '' ? 'has-value' : '']"
          v-model="searchValue"
          @keyup.enter="doSearch"
        />
      </div>
    </div>

    <div class="overview-block" v-if="!isSearch">
      <ul class="file-list">
        <li
          v-for="(item, index) in allFolder"
          :key="index"
          class="file-list-item"
          @click="selectFolder(item)"
        >
          <div class="file-list-item-wrap">
            <span class="icon-folder"></span>
            <span class="file-text">{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </div>

    <OverviewSearch v-if="isSearch" />
  </div>
</template>
<script>
import { globalFunction } from "@/global/global.js";
import { mapState } from "vuex";
import System from "@/services/System";
import OverviewSearch from "@/components/OverviewSearch.vue";

export default {
  components: {
    OverviewSearch,
  },

  computed: {
    ...mapState({
      allFolder: (state) => state.sidebar.allFolder,
      isSearch: (state) => state.sidebar.isSearch,
      // searchValue: (state) => state.sidebar.searchValue,
    }),
    searchValue: {
      get() {
        return this.$store.state.sidebar.searchValue;
      },
      set(value) {
        this.$store.commit("sidebar/updateSearchValue", value);
      },
    },
  },

  data() {
    return {};
  },

  methods: {
    doSearch() {
      this.$store.dispatch("sidebar/doSearch");
    },

    selectFolder(folderData) {
      this.$store.dispatch("sidebar/selectFolderInOverview", { folderData });
    },
  },

  created() {},
};
</script>

<style lang="scss"></style>
