import axios from "./customize-axios";
function fetchAllUse() {
  return axios.get("/api/users?page=1");
}

export { fetchAllUse };
