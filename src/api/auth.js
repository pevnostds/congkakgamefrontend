import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;
const API_REGISTER_URL = import.meta.env.VITE_API_REGISTER_URL;

export const login = async (email, password) => {
  const res = await axios.post(`${API_LOGIN_URL}`, {
    email,
    password,
  });
  return res.data;
};

export const register = async (form) => {
  const res = await axios.post(`${API_REGISTER_URL}`, form);

  return res.data;
};

export const useAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
};
