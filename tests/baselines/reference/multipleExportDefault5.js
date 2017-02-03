//// [multipleExportDefault5.ts]
export default function bar() { }
export default class C {}

//// [multipleExportDefault5.js]
"use strict";
function bar() { }
exports["default"] = bar;
var C = (function () {
    function C() {
    }
    return C;
}());
exports["default"] = C;
exports.__esModule = true;
