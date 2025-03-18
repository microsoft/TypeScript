//// [tests/cases/compiler/declFileImportChainInExportAssignment.ts] ////

//// [declFileImportChainInExportAssignment.ts]
module m {
    export module c {
        export class c {
        }
    }
}
import a = m.c;
import b = a;
export = b;

//// [declFileImportChainInExportAssignment.js]
"use strict";
var m;
(function (m) {
    let c;
    (function (c_1) {
        class c {
        }
        c_1.c = c;
    })(c = m.c || (m.c = {}));
})(m || (m = {}));
module.exports = b;
