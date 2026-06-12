import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
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
    apiClient.post("/auth/login", { username, password }),
  getBills: () => apiClient.get("/bills"),
  getAllBills: () => apiClient.get("/bills/all"),
  payBill: (billId) => apiClient.post(`/bills/pay/${billId}`),
  getPaymentHistory: () => apiClient.get("/payment-history"),
};
