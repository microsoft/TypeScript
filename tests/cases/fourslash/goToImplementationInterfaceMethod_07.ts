/// <reference path='fourslash.ts'/>

//// interface Foo {
////     hello (): void;
//// }
////
//// class SuperSuperBar implements Foo {
////     hello() {}
//// }
////
//// class SuperBar extends SuperSuperBar {
////     [|hello() {}|]
//// }
////
//// class Bar extends SuperBar {
////     [|hello() {}|]
//// }
////
//// function (x: SuperBar) {
////     x.he/*function_call*/llo()
//// }

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();