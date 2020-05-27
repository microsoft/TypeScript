//// [exportEmptyArrayBindingPattern.ts]
export const [] = [];

//// [exportEmptyArrayBindingPattern.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _a;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            _a = [];
        }
    };
});
