/// <reference path='fourslash.ts'/>

//// interface Foo {
////     hello (): void;
//// }
////
//// class Bar extends SuperBar {
////     hello() {}
//// }
////
//// class SuperBar extends SuperSuperBar {
////     whatever() {
////         super.he/*function_call*/llo();
////     }
//// }
////
//// class SuperSuperBar implements Foo {
////     [|hello() {}|]
//// }

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();