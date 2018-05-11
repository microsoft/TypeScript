//// [tests/cases/compiler/systemExportAssignment2.ts] ////

//// [a.ts]
var a = 10;
export = a;  // Error: export = not allowed in ES6

//// [b.ts]
import * as a from "a";


//// [a.js]
System.register([], function (exports_1, context_1) {
    var a;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            a = 10;
        }
    };
});
//// [b.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
