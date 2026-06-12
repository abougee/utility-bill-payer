import axios from "axios";

const API_BASE_URL = "http://localhost:3000";
const API_CONTROLLER_URI = "/MyNestJsApp";
const API_TARGET_URI = API_BASE_URL + API_CONTROLLER_URI;

const apiClient = axios.create({
  baseURL: API_TARGET_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  login: (username, password) =>
    apiClient.post("/login", { username, password }),
  getBills: () => apiClient.get("/bills"),
  getAllBills: () => apiClient.get("/bills/all"),
  payBill: (billId) => apiClient.post(`/bills/pay/${billId}`),
  getPaymentHistory: () => apiClient.get("/payment-history"),
};
