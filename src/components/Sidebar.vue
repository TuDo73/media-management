<template>
  <div class="sidebar">
    <div class="main-sidebar">
      <div class="sidebar-heading" @click="goToHome()">
        <div class="sub-sidebar folder-sidebar main-folder-sidebar">
          <h3 class="sub-sidebar-heading">Create</h3>
          <div class="sub-sidebar-content">
            <div class="button-box" @click.stop="handleclickCreateMainFolder()">
              <span class="button-box-icon icon-folder"></span>
              <span class="btn-text">Folder</span>
            </div>
          </div>
        </div>
        <h4>Media</h4>
        <div
          class="main-action"
          :class="{ active: isActiveMainAction }"
          @click.stop="handleMainActionButton($event)"
        ></div>
      </div>
      <ul class="sidebar-list">
        <div class="list-item new-folder" v-if="enableNewFolder">
          <div class="item-title folder-title">
            <div class="dropdown-btn"></div>
            <div class="folder-item">
              <span class="icon-folder"></span>
              <input
                type="text"
                v-focus
                v-model="newFolderName"
                @keyup.enter="createMainFolder"
                @blur="blurCreateFolder"
              />
            </div>
          </div>
        </div>
        <li v-for="menu in allFolder" :key="menu.id" class="list-item">
          <div class="sub-sidebar folder-sidebar">
            <h3 class="sub-sidebar-heading">Create</h3>
            <div class="sub-sidebar-content">
              <div class="button-box">
                <span class="button-box-icon icon-file-empty"></span>
                <span class="btn-text">Upload</span>
                <input
                  type="file"
                  @change="uploadFile($event, menu.id)"
                  multiple
                  class="file-input"
                />
              </div>
              <div
                class="button-box"
                @click="handleClickCreateSubFolder($event, menu.id)"
              >
                <span class="button-box-icon icon-folder"></span>
                <span class="btn-text">Folder</span>
              </div>
              <div class="button-box" @click="deleteFolder(menu.id)">
                <span class="button-box-icon icon-cross"></span>
                <span class="btn-text">Delete</span>
              </div>
            </div>
          </div>
          <div
            class="item-title folder-title"
            v-if="menu.type === 'Folder'"
            :id="menu.id"
          >
            <div
              class="dropdown-btn"
              @click="handleDropdownSidebar($event)"
            ></div>
            <div
              class="folder-item"
              @click="handleClickFolder($event, menu.id, menu)"
            >
              <span class="icon-folder"></span>
              <span class="text-title">{{ menu.name }}</span>
              <div class="overlay"></div>
            </div>
            <div
              class="action-btn folder-action"
              @click.stop="handleFolderActionButton($event)"
            ></div>
          </div>
          <ul
            class="child-list"
            v-if="menu.subfolder.length > 0 || enableNewSubFolder.enable"
          >
            <li
              v-for="subMenu in menu.subfolder"
              :key="subMenu.id"
              class="list-item child-item"
            >
              <div class="sub-sidebar folder-sidebar">
                <h3 class="sub-sidebar-heading">Create</h3>
                <div class="sub-sidebar-content">
                  <div class="button-box">
                    <span class="button-box-icon icon-file-empty"></span>
                    <span class="btn-text">Upload</span>
                    <input
                      type="file"
                      @change="uploadFile($event, subMenu.id)"
                      multiple
                      class="file-input"
                    />
                  </div>
                  <div
                    class="button-box"
                    @click="handleClickCreateSubFolder($event, subMenu.id)"
                  >
                    <span class="button-box-icon icon-folder"></span>
                    <span class="btn-text">Folder</span>
                  </div>
                  <div class="button-box" @click="deleteFolder(subMenu.id)">
                    <span class="button-box-icon icon-cross"></span>
                    <span class="btn-text">Delete</span>
                  </div>
                </div>
              </div>
              <div
                class="item-title folder-title"
                v-if="subMenu.type === 'Folder'"
              >
                <div
                  class="dropdown-btn"
                  @click="handleDropdownSidebar($event)"
                ></div>
                <div
                  class="folder-item"
                  @click="handleClickFolder($event, subMenu.id, subMenu)"
                >
                  <span class="icon-folder"></span>
                  <span class="text-title">{{ subMenu.name }}</span>
                  <div class="overlay"></div>
                </div>
                <div
                  class="action-btn folder-action"
                  @click.stop="handleFolderActionButton($event)"
                ></div>
              </div>
              <ul
                class="child-list"
                v-if="subMenu.subfolder.length > 0 || enableNewSubFolder.enable"
              >
                <li
                  v-for="subMenuLv1 in subMenu.subfolder"
                  :key="subMenuLv1.id"
                  class="list-item child-item"
                >
                  <div class="sub-sidebar folder-sidebar">
                    <h3 class="sub-sidebar-heading">Create</h3>
                    <div class="sub-sidebar-content">
                      <div class="button-box">
                        <span class="button-box-icon icon-file-empty"></span>
                        <span class="btn-text">Upload</span>
                        <input
                          type="file"
                          @change="uploadFile($event, subMenuLv1.id)"
                          multiple
                          class="file-input"
                        />
                      </div>
                      <div
                        class="button-box"
                        @click="deleteFolder(subMenuLv1.id)"
                      >
                        <span class="button-box-icon icon-cross"></span>
                        <span class="btn-text">Delete</span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="item-title folder-title"
                    v-if="subMenuLv1.type === 'Folder'"
                  >
                    <div
                      class="dropdown-btn"
                      @click="handleDropdownSidebar($event)"
                    ></div>
                    <div
                      class="folder-item"
                      @click="
                        handleClickFolder($event, subMenuLv1.id, subMenuLv1)
                      "
                    >
                      <span class="icon-folder"></span>
                      <span class="text-title">{{ subMenuLv1.name }}</span>
                      <div class="overlay"></div>
                    </div>
                    <div
                      class="action-btn folder-action"
                      @click.stop="handleFolderActionButton($event)"
                    ></div>
                  </div>
                  <ul class="child-list" v-if="subMenuLv1.subfolder.length > 0">
                    <li
                      v-for="subMenuLv2 in subMenuLv1.subfolder"
                      :key="subMenuLv2.id"
                      class="list-item child-item"
                    ></li>
                  </ul>
                </li>
                <div
                  class="list-item child-item new-folder"
                  v-if="
                    enableNewSubFolder.enable &&
                      enableNewSubFolder.parentId == subMenu.id
                  "
                >
                  <div class="item-title folder-title">
                    <div class="dropdown-btn"></div>
                    <div class="folder-item">
                      <span class="icon-folder"></span>
                      <input
                        type="text"
                        v-focus
                        v-model="newSubFolderName"
                        @keyup.enter="createSubFolder"
                        @blur="blurCreateFolder"
                      />
                    </div>
                  </div>
                </div>
              </ul>
            </li>
            <div
              class="list-item child-item new-folder"
              v-if="
                enableNewSubFolder.enable &&
                  enableNewSubFolder.parentId == menu.id
              "
            >
              <div class="item-title folder-title">
                <div class="dropdown-btn"></div>
                <div class="folder-item">
                  <span class="icon-folder"></span>
                  <input
                    type="text"
                    v-focus
                    v-model="newSubFolderName"
                    @keyup.enter="createSubFolder"
                    @blur="blurCreateFolder"
                  />
                </div>
              </div>
            </div>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { globalFunction } from "@/global/global.js";
import System from "@/services/System";

export default {
  components: {},

  computed: {
    ...mapState({
      isActiveMainAction: (state) => state.sidebar.isActiveMainAction,
      isActivePopup: (state) => state.sidebar.isActivePopup,
      isActiveCreateFolderPopup: (state) =>
        state.sidebar.isActiveCreateFolderPopup,
      allFolder: (state) => state.sidebar.allFolder,
      mainContent: (state) => state.sidebar.mainContent,
    }),
  },

  data() {
    return {
      newFolderName: "",
      newSubFolderName: "",
      idSubFolder: 0,
      enableNewFolder: false,
      enableNewSubFolder: {
        enable: false,
        parentId: 0,
      },
      uploadResult: "",
      folderId: 0,
    };
  },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
  },

  methods: {
    getAllData() {
      System.getAll().then(() => {
        this.checkChildListOpenState();
      });
    },

    handleMainActionButton(e) {
      let folderBtns = document.querySelectorAll(".action-btn.folder-action");
      let _this = e.target;
      let parent = _this.closest(".sidebar-heading");
      let folderSidebar = parent.querySelector(".folder-sidebar");

      if (_this.classList.contains("active")) {
        _this.classList.remove("active");
        folderSidebar.classList.remove("show");
      } else {
        if (folderBtns.length > 0) {
          folderBtns.forEach(function(elem) {
            elem.classList.remove("active");
          });
        }
        _this.classList.add("active");

        if (globalFunction.domExists(folderSidebar)) {
          let allFolderSidebar = document.querySelectorAll(".folder-sidebar");
          if (allFolderSidebar.length > 0) {
            allFolderSidebar.forEach(function(elem) {
              elem.classList.remove("show");
            });
          }
          folderSidebar.classList.add("show");
        }

        this.$store.commit("sidebar/updateDelBtnState", false);
      }

      // close another sub sidebar
      let fileSidebar = document.querySelectorAll(".img-sidebar");
      if (fileSidebar.length > 0) {
        fileSidebar.forEach((ele) => {
          ele.classList.remove("show");
        });
      }
      let imgBtns = document.querySelectorAll(".file-action");
      if (imgBtns.length > 0) {
        imgBtns.forEach(function(ele) {
          ele.classList.remove("active");
        });
      }
    },

    handleClickFolder(e, id, folderData) {
      this.$store.dispatch("sidebar/selectFolder", { e, id, folderData });
    },

    handleDropdownSidebar(e) {
      let dropdowns = e.target.closest(".list-item");

      let folder = dropdowns.querySelector(".folder-title");
      if (globalFunction.domExists(folder)) {
        folder.classList.toggle("show-child");

        let dropdownMenu = dropdowns.querySelector(".child-list");
        if (globalFunction.domExists(dropdownMenu)) {
          dropdownMenu.classList.toggle("show");
        }

        this.$store.dispatch("sidebar/closeAllSubSidebar");
      }
    },

    handleFolderActionButton(e) {
      let folderBtns = document.querySelectorAll(".action-btn.folder-action");
      let _this = e.target;
      let parent = _this.closest(".list-item");
      let folderSidebar = parent.querySelector(".folder-sidebar");

      if (_this.classList.contains("active")) {
        _this.classList.remove("active");
        folderSidebar.classList.remove("show");
      } else {
        if (folderBtns.length > 0) {
          folderBtns.forEach(function(elem) {
            elem.classList.remove("active");
          });
        }
        _this.classList.add("active");

        if (globalFunction.domExists(folderSidebar)) {
          let allFolderSidebar = document.querySelectorAll(".folder-sidebar");
          if (allFolderSidebar.length > 0) {
            allFolderSidebar.forEach(function(elem) {
              elem.classList.remove("show");
            });
          }
          folderSidebar.classList.add("show");
        }
      }
      let mainAction = document.querySelector(".main-action");
      if (globalFunction.domExists(mainAction)) {
        mainAction.classList.remove("active");
      }
      let fileSidebar = document.querySelectorAll(".img-sidebar");
      if (fileSidebar.length > 0) {
        fileSidebar.forEach((ele) => {
          ele.classList.remove("show");
        });
      }
      let imgBtns = document.querySelectorAll(".file-action");
      if (imgBtns.length > 0) {
        imgBtns.forEach(function(ele) {
          ele.classList.remove("active");
        });
      }

      this.$store.commit("sidebar/updateDelBtnState", false);
    },

    handleclickCreateMainFolder() {
      this.enableNewFolder = true;
      this.$store.dispatch("sidebar/closeAllSubSidebar");
    },

    createMainFolder(e) {
      this.newFolderName = e.target.value;

      if (this.newFolderName == "") {
        this.enableNewFolder = false;
        return;
      }

      let data = {
        FolderName: this.newFolderName,
        FolderParent: null,
      };
      data = JSON.stringify(data);
      System.createFolder(data).then((response) => {
        if (response.data.Success) {
          this.getAllData();
          this.enableNewFolder = false;
          this.newFolderName = "";
        } else {
          this.$store.dispatch("sidebar/updatePopupState", true);
          this.$store.dispatch("sidebar/updatePopupCreateFolder", true);
          this.enableNewFolder = false;
          this.newFolderName = "";
        }
      });
    },

    handleClickCreateSubFolder(e, id) {
      this.enableNewSubFolder.enable = true;
      this.enableNewSubFolder.parentId = id;
      this.idSubFolder = id;

      let _this = e.target;
      let parent = _this.closest(".list-item");
      parent.querySelector(".folder-title").classList.add("show-child");
      setTimeout(() => {
        parent.querySelector(".child-list").classList.add("show");
        parent.querySelector(".child-list .new-folder input").focus();
      }, 100);

      this.$store.dispatch("sidebar/closeAllSubSidebar");
    },

    createSubFolder(e) {
      this.newSubFolderName = e.target.value;

      if (this.newSubFolderName == "") {
        this.enableNewSubFolder.enable = false;
        return;
      }

      let data = {
        FolderName: this.newSubFolderName,
        FolderParent: this.idSubFolder,
      };
      data = JSON.stringify(data);
      System.createFolder(data).then((response) => {
        if (response.data.Success) {
          this.getAllData();
          this.enableNewSubFolder.enable = false;
          this.newSubFolderName = "";
          this.idSubFolder = 0;
        } else {
          this.$store.dispatch("sidebar/updatePopupState", true);
          this.$store.dispatch("sidebar/updatePopupCreateFolder", true);
          this.enableNewSubFolder.enable = false;
          this.newSubFolderName = "";
          this.idSubFolder = 0;
        }
      });
    },

    blurCreateFolder() {
      if (this.newFolderName == "") {
        this.enableNewFolder = false;
      }
      if (this.newSubFolderName == "") {
        this.enableNewSubFolder.enable = false;
      }
    },

    deleteFolder(id) {
      System.deleteFolder(id)
        .then(() => {
          this.getAllData();
          this.$store.dispatch("sidebar/closeAllSubSidebar");
          this.$store.commit("sidebar/updateMainContentState", "home");
        })
        .then(() => {
          this.$store.dispatch("sidebar/checkFolderActiveState");
        });
    },

    checkChildListOpenState() {
      // open child list when create sub folder
      let folders = document.querySelectorAll(".folder-title");

      if (folders.length > 0) {
        folders.forEach((folder) => {
          if (folder.classList.contains("show-child")) {
            let childList = folder
              .closest(".list-item")
              .querySelector(".child-list");

            if (globalFunction.domExists(childList)) {
              childList.classList.add("show");
            }
          }
        });
      }
    },

    uploadFile(e, id) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      let form = new FormData();
      for (let i = 0; i < files.length; i++) {
        form.append("files", files[i]);
      }
      form.append("folderid", id);

      let data = form;
      System.uploadFile(data).then((response) => {
        this.$store.commit("sidebar/setFileByFolder", response.data.Data);
        this.$store.dispatch("sidebar/closeAllSubSidebar");

        e.target.value = "";
      });
    },

    goToHome() {
      this.$store.commit("sidebar/updateMainContentState", "home");
      this.$store.commit("sidebar/updateSearchState", false);
      this.$store.commit("sidebar/updateSearchValue", "");
      this.resetAllState();
    },

    resetAllState() {
      let folders = document.querySelectorAll(".folder-title");
      if (folders.length > 0) {
        folders.forEach((folder) => {
          folder.classList.remove("show-action");
          folder.classList.remove("show-child");
          let childList = folder
            .closest(".list-item")
            .querySelector(".child-list");
          if (globalFunction.domExists(childList)) {
            childList.classList.remove("show");
          }
        });
      }
      this.$store.dispatch("sidebar/closeAllSubSidebar");
    },
  },

  created() {
    this.getAllData();
  },

  mounted() {},
};
</script>

<style lang="scss"></style>
