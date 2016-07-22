/// <reference path='fourslash.ts'/>

//// interface Foo {
////     hello (): void;
//// }
////
//// class Bar extends SuperBar {
//// }
////
//// class SuperBar implements Foo {
////     [|hello() {}|]
//// }
////
//// class OtherBar extends SuperBar {
////     hello() {} // should not show up
//// }
////
//// function (x: Bar) {
////     x.he/*function_call*/llo()
//// }

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();