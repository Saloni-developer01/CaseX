// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/products",
// });

// export const getProducts = (search = "") =>
//   API.get(`/products?search=${search}`);
// export const getProductById = (id) => API.get(`/products/${id}`);
// export const createProduct = (productData) =>
//   API.post("/products", productData);



import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/products'
});

export const getProducts = (search = '') => API.get(`?search=${search}`);
export const getProductById = (id) => API.get(`/${id}`);
export const createProduct = (productData) => API.post('/', productData);