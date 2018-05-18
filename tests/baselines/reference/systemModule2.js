//// [systemModule2.ts]
var x = 1;
export = x;

//// [systemModule2.js]
System.register([], function (exports_1, context_1) {
    var x;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            x = 1;
        }
    };
});
