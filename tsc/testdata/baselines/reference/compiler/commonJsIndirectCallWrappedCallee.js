//// [tests/cases/compiler/commonJsIndirectCallWrappedCallee.ts] ////

//// [a.ts]
export function f(this: unknown, ...args: any[]) { return this; }

//// [index.ts]
import { f } from "./a";
type F = () => unknown;
console.log(f() === undefined);
console.log((f)() === undefined);
console.log((f as F)() === undefined);
console.log((f!)() === undefined);
console.log((f satisfies F)() === undefined);
console.log((f)`x` === undefined);


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f(...args) { return this; }
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
console.log((0, a_1.f)() === undefined);
console.log((0, (a_1.f))() === undefined);
console.log((0, a_1.f)() === undefined);
console.log((0, (a_1.f))() === undefined);
console.log((0, a_1.f)() === undefined);
console.log((0, (a_1.f)) `x` === undefined);
