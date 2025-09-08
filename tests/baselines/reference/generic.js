//// [tests/cases/conformance/externalModules/typeOnly/generic.ts] ////

//// [a.ts]
export class A<T> { a!: T }
export type { A as B };

//// [b.ts]
import type { A } from './a';
import { B } from './a';
let a: A<string> = { a: "" };
let b: B<number> = { a: 3 };
let c: A<boolean> = {};
let d: B = { a: "" };

//// [a.js]
export class A {
    a;
}
//// [b.js]
let a = { a: "" };
let b = { a: 3 };
let c = {};
let d = { a: "" };
export {};
