//// [tests/cases/compiler/ExportAssignment7.ts] ////

//// [ExportAssignment7.ts]
export class C {
}

export = B;

//// [ExportAssignment7.js]
"use strict";
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
module.exports = B;
