//// [tests/cases/conformance/parser/ecmascript5/ExportAssignments/parserExportAssignment7.ts] ////

//// [parserExportAssignment7.ts]
export class C {
}

export = B;

//// [parserExportAssignment7.js]
"use strict";
exports.C = void 0;
class C {
}
module.exports = B;
