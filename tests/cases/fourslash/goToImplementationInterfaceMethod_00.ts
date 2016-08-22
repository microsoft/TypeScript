/// <reference path='fourslash.ts'/>

// Should return method implementations in object literals within variable-like declarations

//// interface Foo {
////     he/*declaration*/llo: () => void
//// }
////
//// var bar: Foo = { [|hello: helloImpl|] };
////
//// function helloImpl () {}
////
//// function whatever(x: Foo = { [|hello() {/**1*/}|] }) {
////     x.he/*function_call*/llo()
//// }
////
//// class Bar {
////     x: Foo = { [|hello() {/*2*/}|] }
////
////     constructor(public f: Foo = { [|hello() {/**3*/}|] } ) {}
//// }

goTo.marker("function_call");
verify.allRangesAppearInImplementationList();

goTo.marker("declaration");
verify.allRangesAppearInImplementationList();