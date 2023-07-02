import { axiosInstance } from "../instance.js";

export const users = () => axiosInstance.get("api/users");

export const user = (id) => axiosInstance.get(`api/users/${id}`);
