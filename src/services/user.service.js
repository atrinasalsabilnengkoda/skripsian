import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/api/users";

const createUser = (data) => {
  return axios.post(API_URL + "/", data, {headers: authHeader() });
}

const getAllUsers = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
}

const getUserById = (id) => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
}

const updateUser = (data) => {
  return axios.put(API_URL + '/', data, { headers: authHeader()});
}

const deleteUser = (data) => {
  return axios.delete(API_URL + '/',{ headers: authHeader(), data});
} 

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
