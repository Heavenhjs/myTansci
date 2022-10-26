import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const service = axios.create();

//Request interceptors
service.interceptors.request.use(
    (config:AxiosRequestConfig) => {
        //do something
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
);
service.interceptors.response.use(
    async (response: AxiosResponse) =>{
        //do something
        return response;
    },
    (error: any) => {
        // do something
        return Promise.reject(error);
    }
);
export default service;