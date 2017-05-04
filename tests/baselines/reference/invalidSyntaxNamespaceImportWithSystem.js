//// [tests/cases/conformance/externalModules/invalidSyntaxNamespaceImportWithSystem.ts] ////

//// [0.ts]
export class C { }

//// [1.ts]
import * from Zero from "./0"

//// [0.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var C;
    return {
        setters: [],
        execute: function () {
            C = (function () {
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
    var __moduleName = context_1 && context_1.id;
    var from;
    return {
        setters: [],
        execute: function () {
            from;
            "./0";
        }
    };
});
