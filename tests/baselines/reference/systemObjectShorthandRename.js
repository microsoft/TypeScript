//// [tests/cases/compiler/systemObjectShorthandRename.ts] ////

//// [x.ts]
export const x = 'X'
//// [index.ts]
import {x} from './x.js'

const x2 = {x}
const a = {x2}

const x3 = x
const b = {x3}

//// [x.js]
System.register([], function (exports_1, context_1) {
    var x;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = 'X');
        }
    };
});
//// [index.js]
System.register(["./x.js"], function (exports_1, context_1) {
    var x_js_1, x2, a, x3, b;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (x_js_1_1) {
                x_js_1 = x_js_1_1;
            }
        ],
        execute: function () {
            x2 = { x: x_js_1.x };
            a = { x2 };
            x3 = x_js_1.x;
            b = { x3 };
        }
    };
});
