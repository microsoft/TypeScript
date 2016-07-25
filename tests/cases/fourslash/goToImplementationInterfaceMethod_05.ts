/// <reference path='fourslash.ts'/>

// Should not return implementations in classes with a shared parent that implements the interface

//// interface Foo {
////     he/*declaration*/llo (): void;
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

goTo.marker("declaration");
verify.allRangesAppearInImplementationList();