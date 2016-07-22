/// <reference path='fourslash.ts'/>

//// interface Foo { hello: number }
////
//// class Bar implements Foo {
////     [|hello = 5 * 9;|]
//// }
////
//// function whatever(foo: Foo) {
////     foo.he/*reference*/llo;
//// }

goTo.marker("reference");
verify.allRangesAppearInImplementationList();