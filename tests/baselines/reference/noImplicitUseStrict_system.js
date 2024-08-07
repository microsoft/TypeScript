//// [tests/cases/compiler/noImplicitUseStrict_system.ts] ////

//// [noImplicitUseStrict_system.ts]
export var x = 0;

//// [noImplicitUseStrict_system.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var x;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = 0);
        }
    };
});
