//// [exportObjectRest.ts]
export const { x, ...rest } = { x: 'x', y: 'y' };

//// [exportObjectRest.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _a, x, rest;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = (_a = { x: 'x', y: 'y' }, _a).x), exports_1("rest", rest = __rest(_a, ["x"]));
        }
    };
});
