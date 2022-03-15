//// [tests/cases/compiler/declarationEmitExpandoPropertyPrivateName.ts] ////

//// [a.ts]
interface I {}
export function f(): I { return null as I; }
//// [b.ts]
import {f} from "./a";

export function q() {}
q.val = f();


//// [a.js]
"use strict";
exports.__esModule = true;
exports.f = void 0;
function f() { return null; }
exports.f = f;
//// [b.js]
"use strict";
exports.__esModule = true;
exports.q = void 0;
var a_1 = require("./a");
function q() { }
exports.q = q;
q.val = (0, a_1.f)();


//// [a.d.ts]
interface I {
}
export declare function f(): I;
export {};
