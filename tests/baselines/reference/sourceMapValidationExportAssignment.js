//// [tests/cases/compiler/sourceMapValidationExportAssignment.ts] ////

//// [sourceMapValidationExportAssignment.ts]
class a {
    public c;
}
export = a;

//// [sourceMapValidationExportAssignment.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    class a {
    }
    return a;
});
//# sourceMappingURL=sourceMapValidationExportAssignment.js.map