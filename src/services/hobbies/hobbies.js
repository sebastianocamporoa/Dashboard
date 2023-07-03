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

export const createHobby = (userId, body) => {
  const token = Cookies.get("token").replace(/^"(.*)"$/, "$1");
  axiosInstance.post(`api/users/${userId}/hobbies`, body, {
    headers: {
      Authorization: token,
    },
  });
};
