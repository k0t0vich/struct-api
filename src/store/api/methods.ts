import axios, {AxiosRequestConfig} from "axios";

import {Endpoint} from "./types";

const GET = (path: string, params?: any, config?: AxiosRequestConfig) => {
    return axios.get(path, {params, ...config});
};

const POST = (path: string, data?: any, config?: AxiosRequestConfig) => {
    if (data) data = JSON.parse(JSON.stringify(data));
    return axios.post(path, data, config);
};

const PUT = (path: string, data?: any, config?: AxiosRequestConfig) => {
    if (data) data = JSON.parse(JSON.stringify(data));
    return axios.put(path, data, config);
};

const DELETE = (path: string, data?: any, config?: AxiosRequestConfig) => {
    if (data) data = JSON.parse(JSON.stringify(data));
    return axios.delete(path, {data, ...config});
};

export const $get: Endpoint = {method: GET};
export const $post: Endpoint = {method: POST};
export const $put: Endpoint = {method: PUT};
export const $delete: Endpoint = {method: DELETE};
