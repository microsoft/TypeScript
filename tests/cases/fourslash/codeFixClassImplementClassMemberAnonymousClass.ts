/// <reference path='fourslash.ts' />

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
