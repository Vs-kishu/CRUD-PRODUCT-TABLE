import axios from "axios";

const url = "https://fakestoreapi.com/products";

export const getallproducts = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};
