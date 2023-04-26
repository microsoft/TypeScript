//// [tests/cases/compiler/mergeWithImportedType.ts] ////

//// [f1.ts]
export enum E {X}

//// [f2.ts]
import {E} from "./f1";
export type E = E;

//// [f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E = void 0;
var E;
(function (E) {
    E[E["X"] = 0] = "X";
})(E || (exports.E = E = {}));
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
