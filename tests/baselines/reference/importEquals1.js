//// [tests/cases/conformance/externalModules/typeOnly/importEquals1.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
import type * as types from './a';
export = types; // Error

//// [c.ts]
import * as types from './a';
export = types;

//// [d.ts]
import types from './b';
new types.A(); // Error

//// [e.ts]
import types = require('./b');
new types.A(); // Error

//// [f.ts]
import * as types from './b';
new types.A(); // Error

//// [g.ts]
import type types from './c'
new types.A(); // Error


//// [a.js]
export class A {
}
//// [b.js]
export {};
//// [c.js]
import * as types from './a';
//// [d.js]
new types.A(); // Error
export {};
//// [e.js]
new types.A(); // Error
export {};
//// [f.js]
new types.A(); // Error
export {};
//// [g.js]
new types.A(); // Error
export {};
