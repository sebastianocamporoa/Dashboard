import Cookies from "js-cookie";
import { axiosInstance } from "../instance.js";

export const users = () => axiosInstance.get("api/users");

export const user = (id) => {
  const token = Cookies.get("token").replace(/^"(.*)"$/, "$1");
  return axiosInstance.get(`api/users/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
