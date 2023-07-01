import { axiosInstance } from '../instance.js';

export const oauth = (body) =>
axiosInstance.post("oauth", body);

export const login = (body) =>
axiosInstance.post("api/login", body);