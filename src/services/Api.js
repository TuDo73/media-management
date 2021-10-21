import axios from "axios";

export default () => {
  let headers = JSON.parse(localStorage.getItem("login"));

  return axios.create({
    baseURL: `${global_api}`,
    headers,
  });
};
