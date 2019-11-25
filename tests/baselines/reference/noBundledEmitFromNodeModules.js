//// [tests/cases/compiler/noBundledEmitFromNodeModules.ts] ////

//// [index.ts]
export class C {}

//// [a.ts]
import { C } from "projB";


//// [out.js]
System.register("a", ["node_modules/projB/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
        }
    };
});
