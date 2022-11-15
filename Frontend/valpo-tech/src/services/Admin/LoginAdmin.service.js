import http from "../http-common";

const getAll = () => {
  return http.get("user/all");
};

const get = rut => {
  return http.get(`user/${rut}`);
};

const create = data => {
  return http.post("user/add", data);
};

const update = (id, data) => {
  return http.put(`user/${id}`, data);
};

const remove = rut => {
  return http.delete(`user/${rut}`);
};

const removeAll = () => {
  return http.delete(`user`);
};


const LoginAdminService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default LoginAdminService;