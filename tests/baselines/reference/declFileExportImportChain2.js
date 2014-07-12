//// [declFileExportImportChain2_d.ts]
import c = require("declFileExportImportChain2_c");
export var x: c.b.m2.c1;

//// [declFileExportImportChain2_a.js]
define(["require", "exports"], function(require, exports) {
    var m1;
    (function (m1) {
        (function (m2) {
            var c1 = (function () {
                function c1() {
                }
                return c1;
            })();
            m2.c1 = c1;
        })(m1.m2 || (m1.m2 = {}));
        var m2 = m1.m2;
    })(m1 || (m1 = {}));
    
    return m1;
});
//// [declFileExportImportChain2_b.js]
define(["require", "exports", "declFileExportImportChain2_a"], function(require, exports, a) {
    
    return a;
});
//// [declFileExportImportChain2_c.js]
define(["require", "exports", "declFileExportImportChain2_b"], function(require, exports, b) {
    exports.b = b;
});
//// [declFileExportImportChain2_d.js]
define(["require", "exports"], function(require, exports) {
    exports.x;
});


////[declFileExportImportChain2_a.d.ts]
declare module m1 {
    module m2 {
        class c1 {
        }
    }
}
export = m1;
////[declFileExportImportChain2_b.d.ts]
import a = require("declFileExportImportChain2_a");
export = a;
////[declFileExportImportChain2_c.d.ts]
export import b = require("declFileExportImportChain2_b");
////[declFileExportImportChain2_d.d.ts]
import c = require("declFileExportImportChain2_c");
export declare var x: c.b.m2.c1;
