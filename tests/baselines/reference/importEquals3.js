//// [tests/cases/conformance/externalModules/typeOnly/importEquals3.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
import type * as a from './a';
import A = a.A; // Error
import aa = a;  // Error

const x = 0;
export { a, A, x };

//// [c.ts]
import * as b from './b';
import A = b.a.A; // Error
import AA = b.A; // Error

import x = b.x;
console.log(x);


//// [a.js]
export class A {
}
//// [b.js]
var A = a.A; // Error
const x = 0;
export { A, x };
//// [c.js]
import * as b from './b';
var x = b.x;
console.log(x);
