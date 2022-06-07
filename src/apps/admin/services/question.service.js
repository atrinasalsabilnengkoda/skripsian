import axios from "axios";
import authHeader from "../../../services/auth-header";
import authHeader2 from "../../../services/auth-header2";

const API_URL = "http://localhost:3001/api/question";

const createQuestion = (data) => {
    return axios.post(API_URL + "/", data, { headers: authHeader() });
}

// api createSoal no 2 disendirikan karena memakai FormData dan juga contentType nya yang berbeda
const createQuestion2 = (data) => {
    return axios.post(API_URL + '/createQuestion2', data, { headers: authHeader2() });
}

const getQuestionByIdAssigment = (id) => {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
}

const getQuestionByIdQuestion = (id) => {
    return axios.get(API_URL + `byid/${id}`, { headers: authHeader() });
}

const updateQuestion = (data) => {
    return axios.put(API_URL + '/', data, { headers: authHeader() });
}

const deleteQuestion = (data) => {
    return axios.delete(API_URL + '/', { headers: authHeader(), data });
}

const questionService = {
    createQuestion,
    createQuestion2,
    getQuestionByIdAssigment,
    getQuestionByIdQuestion,
    updateQuestion,
    deleteQuestion
};

export default questionService;
