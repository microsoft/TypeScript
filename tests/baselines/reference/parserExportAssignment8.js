//// [tests/cases/conformance/parser/ecmascript5/ExportAssignments/parserExportAssignment8.ts] ////

//// [parserExportAssignment8.ts]
export = B;

export class C {
}

//// [parserExportAssignment8.js]
"use strict";
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
module.exports = B;
