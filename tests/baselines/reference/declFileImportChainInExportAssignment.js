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
var a = m.c;
var b = a;
module.exports = b;


//// [declFileImportChainInExportAssignment.d.ts]
declare module m {
    module c {
        class c {
        }
    }
}
import a = m.c;
import b = a;
export = b;
