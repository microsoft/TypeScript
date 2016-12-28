//// [parserExportAssignment7.ts]
export class C {
}

export = B;

//// [parserExportAssignment7.js]
"use strict";
var C = (function () {
    function C() {
    }
    return C;
}());
module.exports = B;
