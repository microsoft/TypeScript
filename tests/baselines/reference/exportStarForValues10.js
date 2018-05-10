//// [tests/cases/compiler/exportStarForValues10.ts] ////

//// [file0.ts]
export var v = 1;

//// [file1.ts]
export interface Foo { x }

//// [file2.ts]
export * from "file0";
export * from "file1";
var x = 1;

//// [file0.js]
System.register([], function (exports_1, context_1) {
    var v;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("v", v = 1);
        }
    };
});
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
System.register(["file0"], function (exports_1, context_1) {
    var x;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (file0_1_1) {
                exportStar_1(file0_1_1);
            }
        ],
        execute: function () {
            x = 1;
        }
    };
});
