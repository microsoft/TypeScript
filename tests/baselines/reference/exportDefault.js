//// [tests/cases/conformance/externalModules/typeOnly/exportDefault.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
import type * as types from './a';
export default types;

//// [c.ts]
import * as types from './a';
export default types;

//// [d.ts]
import types from './b';
new types.A(); // Error

//// [e.ts]
import types = require('./b');
new types.A(); // Error

//// [f.ts]
import * as types from './b';
new types.default.A(); // Error

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
export default types;
//// [d.js]
new types.A(); // Error
export {};
//// [e.js]
new types.A(); // Error
export {};
//// [f.js]
import * as types from './b';
new types.default.A(); // Error
//// [g.js]
new types.A(); // Error
export {};
