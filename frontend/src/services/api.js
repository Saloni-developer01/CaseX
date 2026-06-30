import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/products'
});

export const getProducts = (search = '') => API.get(`?search=${search}`);
export const getProductById = (id) => API.get(`/${id}`);
export const createProduct = (productData) => API.post('/', productData);
// Naya Order API call function (Make sure URL http hi ho local ke liye)
export const createOrder = (orderData) => axios.post('http://localhost:5000/api/orders', orderData);
export const getAllOrders = () => axios.get('http://localhost:5000/api/orders');
export const updateOrderStatus = (id, statusData) => axios.put(`http://localhost:5000/api/orders/${id}`, statusData);


// Payout APIs
export const requestPayoutAPI = (payoutData, token) => 
  axios.post('http://localhost:5000/api/payouts/request', payoutData, { headers: { Authorization: `Bearer ${token}` } });

export const getMyPayoutsAPI = (token) => 
  axios.get('http://localhost:5000/api/payouts/my-requests', { headers: { Authorization: `Bearer ${token}` } });

export const getAdminPayoutsAPI = (token) => 
  axios.get('http://localhost:5000/api/payouts/admin/all', { headers: { Authorization: `Bearer ${token}` } });

export const updatePayoutStatusAPI = (id, statusData, token) => 
  axios.put(`http://localhost:5000/api/payouts/admin/update/${id}`, statusData, { headers: { Authorization: `Bearer ${token}` } });



// Product update karne ke liye
export const updateProductAPI = (id, productData, token) => 
  API.put(`/products/update/${id}`, productData, { headers: { Authorization: `Bearer ${token}` } });

// Product delete karne ke liye
export const deleteProductAPI = (id, token) => 
  API.delete(`/products/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });