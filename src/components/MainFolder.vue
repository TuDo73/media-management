<template>
  <div class="main-content main-folder">
    <div class="top-row">
      <div class="change-name-box" v-if="!isSearch">
        <input
          type="text"
          class="change-name-input"
          v-model="folder.name"
          ref="fieldChangeName"
        />
        <!-- <div class="save-btn" @click="updateFolder()">Save</div> -->
      </div>
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
    <div class="drag-drop-area" v-if="!isSearch">
      Click or drag and drop your file(s) into the area
      <input
        type="file"
        multiple
        class="file-input"
        @change="uploadFile($event)"
      />
    </div>

    <div class="overview-block" v-if="!isSearch">
      <!-- <ul class="file-list">
        <li v-for="(file, index) in files" :key="index" class="file-list-item">
          <div
            class="file-list-item-wrap"
            v-if="file.type === 'File'"
            @click="openFileDetails(file)"
          >
            <span class="icon-file-empty"></span>
            <span class="file-text">{{ file.name }}</span>
            <div
              class="file-action"
              @click.stop="handleFileActionBtn($event)"
            ></div>
            <div class="sub-sidebar img-sidebar" ref="fileSidebar">
              <div class="sub-sidebar-content">
                <div
                  class="button-box delete-btn"
                  @click.stop="deleteFile(file.id)"
                >
                  <span class="button-box-icon icon-cross"></span>
                  <span class="btn-text">Delete...</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="file-list-item-wrap"
            v-if="file.type === 'Image'"
            @click="openFileDetails(file)"
          >
            <span class="icon-image"></span>
            <span class="file-text">{{ file.name }}</span>
            <div
              class="file-action"
              @click.stop="handleFileActionBtn($event)"
            ></div>
            <div class="sub-sidebar img-sidebar" ref="fileSidebar">
              <div class="sub-sidebar-content">
                <div
                  class="button-box delete-btn"
                  @click.stop="deleteFile(file.id)"
                >
                  <span class="button-box-icon icon-cross"></span>
                  <span class="btn-text">Delete...</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul> -->
      <ul class="file-list file-preview">
        <li
          v-for="(file, index) in files"
          :key="index"
          class="file-list-item"
          :class="{
            'active-del-action': isActiveDelBtn && fileSelectedId == file.id,
          }"
          @click.stop="selectFile(file)"
        >
          <div class="file-list-item-wrap" v-if="file.type === 'File'">
            <span class="icon-file-empty"></span>
            <img src="@/assets/images/bg-transparent.png" alt="" />
            <span class="file-text" @click.stop="openFileDetails(file)">{{
              file.name
            }}</span>
          </div>
          <div class="file-list-item-wrap" v-if="file.type === 'Image'">
            <div
              class="preview-bg"
              :style="{ backgroundImage: `url(${globalUrl}${file.url})` }"
            ></div>
            <img src="@/assets/images/bg-transparent.png" alt="" />
            <div class="file-text" @click.stop="openFileDetails(file)">
              {{ file.name }}
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="action-row folder-action-row" v-if="!isSearch">
      <div class="col-btn del-btn" v-if="isActiveDelBtn" @click="deleteFile()">
        Delete File
      </div>
      <div class="col-btn save-btn" @click="updateFolder()">
        Save
      </div>
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
      files: (state) => state.sidebar.files,
      folder: (state) => state.sidebar.folder,
      isActiveDelBtn: (state) => state.sidebar.isActiveDelBtn,
      fileSelectedId: (state) => state.sidebar.fileSelectedId,
      globalUrl: (state) => state.sidebar.globalUrl,
      isSearch: (state) => state.sidebar.isSearch,
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
    return {
      // filesSelected: [],
      // fileSelectedId: null,
    };
  },

  methods: {
    doSearch() {
      this.$store.dispatch("sidebar/doSearch");
    },

    selectFile(file) {
      this.$store.dispatch("sidebar/selectFile", file);
      // this.$store.commit("sidebar/updateDelBtnState", true);
      // this.fileSelectedId = file.id;
    },

    handleFileActionBtn(e) {
      let _this = e.target;
      let parent = _this.closest(".file-list-item-wrap");
      let fileSidebar = parent.querySelector(".img-sidebar");

      if (_this.classList.contains("active")) {
        _this.classList.remove("active");
        fileSidebar.classList.remove("show");
      } else {
        let allFileActionBtn = document.querySelectorAll(".file-action");
        if (allFileActionBtn.length > 0) {
          allFileActionBtn.forEach((ele) => {
            ele.classList.remove("active");
          });
        }
        _this.classList.add("active");

        if (globalFunction.domExists(fileSidebar)) {
          let allFileSidebar = document.querySelectorAll(".img-sidebar");
          if (allFileSidebar.length > 0) {
            allFileSidebar.forEach(function(elem) {
              elem.classList.remove("show");
            });
          }
          fileSidebar.classList.add("show");
        }
      }

      // close another sub sidebar
      let folderSidebar = document.querySelectorAll(".folder-sidebar");
      if (folderSidebar.length > 0) {
        folderSidebar.forEach((ele) => {
          ele.classList.remove("show");
        });
      }
      let folderBtns = document.querySelectorAll(".action-btn.folder-action");
      if (folderBtns.length > 0) {
        folderBtns.forEach(function(ele) {
          ele.classList.remove("active");
        });
      }
    },

    openFileDetails(file) {
      this.$store.commit("sidebar/setFile", file);
      this.$store.commit("sidebar/updateMainContentState", "file");
    },

    deleteFile() {
      this.$store.dispatch("sidebar/deleteFile");
      // this.$store.commit("sidebar/updateDelBtnState", false);
      // System.deleteFile(this.fileSelectedId).then((response) => {
      //   System.getFile(this.folder.id).then((res) => {
      //     this.$store.commit("sidebar/setFileByFolder", res);
      //     // this.closeAllSubSidebar();
      //   });
      // });
    },

    updateFolder() {
      if (this.folder.name == "") return;
      let fieldChangeName = this.$refs.fieldChangeName;

      let data = {
        FolderName: fieldChangeName.value,
      };
      data = JSON.stringify(data);
      System.updateFolder(this.folder.id, data);
    },

    uploadFile(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      let form = new FormData();
      for (let i = 0; i < files.length; i++) {
        form.append("files", files[i]);
      }
      form.append("folderid", this.folder.id);

      let data = form;
      System.uploadFile(data).then((response) => {
        this.$store.commit("sidebar/setFileByFolder", response.data.Data);
        this.closeAllSubSidebar();
        e.target.value = "";
      });
    },

    closeAllSubSidebar() {
      // close all sub sidebar
      let mainAction = document.querySelector(".main-action");
      if (globalFunction.domExists(mainAction)) {
        mainAction.classList.remove("active");
      }

      let imgBtns = document.querySelectorAll(".file-action");
      let folderBtns = document.querySelectorAll(".action-btn.folder-action");
      if (imgBtns.length > 0) {
        imgBtns.forEach(function(ele) {
          ele.classList.remove("active");
        });
      }
      if (folderBtns.length > 0) {
        folderBtns.forEach(function(ele) {
          ele.classList.remove("active");
        });
      }
      let fileSidebar = document.querySelectorAll(".img-sidebar");
      if (fileSidebar.length > 0) {
        fileSidebar.forEach((ele) => {
          ele.classList.remove("show");
        });
      }
      let folderSidebar = document.querySelectorAll(".folder-sidebar");
      if (folderSidebar.length > 0) {
        folderSidebar.forEach((ele) => {
          ele.classList.remove("show");
        });
      }
    },
  },

  created() {
    this.$store.commit("sidebar/setFileUrl");
  },
};
</script>

<style lang="scss"></style>
