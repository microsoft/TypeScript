//// [tests/cases/conformance/externalModules/typeOnly/exportNamespace8.ts] ////

//// [a.ts]
export class A {}
export class B {}

//// [b.ts]
export class B {}
export class C {}

//// [c.ts]
export type * from "./a";
export * from "./b"; // Collision error

//// [d.ts]
import { A, B, C } from "./c";
let _: A = new A();   // Error
let __: B = new B();  // Ok
let ___: C = new C(); // Ok


//// [a.js]
export class A {
}
export class B {
}
//// [b.js]
export class B {
}
export class C {
}
//// [c.js]
export * from "./b"; // Collision error
//// [d.js]
import { B, C } from "./c";
let _ = new A(); // Error
let __ = new B(); // Ok
let ___ = new C(); // Ok
