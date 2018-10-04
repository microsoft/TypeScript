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

verify.noErrors();
goTo.marker('1');
edit.insert("public m(n: number) { return 0; }");
verify.noErrors();