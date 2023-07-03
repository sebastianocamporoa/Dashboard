import Cookies from "js-cookie";
import { axiosInstance } from "../instance.js";

export const hobbies = (userId) => {
  const token = Cookies.get("token").replace(/^"(.*)"$/, "$1");
  return axiosInstance.get(`api/users/${userId}/hobbies`, {
    headers: {
      Authorization: token,
    },
  });
};
