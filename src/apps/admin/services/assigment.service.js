import axios from "axios";
import authHeader from "../../../services/auth-header";

const API_URL = "http://localhost:3001/api/assigment";

const createAssigment = (data) => {
    return axios.post(API_URL + "/", data, { headers: authHeader() });
}

const getAllAssigments = () => {
    return axios.get(API_URL + "/", { headers: authHeader() });
}

const getAssigmentById = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
}

const updateAssigment = (data) => {
    return axios.put(API_URL + '/', data, { headers: authHeader() });
}

const deleteAssigment = (data) => {
    return axios.delete(API_URL + '/', { headers: authHeader(), data });
}

const assigmentService = {
    getAllAssigments,
    createAssigment,
    getAssigmentById,
    updateAssigment,
    deleteAssigment
};

export default assigmentService;
