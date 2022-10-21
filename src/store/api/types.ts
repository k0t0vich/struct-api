import {AxiosPromise, AxiosRequestConfig} from "axios";

export type Endpoint = {
    method: (path?: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise;
    path?: string;
    base?: string;
    name?: string;
};
