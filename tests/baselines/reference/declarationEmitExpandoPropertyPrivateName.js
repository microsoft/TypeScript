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
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() { return null; }
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q = q;
var a_1 = require("./a");
function q() { }
q.val = (0, a_1.f)();


//// [a.d.ts]
interface I {
}
export declare function f(): I;
export {};
