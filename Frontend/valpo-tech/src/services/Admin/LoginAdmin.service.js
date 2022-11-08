import http from "../http-common";

const getAll = () => {
  return http.get("/provider/all");
};

const get = id_prov => {
  return http.get(`/provider/${id_prov}`);
};

const create = data => {
  return http.post("/provider/add", data);
};

const update = (id, data) => {
  return http.put(`/provider/${id}`, data);
};

const remove = id_prov => {
  return http.delete(`/provider/${id_prov}`);
};

const removeAll = () => {
  return http.delete(`/provider`);
};


const ClientService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default ClientService;