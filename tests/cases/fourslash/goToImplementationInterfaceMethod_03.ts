/// <reference path='fourslash.ts'/>

// Should not return super implementations when method is implemented in class

//// interface Foo {
////     hello (): void;
//// }
////
//// class Bar extends SuperBar {
////     [|hello|]() {}
//// }
////
//// class SuperBar implements Foo {
////     hello() {} // should not show up
//// }
////
//// class OtherBar implements Foo {
////     hello() {} // should not show up
//// }
////
//// new Bar().hel/*function_call*/lo();
//// new Bar()["hello"]();

verify.baselineGoToImplementation("function_call");