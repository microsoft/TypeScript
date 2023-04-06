/// <reference path='fourslash.ts'/>

// Should return implementations in a simple class

//// interface Foo {
////     hel/*declaration*/lo(): void;
////     okay?: number;
//// }
////
//// class Bar implements Foo {
////     [|hello|]() {}
////     public sure() {}
//// }
////
//// function whatever(a: Foo) {
////     a.he/*function_call*/llo();
//// }
////
//// whatever(new Bar());

verify.baselineGoToImplementation("function_call", "declaration");