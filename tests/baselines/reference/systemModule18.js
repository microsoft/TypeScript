//// [tests/cases/compiler/systemModule18.ts] ////

//// [react.ts]
export function createElement() {}
export function lazy() {}
export function useState() {}

//// [index.ts]
export import React = require("./react.js");


//// [react.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function createElement() { }
    exports_1("createElement", createElement);
    function lazy() { }
    exports_1("lazy", lazy);
    function useState() { }
    exports_1("useState", useState);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [index.js]
System.register(["./react.js"], function (exports_1, context_1) {
    "use strict";
    var React;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (React_1) {
                React = React_1;
                exports_1("React", React_1);
            }
        ],
        execute: function () {
        }
    };
});
