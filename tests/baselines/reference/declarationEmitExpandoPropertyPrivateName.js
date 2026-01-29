//// [tests/cases/compiler/declarationEmitExpandoPropertyPrivateName.ts] ////

//// [a.ts]
interface I {}
export function f(): I { return null as I; }
//// [b.ts]
import {f} from "./a";

export function q() {}
q.val = f();


//// [a.js]
export function f() { return null; }
//// [b.js]
import { f } from "./a";
export function q() { }
q.val = f();


//// [a.d.ts]
interface I {
}
export declare function f(): I;
export {};
