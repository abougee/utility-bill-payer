import axios from "axios";
import {pathnames} from "../App";


const API_BASE_URL = "http://localhost:3000";
const API_CONTROLLER_URI = "/MyNestJsApp";
const API_TARGET_URI = API_BASE_URL + API_CONTROLLER_URI;

const apiClient = axios.create({
  baseURL: API_TARGET_URI,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
    apiClient.post(pathnames.login, { username, password }),
  getBills: () => apiClient.get(pathnames.bills),
  getAllBills: () => apiClient.get(pathnames.bills + "/all"),
  payBill: (billId) => apiClient.post(pathnames.bills + `/pay/${billId}`),
  getPaymentHistory: () => apiClient.get(pathnames.history),
};
