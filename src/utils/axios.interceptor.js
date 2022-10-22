import axios from 'axios';
const API_URL = `http://localhost:4000`;


export const customAxios = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor
customAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    /* add jwt token if needed */

    let headers = {};

    config.headers = {
        ...config.headers,
        ...headers
    }

    return config;

    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

/* response interceptor */
customAxios.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export default customAxios;