import { axiosInstance } from "../instance.js";

export const oauth = (body) => axiosInstance.post("api/register", body);

export const login = (body) => axiosInstance.post("api/login", body);
