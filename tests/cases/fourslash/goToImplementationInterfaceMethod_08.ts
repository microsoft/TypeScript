/// <reference path='fourslash.ts'/>

//// interface Foo {
////     hello (): void;
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