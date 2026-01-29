//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace6.ts] ////

//// [a.ts]
export class A {}
export class B {}

//// [b.ts]
export type * from "./a";

//// [c.ts]
export * from "./b";

//// [d.ts]
import { A, B } from "./c";
let _: A = new A();  // Error
let __: B = new B(); // Error

//// [a.js]
export class A {
}
export class B {
}
//// [b.js]
export {};
//// [c.js]
export * from "./b";
//// [d.js]
let _ = new A(); // Error
let __ = new B(); // Error
export {};
