/// <reference path='fourslash.ts'/>

// Should not hang on inheritance loops

//// interface Base {
////     hello (): void;
//// }
////
//// interface A extends Base {}
//// interface B extends C, A {}
//// interface C extends B, A {}
////
//// class X implements B {
////     [|hello|]() {}
//// }
////
//// function someFunction(d : A) {
////     d.he/*function_call*/llo();
//// }

verify.baselineGoToImplementation("function_call");