/// <reference path='fourslash.ts'/>

//// interface Foo { hello(): void }
////
//// class Bar implements Foo {
////     [|hello () {}|]
//// }
////
//// function whatever(a: Foo) {
////     a.he/*function_call*/llo();
//// }
////
//// whatever(new Bar());

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();