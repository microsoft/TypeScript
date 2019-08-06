//// [exportEmptyArrayBindingPattern.ts]
export const [] = [];

//// [exportEmptyArrayBindingPattern.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _a, _b;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("_b", _b = _a = []);
        }
    };
});
