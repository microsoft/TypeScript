//// [exportAssignmentWithExports.ts]
export class C { }
class D { }
export = D;

//// [exportAssignmentWithExports.js]
"use strict";
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
