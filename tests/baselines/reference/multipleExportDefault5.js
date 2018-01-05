//// [multipleExportDefault5.ts]
export default function bar() { }
export default class C {}

//// [multipleExportDefault5.js]
"use strict";
exports.__esModule = true;
function bar() { }
exports["default"] = bar;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports["default"] = C;
