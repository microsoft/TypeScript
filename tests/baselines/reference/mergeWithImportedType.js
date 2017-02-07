//// [tests/cases/compiler/mergeWithImportedType.ts] ////

//// [f1.ts]
export enum E {X}

//// [f2.ts]
import {E} from "./f1";
// partial revert of https://github.com/Microsoft/TypeScript/pull/7583 to prevent breaking changes
export type E = E;

//// [f1.js]
"use strict";
var E;
(function (E) {
    E[E["X"] = 0] = "X";
})(E = exports.E || (exports.E = {}));
exports.__esModule = true;
//// [f2.js]
"use strict";
exports.__esModule = true;
