/* eslint-disable no-undef */
import {Endpoint} from "../store/api/types";

import BaseEndpoints from "../store/api/BaseEndpoints";
import MonitorEndpoints from "../store/api/MonitorEndpoints";
import prepareEndpoints from "../store/api/prepareEndpoints";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fse = require("fs-extra");

const baseUrl = "https://dev-backend";
const baseMonitorUrl = "https://dev-monitor";

console.log("saveMocks: ", baseUrl, baseMonitorUrl);

prepareEndpoints(BaseEndpoints, "", baseUrl);
prepareEndpoints(MonitorEndpoints, "", baseMonitorUrl);

async function request(endPoint: Endpoint) {
    if (!endPoint.base || !endPoint.path) return;
    const url = endPoint.base + endPoint.path;
    console.log("request: " + url);
    try {
        return await endPoint.method(url).then(
            response => {
                return response.data;
            },
            () => console.error("Loading error: url: " + url)
        );
    } catch (err) {
        console.error(`Unhandled load ${url} error:`, err);
    }
}

async function loadAndSave(endPoint: Endpoint) {
    const data = await request(endPoint);

    try {
        const str = JSON.stringify(data);
        const path = `./src/__mocks__/${endPoint.path}/data.json`;
        console.log("loaded: " + endPoint.path);

        fse.outputFile(`${path}`, str, (err: any) => {
            if (err) {
                return console.error(`Save file ${path} error:`, err);
            }
            console.log(`The file: ${path} was saved!`);
        });
    } catch (err) {
        console.error("Parse error: " + endPoint.path);
    }
}

function loadAndSaveALl(struct: any) {
    if (typeof struct != "object") return;

    for (const key in struct) {
        const item = struct[key];

        if (typeof item == "object" && item.name === "$get") {
            loadAndSave(item);
        } else {
            loadAndSaveALl(item);
        }
    }
}

loadAndSaveALl(BaseEndpoints);
loadAndSaveALl(MonitorEndpoints);
