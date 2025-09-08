//// [tests/cases/conformance/externalModules/typeOnly/renamed.ts] ////

//// [a.ts]
class A { a!: string }
export type { A as B };

//// [b.ts]
export type { B as C } from './a';

//// [c.ts]
import type { C as D } from './b';
const d: D = {};


//// [a.js]
class A {
    a;
}
export {};
//// [b.js]
export {};
//// [c.js]
const d = {};
export {};
