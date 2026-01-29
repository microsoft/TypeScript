//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace7.ts] ////

//// [a.ts]
export class A {}
export class B {}
export class C {}

//// [b.ts]
export type * from "./a";
export class C {}

//// [c.ts]
import { A, B, C } from "./b";
let _: A = new A();  // Error
let __: B = new B(); // Error
let ___: C = new C(); // Ok

//// [d.ts]
export type * from "./b";

//// [e.ts]
import { A, B, C } from "./d";
let _: A = new A();   // Error
let __: B = new B();  // Error
let ___: C = new C(); // Error


//// [a.js]
export class A {
}
export class B {
}
export class C {
}
//// [b.js]
export class C {
}
//// [c.js]
import { C } from "./b";
let _ = new A(); // Error
let __ = new B(); // Error
let ___ = new C(); // Ok
//// [d.js]
export {};
//// [e.js]
let _ = new A(); // Error
let __ = new B(); // Error
let ___ = new C(); // Error
export {};
