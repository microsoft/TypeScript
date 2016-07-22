/// <reference path='fourslash.ts'/>

//// interface Foo { hello: number }
////
//// abstract class AbstractBar implements Foo {
////     abstract hello;
//// }
////
//// class Bar extends AbstractBar {
////     [|hello = 5 * 9;|]
//// }
////
//// function whatever(foo: Foo) {
////     foo.hel/*reference*/lo;
//// }

goTo.marker("reference");
verify.allRangesAppearInImplementationList();