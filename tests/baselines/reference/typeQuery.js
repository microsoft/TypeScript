//// [tests/cases/conformance/externalModules/typeOnly/typeQuery.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import type { A } from './a';
let AConstructor: typeof A;


//// [a.js]
export class A {
}
//// [b.js]
let AConstructor;
export {};
