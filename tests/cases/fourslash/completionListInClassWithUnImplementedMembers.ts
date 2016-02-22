/// <reference path="fourslash.ts" />

//// abstract class A {
////     abstract foo(): number;
////     abstract bar(): number;
////     baz(): void { }
//// }
////
//// abstract class B extends A {
////     /*1*/ // <= show foo and bar; don't show baz
////     abstract qux(): string;
//// }
//// 
//// abstract class C extends B {
////     /*2*/ // <= show bar and qux; don't show foo or baz
////     foo(): number { return 10; }
//// }
////
//// class D extends C {
////     /*3*/ // <= show bar; don't show foo, baz or qux
////     qux(): string { return ""; }
//// }
////


goTo.marker("1");
verify.completionListContains("foo");
verify.completionListContains("bar");
verify.not.completionListContains("baz");

goTo.marker("2");
verify.completionListContains("bar");
verify.completionListContains("qux");
verify.not.completionListContains("foo");
verify.not.completionListContains("baz");

goTo.marker("3");
verify.completionListContains("bar");
verify.not.completionListContains("foo");
verify.not.completionListContains("baz");
verify.not.completionListContains("qux");