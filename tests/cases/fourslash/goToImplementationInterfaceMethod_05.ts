/// <reference path='fourslash.ts'/>

// Should not return implementations in classes with a shared parent that implements the interface

//// interface Foo {
////     hello (): void;
//// }
////
//// class SuperBar implements Foo {
////     [|hello|]() {}
//// }
////
//// class Bar extends SuperBar {
////     hello2() {}
//// }
////
//// class OtherBar extends SuperBar {
////     hello() {}
////     hello2() {}
////     hello3() {}
//// }
////
//// class NotRelatedToBar {
////     hello() {}         // Equivalent to last case, but shares no common ancestors with Bar and so is not returned
////     hello2() {}
////     hello3() {}
//// }
////
//// class NotBar extends SuperBar {
////     hello() {}         // Should not be returned because it is not structurally equivalent to Bar
//// }
////
//// function whatever(x: Bar) {
////     x.he/*function_call*/llo()
//// }

verify.baselineGoToImplementation("function_call");