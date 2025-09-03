//// [tests/cases/conformance/externalModules/typeOnly/importsNotUsedAsValues_error.ts] ////

//// [a.ts]
export default class {}
export class A {}
export type B = {};
export const enum C { One, Two }

//// [b.ts]
import { A, B } from './a'; // Error
let a: A;
let b: B;
console.log(a, b);

//// [c.ts]
import Default, * as named from './a'; // Error
let a: Default;
let b: named.B;
console.log(a, b);

//// [d.ts]
import Default, { A } from './a';
const a = A;
let b: Default;
console.log(a, b);

//// [e.ts]
import { A, B } from './a'; // noUnusedLocals error only

//// [f.ts]
import { C } from './a';
import type { C as D } from './a';
C.One;
let c: D = C.Two;
let d: D.Two = C.Two;
console.log(c, d);

//// [g.ts]
import { C } from './a';
let c: C;
let d: C.Two;
console.log(c, d);

//// [h.ts]
class H {}
export = H;

//// [i.ts]
import H = require('./h'); // Error
let h: H = {};
console.log(h);

//// [j.ts]
import H = require('./h'); // noUnusedLocals error only

//// [k.ts]
const enum K { One, Two }
export = K;

//// [l.ts]
import K = require('./k');
K.One;

//// [j.ts]
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207

//// [a.js]
export default class {
}
export class A {
}
//// [b.js]
let a;
let b;
console.log(a, b);
export {};
//// [c.js]
let a;
let b;
console.log(a, b);
export {};
//// [d.js]
import { A } from './a';
const a = A;
let b;
console.log(a, b);
//// [e.js]
export {};
//// [f.js]
0 /* C.One */;
let c = 1 /* C.Two */;
let d = 1 /* C.Two */;
console.log(c, d);
export {};
//// [g.js]
let c;
let d;
console.log(c, d);
export {};
//// [h.js]
class H {
}
export {};
//// [i.js]
let h = {};
console.log(h);
export {};
//// [j.js]
// Sad face https://github.com/microsoft/TypeScript/blob/6b04f5039429b9d412696fe2febe39ecc69ad365/src/testRunner/compilerRunner.ts#L207
//// [k.js]
export {};
//// [l.js]
0 /* K.One */;
export {};
