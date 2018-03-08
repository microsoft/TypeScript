/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f1(a) { }
////function h1() {
////    class C { p: number };
////    f1({ ofTypeC: new C() });
////}
////
////function f2(a) { }
////function h2() {
////    interface I { a: number }
////    var i: I = {a : 1};
////    f2(i);
////    f2(2);
////    f2(false);
////}
////

verify.not.codeFixAvailable();
