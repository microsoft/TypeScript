//// [tests/cases/compiler/declFileExportImportChain2.ts] ////

//// [declFileExportImportChain2_a.ts]
module m1 {
    export module m2 {
        export class c1 {
        }
    }
}
export = m1;

//// [declFileExportImportChain2_b.ts]
import a = require("declFileExportImportChain2_a");
export = a;

//// [declFileExportImportChain2_c.ts]
export import b = require("declFileExportImportChain2_b");

//// [declFileExportImportChain2_d.ts]
import c = require("declFileExportImportChain2_c");
export var x: c.b.m2.c1;

//// [declFileExportImportChain2_a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var m1;
    (function (m1) {
        var m2;
        (function (m2) {
            var c1 = /** @class */ (function () {
                function c1() {
                }
                return c1;
            }());
            m2.c1 = c1;
        })(m2 = m1.m2 || (m1.m2 = {}));
    })(m1 || (m1 = {}));
    return m1;
});
//// [declFileExportImportChain2_b.js]
define(["require", "exports", "declFileExportImportChain2_a"], function (require, exports, a) {
    "use strict";
    return a;
});
//// [declFileExportImportChain2_c.js]
define(["require", "exports", "declFileExportImportChain2_b"], function (require, exports, b) {
    "use strict";
    exports.__esModule = true;
    exports.b = b;
});
//// [declFileExportImportChain2_d.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
});


//// [declFileExportImportChain2_a.d.ts]
declare module m1 {
    module m2 {
        class c1 {
        }
    }
}
export = m1;
//// [declFileExportImportChain2_b.d.ts]
import a = require("declFileExportImportChain2_a");
export = a;
//// [declFileExportImportChain2_c.d.ts]
export import b = require("declFileExportImportChain2_b");
//// [declFileExportImportChain2_d.d.ts]
import c = require("declFileExportImportChain2_c");
export declare var x: c.b.m2.c1;
