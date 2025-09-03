//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace_js.ts] ////

//// [a.js]
export class A {}

//// [b.js]
export type * from './a';

//// [c.js]
import { A } from './b';
A;


//// [a.js]
export class A {
}
//// [b.js]
export {};
//// [c.js]
import { A } from './b';
A;


//// [a.d.ts]
export class A {
}
//// [b.d.ts]
export type * from "./a";
//// [c.d.ts]
export {};
