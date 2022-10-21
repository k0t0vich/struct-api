import {$get, $post} from "./methods";

const MonitorEndpoints = {
    monitor: {
        $get,
        page: {$post},
        filterInfoMessage: {$get},
        messageStatuses: {$get},
        messageWithEvents: {$get},
        reProcessService: {$post}
    }
};

export default MonitorEndpoints;
