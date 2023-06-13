//// [tests/cases/compiler/sourceMapValidationExportAssignmentCommonjs.ts] ////

//// [sourceMapValidationExportAssignmentCommonjs.ts]
class a {
    public c;
}
export = a;

//// [sourceMapValidationExportAssignmentCommonjs.js]
"use strict";
var a = /** @class */ (function () {
    function a() {
    }
    return a;
}());
module.exports = a;
//# sourceMappingURL=sourceMapValidationExportAssignmentCommonjs.js.map