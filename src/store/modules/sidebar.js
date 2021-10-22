import { globalFunction } from "@/global/global.js";
import System from "@/services/System";

const state = {
  // data
  allFolder: [],
  folder: {},
  files: [],
  file: {},
  isActiveMainAction: false,
  isActivePopup: false,
  isActiveCreateFolderPopup: false,
  isActiveDelBtn: false,
  mainContent: "home",
  isSearch: false,
  searchItem: [],
  searchItemTypeFolder: [],
  searchItemTypeImage: [],
  searchItemTypeFile: [],
  fileSelectedId: null,
  globalUrl: "",
  searchValue: "",
};

const getters = {
  // computed
};

const actions = {
  // methods
  closePopup({ commit, state, dispatch }) {
    dispatch("updatePopupState", false);
    dispatch("updatePopupCreateFolder", false);
  },

  updatePopupState({ commit, state, dispatch }, value) {
    state.isActivePopup = value;
  },

  updatePopupCreateFolder({ commit, state, dispatch }, value) {
    state.isActiveCreateFolderPopup = value;
  },

  selectFile({ commit, state, dispatch }, value) {
    state.isActiveCreateFolderPopup = value;
  },

  setSearchItem({ commit, state, dispatch }, data) {
    commit("resetSearchItem");
    state.searchItem = data;
    for (let item of state.searchItem) {
      if (item.type == "Folder") {
        state.searchItemTypeFolder.push(item);
      }
      if (item.type == "Image") {
        state.searchItemTypeImage.push(item);
      }
      if (item.type == "File") {
        state.searchItemTypeFile.push(item);
      }
    }
  },

  doSearch({ commit, state, dispatch }) {
    if (!state.searchValue == "") {
      dispatch("checkFolderActiveState");
      commit("updateSearchState", true);
      System.searchAll(state.searchValue);
    }
  },

  checkFolderActiveState({ commit, state, dispatch }) {
    let folders = document.querySelectorAll(".folder-title");

    if (folders.length > 0) {
      folders.forEach((folder) => {
        folder.classList.remove("show-action");
      });
    }
  },

  selectFile({ commit, state, dispatch }, file) {
    commit("updateDelBtnState", true);
    state.fileSelectedId = file.id;
  },

  deleteFile({ commit, state, dispatch }) {
    commit("updateDelBtnState", false);
    System.deleteFile(state.fileSelectedId).then((response) => {
      System.getFile(state.folder.id).then((res) => {
        commit("setFileByFolder", res);
      });
    });
  },

  deleteFileInOverviewSearch({ commit, state, dispatch }) {
    commit("updateDelBtnState", false);
    System.deleteFile(state.fileSelectedId).then((response) => {
      System.searchAll(state.searchValue);
    });
  },

  selectFolder({ commit, state, dispatch }, { e, id, folderData }) {
    let dropdowns = e.target.closest(".list-item");

    let folder = dropdowns.querySelector(".folder-title");
    if (globalFunction.domExists(folder)) {
      let allFolder = document.querySelectorAll(".folder-title");
      if (allFolder.length > 0) {
        allFolder.forEach(function(elem) {
          elem.classList.remove("show-action");
        });
      }
      folder.classList.add("show-action");

      dispatch("closeAllSubSidebar");
      commit("updateMainContentState", "folder");
      commit("setFolder", folderData);
      commit("updateSearchValue", ""); // close search block
      commit("updateSearchState", false); // ^^^^^^^^^^^^^^

      System.getFile(id).then((response) => {
        commit("setFileByFolder", response);
      });
    }
  },

  selectFolderInOverview({ commit, state, dispatch }, { folderData }) {
    let folders = document.querySelectorAll(".folder-title");

    if (folders.length > 0) {
      folders.forEach((ele) => {
        if (ele.id === folderData.id) {
          ele.classList.add("show-action");
        }
      });
    }

    dispatch("closeAllSubSidebar");
    commit("updateMainContentState", "folder");
    commit("setFolder", folderData);
    commit("updateSearchValue", ""); // close search block
    commit("updateSearchState", false); // ^^^^^^^^^^^^^^

    System.getFile(folderData.id).then((response) => {
      commit("setFileByFolder", response);
    });
  },

  closeAllSubSidebar({ commit, state, dispatch }) {
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
};

const mutations = {
  // handle response from actions to update state
  setAllFolder(state, allData) {
    state.allFolder = allData;
  },

  setFolder(state, data) {
    state.folder = data;
  },

  setFileByFolder(state, data) {
    state.files = data;
  },

  setFile(state, data) {
    state.file = data;
  },

  setFileUrl(state) {
    state.globalUrl = global_api;
  },

  resetSearchItem(state) {
    state.searchItem = [];
    state.searchItemTypeFolder = [];
    state.searchItemTypeImage = [];
    state.searchItemTypeFile = [];
  },

  updateMainActionState(state) {
    state.isActiveMainAction = !state.isActiveMainAction;
  },

  updateMainContentState(state, value) {
    state.mainContent = value;
  },

  updateDelBtnState(state, value) {
    state.isActiveDelBtn = value;
  },

  updateSearchState(state, value) {
    state.isSearch = value;
  },

  updateSearchValue(state, value) {
    state.searchValue = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
