import axios from "axios";
import authHeader from "../../../services/auth-header";

const API_URL = "http://localhost:3001/api/store";

const createItem = (data) => {
    return axios.post(API_URL + "/", data, { headers: authHeader() });
}

const getAllItems = () => {
    return axios.get(API_URL + "/", { headers: authHeader() });
}

const getItemById = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
}

const updateItem = (data) => {
    return axios.put(API_URL + '/', data, { headers: authHeader() });
}

const deleteItem = (data) => {
    return axios.delete(API_URL + '/', { headers: authHeader(), data });
}

const storeService = {
    getAllItems,
    createItem,
    getItemById,
    updateItem,
    deleteItem
};

export default storeService;
