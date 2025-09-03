//// [tests/cases/conformance/externalModules/typeOnly/importDefaultNamedType3.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
import type from = require('./a');


//// [a.js]
export class A {
}
//// [b.js]
export {};
