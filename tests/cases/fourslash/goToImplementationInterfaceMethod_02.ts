/// <reference path='fourslash.ts'/>

// Should return implementations when left hand side of function call is an abstract class

//// interface Foo {
////     they/*declaration*/llo(): void
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
////     a.they/*function_call*/llo();
//// }

verify.allRangesAppearInImplementationList("function_call");
verify.allRangesAppearInImplementationList("declaration");