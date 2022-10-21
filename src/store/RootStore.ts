import {action, makeObservable, observable} from "mobx";

import {AxiosRequestConfig} from "axios";

import {Endpoint} from "store/api/types";

import APIStore from "store/api/APIStore";
import TestStore from "store/TestStore";

export class RootStore {
    readonly api = new APIStore(this);
    readonly test = new TestStore(this);

    error = false;

    constructor() {
        makeObservable(this, {error: observable, changeIsError: action}, {autoBind: true});
    }

    changeIsError(error: boolean) {
        this.error = error;
    }

    handleError(error: any) {
        const item = {
            header: "Произошла ошибка",
            message: error?.response?.data?.message ?? "Not Response or data",
            error: true,
            actions: [
                {
                    label: "Хорошо",
                    onClick: () => {
                        this.changeIsError(false);
                        console.log("Error", error);
                    }
                }
            ]
        };
        //this.root.notification.add(item);
        this.changeIsError(true);
    }

    request(endpoint: Endpoint, subPath?: string, data?: any, config?: AxiosRequestConfig) {
        return this.api.request(endpoint, subPath, data, config);
    }
}

const store = new RootStore();
export default store;
