import Cookies from "js-cookie";
import { axiosInstance } from "../instance.js";

export const users = () => axiosInstance.get("api/users");

export const user = (id) => {
  return axiosInstance.get(`api/users/${id}`, {
    headers: {
      Authorization: Cookies.get("token"),
    },
  });
};
