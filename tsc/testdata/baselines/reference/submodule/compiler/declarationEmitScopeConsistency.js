//// [tests/cases/compiler/declarationEmitScopeConsistency.ts] ////

//// [a.ts]
export interface A { a: number }
export const f = (x: A) => x as A;

//// [b.ts]
import { f } from "./a";
export interface A { other: number }
export const g = f;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
const f = (x) => x;
exports.f = f;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = void 0;
const a_1 = require("./a");
exports.g = a_1.f;
