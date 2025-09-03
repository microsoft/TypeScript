//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace5.ts] ////

//// [a.ts]
export class A {}
export class B {}
export class X {}

//// [b.ts]
export type * from "./a";
export { X } from "./a";

//// [c.ts]
import { A, B as C, X } from "./b";
let _: A = new A();   // Error
let __: C = new C();  // Error
let ___: X = new X(); // Ok

//// [d.ts]
export type * from "./a";
export * from "./a";

//// [e.ts]
import { A, B, X } from "./d";
let _: A = new A();   // Ok
let __: B = new B();  // Ok
let ___: X = new X(); // Ok

//// [a.js]
export class A {
}
export class B {
}
export class X {
}
//// [b.js]
export { X } from "./a";
//// [c.js]
import { X } from "./b";
let _ = new A(); // Error
let __ = new C(); // Error
let ___ = new X(); // Ok
//// [d.js]
export * from "./a";
//// [e.js]
import { A, B, X } from "./d";
let _ = new A(); // Ok
let __ = new B(); // Ok
let ___ = new X(); // Ok


//// [a.d.ts]
export declare class A {
}
export declare class B {
}
export declare class X {
}
//// [b.d.ts]
export type * from "./a";
export { X } from "./a";
//// [c.d.ts]
export {};
//// [d.d.ts]
export type * from "./a";
export * from "./a";
//// [e.d.ts]
export {};
