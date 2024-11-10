import axios from "axios";

const axiosinstance_cart = axios.create({
  baseURL: "https://localhost:7082/api",
});

axiosinstance_cart.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosinstance_cart;
