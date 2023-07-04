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

export const deleteHobbies = (id) => {
  const token = Cookies.get("token").replace(/^"(.*)"$/, "$1");
  const userId = Cookies.get("userId");
  return axiosInstance.delete(`api/users/${userId}/hobbies/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const updateHobbies = (id, body) => {
  const token = Cookies.get("token").replace(/^"(.*)"$/, "$1");
  const userId = Cookies.get("userId");
  return axiosInstance.put(`api/users/${userId}/hobbies/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
};
