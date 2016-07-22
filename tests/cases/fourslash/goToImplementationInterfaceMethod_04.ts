/// <reference path='fourslash.ts'/>

//// interface Foo {
////     hello (): void;
//// }
////
//// class Bar extends SuperBar {
////     [|hello() {}|]
//// }
////
//// class SuperBar implements Foo {
////     [|hello() {}|]
//// }
////
//// class OtherBar implements Foo {
////     hello() {} // should not show up
//// }
////
//// function (x: SuperBar) {
////     x.he/*function_call*/llo()
//// }

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();