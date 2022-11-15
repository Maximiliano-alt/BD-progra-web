import http from "../http-common";

const getAll = () => {
  return http.get("product/all?typeAccount=A");
};

const get = id_prod => {
  return http.get(`product/${id_prod}`);
};

const create = data => {
  return http.post("product/add", data);
};

const update = (id_prod, data) => {
  return http.put(`product/${id_prod}`, data);
};

const remove = id_prod => {
  return http.delete(`product/${id_prod}`);
};

const removeAll = () => {
  return http.delete(`product`);
};


const ProductService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default ProductService;