//// [genericIndexedAccessMethodIntersectionCanBeAccessed.ts]
type ExtendedService<T> = {
    [K in keyof T]: T[K] & {
        __$daemonMode?: string;
        __$action?: string;
    };
};

type Service<T> = {
    [K in keyof T]: T[K] & {id?: string};
};

export const createService = <T>(
    ServiceCtr: ExtendedService<T> & Service<T>
) => {
    Object.keys(ServiceCtr).forEach(key => {
        const method = (ServiceCtr)[key as keyof T];
        const {__$daemonMode, __$action, id} = method;
    })
}


//// [genericIndexedAccessMethodIntersectionCanBeAccessed.js]
"use strict";
exports.__esModule = true;
exports.createService = void 0;
var createService = function (ServiceCtr) {
    Object.keys(ServiceCtr).forEach(function (key) {
        var method = (ServiceCtr)[key];
        var __$daemonMode = method.__$daemonMode, __$action = method.__$action, id = method.id;
    });
};
exports.createService = createService;
