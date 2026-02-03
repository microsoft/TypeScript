//// [tests/cases/compiler/exportAssignmentWithExports.ts] ////

//// [exportAssignmentWithExports.ts]
export class C { }
class D { }
export = D;

//// [exportAssignmentWithExports.js]
"use strict";
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
module.exports = D;
