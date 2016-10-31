//// [exportAssignmentWithExports.ts]
export class C { }
class D { }
export = D;

//// [exportAssignmentWithExports.js]
"use strict";
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function () {
    function D() {
    }
    return D;
}());
module.exports = D;
