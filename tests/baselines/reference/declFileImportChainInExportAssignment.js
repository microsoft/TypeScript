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
var m;
(function (m) {
    (function (_c) {
        var c = (function () {
            function c() {
            }
            return c;
        })();
        _c.c = c;
    })(m.c || (m.c = {}));
    var c = m.c;
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
