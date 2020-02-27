//// [tests/cases/compiler/mergeWithImportedNamespace.ts] ////

//// [f1.ts]
export namespace N { export var x = 1; }

//// [f2.ts]
import {N} from "./f1";
export namespace N {
    export interface I {x: any}
}

//// [f1.js]
"use strict";
exports.__esModule = true;
var N;
(function (N) {
    N.x = 1;
})(N = exports.N || (exports.N = {}));
//// [f2.js]
"use strict";
exports.__esModule = true;
