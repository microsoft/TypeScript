/// <reference path='fourslash.ts'/>

// Should handle calls made on super

//// interface Foo {
////     hello (): void;
//// }
////
//// class SubBar extends Bar {
////     hello() {}
//// }
////
//// class Bar extends SuperBar {
////     hello() {}
////
////     whatever() {
////         super.he/*function_call*/llo();
////     }
//// }
////
//// class SuperBar extends MegaBar {
////     [|hello() {}|]
//// }
////
//// class MegaBar implements Foo {
////     hello() {}
//// }

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();
