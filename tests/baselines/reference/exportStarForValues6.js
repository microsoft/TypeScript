//// [tests/cases/compiler/exportStarForValues6.ts] ////

//// [file1.ts]
export interface Foo { x }

//// [file2.ts]
export * from "file1"
export var x = 1;

//// [file1.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [file2.js]
System.register(["file1"], function (exports_1, context_1) {
    "use strict";
    var x;
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "x": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (file1_1_1) {
                exportStar_1(file1_1_1);
            }
        ],
        execute: function () {
            exports_1("x", x = 1);
        }
    };
});
