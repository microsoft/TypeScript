//// [duplicateLocalPragmas1.ts]
// @ts-strict
// @ts-strict
export class A {}


//// [duplicateLocalPragmas1.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
// @ts-strict
// @ts-strict
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
