import {AxiosRequestConfig} from "axios";

import {Endpoint} from "store/api/types";

import {RootStore} from "store/RootStore";
import BaseEndpoints from "store/api/BaseEndpoints";
import MonitorEndpoints from "store/api/MonitorEndpoints";
import prepareEndpoints from "store/api/prepareEndpoints";
import {redirectWithConfig} from "store/api/redirect";

const baseApiVersion = "/v1";
const monitorApiVersion = "";

/* eslint-disable no-undef */
let baseUrl =
    process.env.NODE_ENV === "production"
        ? "backend" + baseApiVersion
        : process.env.REACT_APP_ENV_BACKEND_URL + baseApiVersion || "http://localhost:7777";
let baseMonitorUrl =
    process.env.NODE_ENV === "production"
        ? "monitor" + monitorApiVersion
        : process.env.REACT_APP_ENV_MONITOR_URL + monitorApiVersion || "http://localhost:7778";

const isMock = !!process.env.REACT_APP_ENV_IS_MOCK;

if (isMock) {
    baseMonitorUrl = baseUrl = "__mocks__";
}

const redirectUrl =
    process.env.NODE_ENV === "production"
        ? "old_ui"
        : process.env.REACT_APP_REDIRECT_TO_OLD_URL || "http://localhost:8888";

console.log("ENV", process.env);

export default class APIStore {
    readonly baseEndpoints = BaseEndpoints;
    readonly monitorEndpoints = MonitorEndpoints;

    constructor(private root: RootStore) {
        prepareEndpoints(this.baseEndpoints, baseUrl);
        prepareEndpoints(this.monitorEndpoints, baseMonitorUrl);
        Object.freeze(this.baseEndpoints);
        Object.freeze(this.monitorEndpoints);
    }

    async request(endpoint: Endpoint, subPath?: string, data?: any, config?: AxiosRequestConfig) {
        const result = await endpoint
            .method(this.createPath(endpoint, subPath), data, config)
            .then(
                response => {
                    this.root.changeIsError(false);
                    return response.data;
                },
                error => this.root.handleError(error)
            )
        return result;
    }

    private createPath(endpoint: Endpoint, subPath?: string): string {
        subPath = subPath ? "/" + String(subPath) : "";
        if (isMock) subPath += "/data.json";

        return `${endpoint.base}${endpoint.path}${subPath}`;
    }
}
