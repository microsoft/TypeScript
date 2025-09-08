//// [tests/cases/conformance/externalModules/typeOnly/importDefaultNamedType2.ts] ////

//// [a.ts]
export default class A {}

//// [b.ts]
import type from from './a';


//// [a.js]
export default class A {
}
//// [b.js]
export {};
