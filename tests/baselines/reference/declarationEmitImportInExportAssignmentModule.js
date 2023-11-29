//// [tests/cases/compiler/declarationEmitImportInExportAssignmentModule.ts] ////

//// [declarationEmitImportInExportAssignmentModule.ts]
module m {
    export module c {
        export class c {
        }
    }
    import x = c;
    export var a: typeof x;
}
export = m;

//// [declarationEmitImportInExportAssignmentModule.js]
"use strict";
var m;
(function (m) {
    var c;
    (function (c_1) {
        var c = /** @class */ (function () {
            function c() {
            }
            return c;
        }());
        c_1.c = c;
    })(c = m.c || (m.c = {}));
})(m || (m = {}));
module.exports = m;


//// [declarationEmitImportInExportAssignmentModule.d.ts]
declare namespace m {
    namespace c {
        class c {
        }
    }
    import x = c;
    var a: typeof x;
}
export = m;
