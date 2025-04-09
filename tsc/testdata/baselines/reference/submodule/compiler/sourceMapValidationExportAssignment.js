//// [tests/cases/compiler/sourceMapValidationExportAssignment.ts] ////

//// [sourceMapValidationExportAssignment.ts]
class a {
    public c;
}
export = a;

//// [sourceMapValidationExportAssignment.js]
"use strict";
class a {
    c;
}
module.exports = a;
//# sourceMappingURL=sourceMapValidationExportAssignment.js.map