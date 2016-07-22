/// <reference path='fourslash.ts'/>

//// interface Foo {
////     hello: number
//// }
////
//// var bar: Foo = { [|hello: 5|] };
////
////
//// function whatever(x: Foo = { [|hello: 5 * 9|] }) {
////     x.he/*reference*/llo()
//// }
////
//// class Bar {
////     x: Foo = { [|hello: 6|] }
////
////     constructor(public f: Foo = { [|hello: 7|] } ) {}
//// }

goTo.marker("reference");
verify.allRangesAppearInImplementationList();