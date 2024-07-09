/// <reference path='fourslash.ts'/>

// Should return implementations when left hand side of function call is an abstract class

//// interface Foo {
////     he/*declaration*/llo(): void
//// }
////
//// abstract class AbstractBar implements Foo {
////     abstract hello(): void;
//// }
////
//// class Bar extends AbstractBar {
////     [|hello|]() {}
//// }
////
//// function whatever(a: AbstractBar) {
////     a.he/*function_call*/llo();
//// }

verify.baselineGoToImplementation("function_call", "declaration");