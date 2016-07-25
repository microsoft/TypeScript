/// <reference path='fourslash.ts'/>

// Should handle calls made on super

//// interface Foo {
////     hell/*declaration*/o (): void;
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

goTo.marker("declaration");
verify.allRangesAppearInImplementationList();