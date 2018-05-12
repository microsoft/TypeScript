//// [systemModule16.ts]
import * as x from "foo";
import * as y from "bar";
export * from "foo";
export * from "bar"
export {x}
export {y}
import {a1, b1, c1 as d1} from "foo";
export {a2, b2, c2 as d2} from "bar";

x,y,a1,b1,d1;


//// [systemModule16.js]
System.register(["foo", "bar"], function (exports_1, context_1) {
    var x, y, foo_1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "x": true,
        "y": true,
        "a2": true,
        "b2": true,
        "d2": true
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
            function (x_1) {
                x = x_1;
                exportStar_1(x_1);
                foo_1 = x_1;
            },
            function (y_1) {
                y = y_1;
                exportStar_1(y_1);
                exports_1({
                    "a2": y_1["a2"],
                    "b2": y_1["b2"],
                    "d2": y_1["c2"]
                });
            }
        ],
        execute: function () {
            exports_1("x", x);
            exports_1("y", y);
            x, y, foo_1.a1, foo_1.b1, foo_1.c1;
        }
    };
});
