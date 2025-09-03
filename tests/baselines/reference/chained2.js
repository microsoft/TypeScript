//// [tests/cases/conformance/externalModules/typeOnly/chained2.ts] ////

//// [a.ts]
class A { a!: string }
export type { A as default };

//// [b.ts]
import A from './a';
import type { default as B } from './a';
export { A, B };

//// [c.ts]
import * as types from './b';
export { types as default };

//// [d.ts]
import types from './c';
new types.A();
new types.B();
const a: types.A = {};
const b: types.B = {};


//// [a.js]
class A {
    a;
}
export {};
//// [b.js]
export {};
//// [c.js]
import * as types from './b';
export { types as default };
//// [d.js]
import types from './c';
new types.A();
new types.B();
const a = {};
const b = {};
