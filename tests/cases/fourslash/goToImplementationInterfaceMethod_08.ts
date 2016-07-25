/// <reference path='fourslash.ts'/>

// Should handle calls made on this

//// interface Foo {
////     he/*declaration*/llo (): void;
//// }
////
//// class SuperBar implements Foo {
////    [|hello() {}|]
//// }
////
//// class Bar extends SuperBar {
////    whatever() { this.he/*function_call*/llo(); }
//// }
////
//// class SubBar extends Bar {
////    [|hello() {}|]
//// }


goTo.marker("function_call");
verify.allRangesAppearInImplementationList();

goTo.marker("declaration");
verify.allRangesAppearInImplementationList();