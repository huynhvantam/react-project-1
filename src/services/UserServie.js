import axios from "./customize-axios";
function fetchAllUse(page) {
  return axios.get(`/api/users?page=${page}`);
}

export { fetchAllUse };
