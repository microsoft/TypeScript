//// [tests/cases/compiler/sourceMapValidationExportAssignmentCommonjs.ts] ////

//// [sourceMapValidationExportAssignmentCommonjs.ts]
class a {
    public c;
}
export = a;

//// [sourceMapValidationExportAssignmentCommonjs.js]
"use strict";
class a {
    c;
}
module.exports = a;
//# sourceMappingURL=sourceMapValidationExportAssignmentCommonjs.js.map