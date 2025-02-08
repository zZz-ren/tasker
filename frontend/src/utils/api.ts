import axios from "axios";

export const baseUrl: string =
  import.meta.env.MODE == "development"
    ? "http://localhost:5001/api"
    : "http://localhost:5001/api";

const api = axios;

api.defaults.withCredentials = true;
api.defaults.baseURL = baseUrl;

export default api;
