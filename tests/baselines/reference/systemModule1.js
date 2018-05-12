//// [systemModule1.ts]
export var x = 1;

//// [systemModule1.js]
System.register([], function (exports_1, context_1) {
    var x;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = 1);
        }
    };
});
