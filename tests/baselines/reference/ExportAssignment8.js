//// [tests/cases/compiler/ExportAssignment8.ts] ////

//// [ExportAssignment8.ts]
export = B;

export class C {
}

//// [ExportAssignment8.js]
"use strict";
exports.C = void 0;
class C {
}
module.exports = B;
