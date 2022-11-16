import http from "../http-common";

const getAll = () => {
  return http.get("client/all");
};

const get = id_client => {
  return http.get(`client/${id_client}`);
};
const getBuys = rut => {
    return http.get(`client/all-buys?rut=${rut}`);
  };
const create = data => {
  return http.post("client/add", data);
};

const update = (id_client, data) => {
  return http.put(`client/${id_client}`, data);
};

const remove = id_prod => {
  return http.delete(`client/${id_prod}`);
};

const removeAll = () => {
  return http.delete(`client`);
};


const ProductServiceClient = {
  getAll,
  get,
  getBuys,
  create,
  update,
  remove,
  removeAll
};

export default ProductServiceClient;