//// [ExportAssignment8.ts]
export = B;

export class C {
}

//// [ExportAssignment8.js]
"use strict";
var C = (function () {
    function C() {
    }
    return C;
}());
module.exports = B;
