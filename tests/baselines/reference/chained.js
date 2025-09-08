//// [tests/cases/conformance/externalModules/typeOnly/chained.ts] ////

//// [a.ts]
class A { a!: string }
export type { A as B };
export type Z = A;

//// [b.ts]
import { Z as Y } from './a';
export { B as C } from './a';

//// [c.ts]
import type { C } from './b';
export { C as D };

//// [d.ts]
import { D } from './c';
new D();
const d: D = {};


//// [a.js]
class A {
    a;
}
export {};
//// [b.js]
export {};
//// [c.js]
export {};
//// [d.js]
new D();
const d = {};
export {};
