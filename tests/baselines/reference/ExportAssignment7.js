//// [ExportAssignment7.ts]
export class C {
}

export = B;

//// [ExportAssignment7.js]
"use strict";
var C = (function () {
    function C() {
    }
    return C;
}());
module.exports = B;
