/// <reference path='fourslash.ts'/>

// Should handle union types

//// interface Foo {
//// 	 hello(): void;
//// 	 aloha(): void;
//// }
////
//// interface Bar {
////  	 hello(): void;
////  	 goodbye(): void;
//// }
////
//// class FooImpl implements Foo {
////  	 [|hello() {/**FooImpl*/}|]
////  	 aloha() {}
//// }
////
//// class BarImpl implements Bar {
//// 	 [|hello() {/**BarImpl*/}|]
//// 	 goodbye() {}
//// }
////
//// class FooAndBarImpl implements Foo, Bar {
//// 	 [|hello() {/**FooAndBarImpl*/}|]
//// 	 aloha() {}
//// 	 goodbye() {}
//// }
////
//// function someFunction(x: Foo | Bar) {
//// 	 x.he/*function_call*/llo();
//// }

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();
