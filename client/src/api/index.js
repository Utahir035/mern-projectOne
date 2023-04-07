import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getMains = () => API.get(`/main`);

export const getProducts = () => API.get(`/product`);
export const deleteProducts = (id) => API.delete(`/product/${id}`);

export const signIn = (formData) => API.post("/login", formData);
export const signUp = (formData) => API.post("/register", formData);
export const getUsers = () => API.get(`/users`);

export const postOrder = (formData) => API.post("/Orders", formData);
export const getOrders = () => API.get(`/Orders`);
