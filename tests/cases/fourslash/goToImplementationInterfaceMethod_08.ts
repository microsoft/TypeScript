/// <reference path='fourslash.ts'/>

// Should handle calls made on this

//// interface Foo {
////     hello (): void;
//// }
////
//// class SuperBar implements Foo {
////    [|hello|]() {}
//// }
////
//// class Bar extends SuperBar {
////    whatever() { this.he/*function_call*/llo(); }
//// }
////
//// class SubBar extends Bar {
////    [|hello|]() {}
//// }


verify.baselineGoToImplementation("function_call");
