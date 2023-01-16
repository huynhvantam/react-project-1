import axios from "./customize-axios";
function fetchAllUse(page) {
  return axios.get(`/api/users?page=${page}`);
}
function postCreateUser(name, job) {
  return axios.post("/api/users", { name, job });
}

const putUpdateUser = (name, job) => {
  return axios.put("/api/users/", { name, job });
};

export { fetchAllUse, postCreateUser, putUpdateUser };
