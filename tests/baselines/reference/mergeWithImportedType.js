//// [tests/cases/compiler/mergeWithImportedType.ts] ////

//// [f1.ts]
export enum E {X}

//// [f2.ts]
import {E} from "./f1";
// partial revert of https://github.com/Microsoft/TypeScript/pull/7583 to prevent breaking changes
export type E = E;

//// [f1.js]
"use strict";
(function (E) {
    E[E["X"] = 0] = "X";
})(exports.E || (exports.E = {}));
var E = exports.E;
//// [f2.js]
"use strict";
