//// [tests/cases/compiler/systemModule5.ts] ////

//// [systemModule5.ts]
export function foo() {}


//// [systemModule5.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() { }
    exports_1("foo", foo);
    return {
        setters: [],
        execute: function () {
        }
    };
});
