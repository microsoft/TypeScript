//// [sourceMapValidationExportAssignment.ts]
class a {
    public c;
}
export = a;

//// [sourceMapValidationExportAssignment.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var a = /** @class */ (function () {
        function a() {
        }
        return a;
    }());
    return a;
});
//# sourceMappingURL=sourceMapValidationExportAssignment.js.map