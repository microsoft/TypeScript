/// <reference path='fourslash.ts' />

// @strict: false
//// class A {
////     foo() {
////         return class { x: number; }
////     }
////     bar() {
////         return new class { x: number; }
////     }
//// }
//// class C implements A {[| |]}

verify.not.codeFixAvailable();
