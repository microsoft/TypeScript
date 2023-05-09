/// <reference path='fourslash.ts'/>

// Should return implementation in class and all sub-classes of target

//// interface Foo {
////     hello (): void;
//// }
////
//// class Bar extends SuperBar {
////     [|hello|]() {}
//// }
////
//// class SuperBar implements Foo {
////     [|hello|]() {}
//// }
////
//// class OtherBar implements Foo {
////     hello() {} // should not show up
//// }
////
//// function (x: SuperBar) {
////     x.he/*function_call*/llo()
//// }

verify.baselineGoToImplementation("function_call");