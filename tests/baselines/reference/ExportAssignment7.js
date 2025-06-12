//// [tests/cases/compiler/ExportAssignment7.ts] ////

//// [ExportAssignment7.ts]
export class C {
}

export = B;

//// [ExportAssignment7.js]
"use strict";
exports.C = void 0;
class C {
}
module.exports = B;
