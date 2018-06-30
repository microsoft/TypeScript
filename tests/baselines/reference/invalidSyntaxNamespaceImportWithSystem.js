//// [tests/cases/conformance/externalModules/invalidSyntaxNamespaceImportWithSystem.ts] ////

//// [0.ts]
export class C { }

//// [1.ts]
import * from Zero from "./0"

//// [0.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var C;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            exports_1("C", C);
        }
    };
});
//// [1.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var from;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            from;
            "./0";
        }
    };
});
