//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace10.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export type * as ns from "./a";

//// [c.ts]
import { ns } from "./b";
let _: ns.A = new ns.A(); // Error

//// [a.js]
export class A {
}
//// [b.js]
export {};
//// [c.js]
let _ = new ns.A(); // Error
export {};
