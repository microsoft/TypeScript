//// [exportAssignmentWithExports.ts]
export class C { }
class D { }
export = D;

//// [exportAssignmentWithExports.js]
var C = (function () {
    function C() {
    }
    return C;
})();
exports.C = C;
var D = (function () {
    function D() {
    }
    return D;
})();
module.exports = D;
