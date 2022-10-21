import {$delete, $get, $post, $put} from "./methods";

// структура генерится из swagger
const BaseEndpoints = {
    accountingService: {
        serviceDto: {
            containerWithComponents: {$get},
            containerWithAdjustments: {$get},
            container: {$get},
            send: {$post}
        },
        info: {
            $get,
            page: {$post},
            byServiceIdAndHash: {$post},
            byServiceId: {$get}
        }
    },
    dictionaries: {
        commissionType: {$get},
        commissionClassifications: {$get, $post, $put, $delete},
        commissions: {$get, $post, $put, $delete},
        accountingScenarios: {$get, $post, $put, $delete},
        adjustmentFormulas: {$get, $put},
        adjustmentTypes: {$get, $put},
        attributePossibleValues: {$get, $post, $put, $delete},
        attributeTypes: {$get},
        coefficients: {$get, $post, $put, $delete},
        componentFormulaLinks: {$post, $delete},
        componentTypes: {
            $get,
            $post,
            $put,
            $delete,
            inner: {$get}
        },
        componentTypeLinks: {$get, $post, $put, $delete},
        componentsToTriggerDates: {$get, $post, $put, $delete},
        dynamicAttributeTypes: {$get, $post, $put, $delete},
        enrichmentTypes: {$get, $post, $put, $delete},
        fieldMetaInfo: {$get},
        incomingEventTypes: {$get, $post, $put, $delete},
        incomingEventTypeToAdjustmentTypeLinks: {$get, $post, $put, $delete},
        incomingEventTypeToComponentTypeLinks: {$get, $post, $put, $delete},
        incomingEventTypeToIndicatorTypeLinks: {$get, $post, $put, $delete},
        indicatorFormulas: {$get, $post},
        indicatorTypes: {$get, $post, $put},
        mappingRules: {$get, $post, $put, $delete},
        mappingSettings: {
            $get,
            $post,
            $put,
            $delete,
            forMappingRules: {$post}
        },
        mappingSettingOverview: {
            $get,
            byGroups: {$get}
        },
        operationTypes: {
            $get,
            $post,
            $put,
            $delete,
            accounting: {$get}
        },
        operationTypeToAccountingScenarioAdjustments: {$get, $post, $put, $delete},
        operationTypeToAccountingScenarios: {$get, $post, $put, $delete},
        operationTypeToComponentTypes: {$get, $post, $put, $delete},
        productAttributeTypes: {$get, $post, $delete},
        productFabrics: {$get, $post, $put, $delete},
        registerTypes: {$get, $post, $put, $delete},
        simpleSpelArguments: {$get},
        spels: {$get},
        triggerDates: {$get},
        universalSettings: {$get, $post, $put, $delete},
        valueTypes: {$get}
    },
    dynamicAttributes: {$get, $post, $put, $delete},
    emulator: {
        process_service: {$post},
        enrichment_service: {$post}
    },
    parser: {
        parse: {$post}
    },
    productAttributes: {
        $get,
        linear: {$post}
    },
    productCalculation: {
        calculate: {$post}
    },
    products: {
        $get,
        $post,
        $put,
        page: {
            $post
        },
        version: {
            $post
        }
    },
    user: {$get}
};

export default BaseEndpoints;
