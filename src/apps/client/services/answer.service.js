import axios from "axios";
import authHeader from "../../../services/auth-header";

const API_URL = "http://localhost:3001/api/answer";

const createAnswer = (data) => {
    return axios.post(API_URL + "/", data, { headers: authHeader() });
}

const getAnswer = () => {
    return axios.get(API_URL + '/', { headers: authHeader() });
}

const getAnswerById = (data) => {
    return axios.get(API_URL + '/byid', { headers: authHeader(), params: data });
}

const answerService = {
    createAnswer,
    getAnswer,
    getAnswerById
};

export default answerService;
