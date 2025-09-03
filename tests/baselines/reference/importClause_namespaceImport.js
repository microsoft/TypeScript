//// [tests/cases/conformance/externalModules/typeOnly/importClause_namespaceImport.ts] ////

//// [a.ts]
export class A { a!: string }
export class B { b!: number }
export type C<T> = T;
export const Value = {};

//// [b.ts]
import type * as types from './a';
types;
types.Value;
let v: types.Value;
const a: types.A = {};
const b: types.B = {};
const c: types.C<string> = "";
const d = { types };


//// [a.js]
export class A {
    a;
}
export class B {
    b;
}
export const Value = {};
//// [b.js]
types;
types.Value;
let v;
const a = {};
const b = {};
const c = "";
const d = { types };
export {};
