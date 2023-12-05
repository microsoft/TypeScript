/// <reference path='fourslash.ts'/>

// Should handle union and intersection types

//// interface BaseFoo {
//// 	 hello(): void;
//// }
////
//// interface Foo extends BaseFoo {
//// 	 aloha(): void;
//// }
////
//// interface Bar {
////  	 hello(): void;
////  	 goodbye(): void;
//// }
////
//// class FooImpl implements Foo {
////  	 [|hello|]() {/**FooImpl*/}
////  	 aloha() {}
//// }
////
//// class BaseFooImpl implements BaseFoo {
////  	 hello() {/**BaseFooImpl*/}    // Should not show up
//// }
////
//// class BarImpl implements Bar {
//// 	 [|hello|]() {/**BarImpl*/}
//// 	 goodbye() {}
//// }
////
//// class FooAndBarImpl implements Foo, Bar {
//// 	 [|hello|]() {/**FooAndBarImpl*/}
//// 	 aloha() {}
//// 	 goodbye() {}
//// }
////
//// function someFunction(x: Foo | Bar) {
//// 	 x.he/*function_call0*/llo();
//// }
////
//// function anotherFunction(x: Foo & Bar) {
//// 	 x.he/*function_call1*/llo();
//// }

verify.baselineGoToImplementation("function_call0", "function_call1");