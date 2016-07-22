/// <reference path='fourslash.ts'/>

//// interface Foo {
////     hello(): void
//// }
////
//// abstract class AbstractBar implements Foo {
////     abstract hello(): void;
//// }
////
//// class Bar extends AbstractBar {
////     [|hello() {}|]
//// }
////
//// function whatever(a: Foo) {
////     a.he/*function_call*/llo();
//// }

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();