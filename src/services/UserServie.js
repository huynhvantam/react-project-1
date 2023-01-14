import axios from "axios";

function fetchAllUse() {
  return axios.get("https://reqres.in/api/users?page=1");
}

export { fetchAllUse };
