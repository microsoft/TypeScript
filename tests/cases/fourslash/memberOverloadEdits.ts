/// <reference path='fourslash.ts' />

//// module M {
////     export class A {
////         public m(n: number) {
////             return 0;
////         }
////         public n() {
////             return this.m(0);
////         }
////     }
////     export class B extends A { /*1*/ }
//// }

verify.numberOfErrorsInCurrentFile(0);
goTo.marker('1');
edit.insert("public m(n: number) { return 0; }");
verify.numberOfErrorsInCurrentFile(0);