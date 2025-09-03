//// [tests/cases/conformance/externalModules/typeOnly/importEquals2.ts] ////

//// [a.ts]
class A {}
export type { A }

//// [b.ts]
import * as a from './a';
export = a;

//// [c.ts]
import a = require('./b');
new a.A(); // Error


//// [a.js]
class A {
}
export {};
//// [b.js]
import * as a from './a';
//// [c.js]
new a.A(); // Error
export {};
