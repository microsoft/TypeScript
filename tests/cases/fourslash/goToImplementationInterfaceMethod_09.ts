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
////         super["hel/*element_access*/lo"]();
////     }
//// }
////
//// class SuperBar extends MegaBar {
////     [|hello|]() {}
//// }
////
//// class MegaBar implements Foo {
////     hello() {}
//// }

verify.baselineGoToImplementation("function_call", "element_access");
