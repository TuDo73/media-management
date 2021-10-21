import Api from "@/services/Api";
import store from "@/store";

export default {
  async getAll() {
    const url = `${global_api}/api/media`;

    try {
      const response = await Api().get(`${url}`);
      let allFolder = response.data.Data;
      store.commit("sidebar/setAllFolder", allFolder);
      // console.log(response);
      return response;
    } catch (error) {
      // console.log("error:", error.response);
      return error.response;
    }
  },

  async getFile(folderId) {
    const url = `${global_api}/api/media/${folderId}`;
    const response = await Api().get(`${url}`);
    let files = response.data.Data;
    // console.log(files);
    return files;
  },

  async createFolder(folder) {
    const url = `${global_api}/api/folders`;
    const createFolderResp = await Api().post(`${url}`, folder);

    // console.log(createFolderResp);
    return createFolderResp;
  },

  async deleteFolder(folderId) {
    const url = `${global_api}/api/folders/${folderId}`;
    const response = await Api().delete(`${url}`);

    return response;
  },

  async uploadFile(file) {
    const url = `${global_api}/api/uploads`;
    const uploadFileRes = await Api().post(`${url}`, file);

    // console.log(uploadFileRes);
    return uploadFileRes;
  },

  async deleteFile(fileId) {
    const url = `${global_api}/api/files/${fileId}`;
    const response = await Api().delete(`${url}`);

    return response;
  },

  async updateFolder(folderId, data) {
    const url = `${global_api}/api/folders/${folderId}`;
    const response = await Api().put(`${url}`, data);

    return response;
  },

  async updateFile(fileId, data) {
    const url = `${global_api}/api/files/${fileId}`;
    const response = await Api().put(`${url}`, data);

    return response;
  },

  async searchAll(value) {
    const url = `${global_api}/api/media/search?keyword=${value}`;
    const response = await Api().get(`${url}`);
    let searchItem = response.data.Data;
    store.dispatch("sidebar/setSearchItem", searchItem);
    // console.log(value);
    return response;
  },
};
