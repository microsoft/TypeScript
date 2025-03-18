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
    let c;
    (function (c_1) {
        class c {
        }
        c_1.c = c;
    })(c = m.c || (m.c = {}));
    var x = c;
})(m || (m = {}));
module.exports = m;
