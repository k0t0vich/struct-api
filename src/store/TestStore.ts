import {makeAutoObservable, observable} from "mobx";

import {RootStore} from "store/RootStore";

export default class TestStore {
    private api = this.root.api.baseEndpoints;

    products: any = {};

    constructor(readonly root: RootStore) {
        makeAutoObservable(this, {root: false}, {autoBind: true});
    }

    get error() {
        return this.root.error;
    }

    getProducts() {
        this.root.request(this.api.products.$get).then(data => this.setProducts(data));
    }

    setProducts(data: any) {
        this.products = data;
    }
}
