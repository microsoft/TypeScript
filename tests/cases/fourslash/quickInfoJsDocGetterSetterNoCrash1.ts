/// <reference path="fourslash.ts" />

// https://github.com/microsoft/TypeScript/issues/60024

//// class A implements A {
////   get x(): string { return "" }
//// }
//// const e = new A()
//// e.x/*1*/
////
//// class B implements B {
////   set x(v: string) {}
//// }
//// const f = new B()
//// f.x/*2*/

verify.quickInfoAt("1", "(property) A.x: string");
verify.quickInfoAt("2", "(property) B.x: string");
