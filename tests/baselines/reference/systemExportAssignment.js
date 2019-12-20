//// [tests/cases/compiler/systemExportAssignment.ts] ////

//// [a.d.ts]
declare var a: number;
export = a;  // OK, in ambient context

//// [b.ts]
import * as a from "a";


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
