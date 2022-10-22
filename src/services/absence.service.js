import {customAxios} from "../utils/axios.interceptor";
const axios = customAxios;

const getAllAbsences = async () => {
    const response = await axios.get(`/absences`)
    return response;
}

const getAllMembers = async () => {
    const response = await axios.get(`/members`)
    return response;
}

const features = {
    getAllAbsences,
    getAllMembers
};

export default features;