/// <reference path='fourslash.ts'/>

// Should go to implementation of properties that are assigned to implementations of an interface using shorthand notation

//// interface Foo {
//// 	 hello(): void;
//// }
////
//// function createFoo(): Foo {
////     return {
////          hello
////     };
////
////     function [|hello|]() {}
//// }
////
//// function whatever(x: Foo) {
////      x.h/*function_call*/ello();
//// }

verify.baselineGoToImplementation("function_call");