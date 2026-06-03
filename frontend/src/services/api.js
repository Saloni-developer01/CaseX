
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'https://quleep-3d-portal.onrender.com/api'
// });

// export const getProducts = (search = '') => API.get(`?search=${search}`);
// export const getProductById = (id) => API.get(`/${id}`);
// export const createProduct = (productData) => API.post('/', productData);


import axios from 'axios';

const API = axios.create({
  // Base URL ko hum /api/products tak lekar jayenge
  baseURL: 'https://quleep-3d-portal.onrender.com/api/products'
});

// Ab endpoints direct base URL ke aage perfectly map ho jayenge
export const getProducts = (search = '') => API.get(`?search=${search}`);
export const getProductById = (id) => API.get(`/${id}`);
export const createProduct = (productData) => API.post('/', productData);