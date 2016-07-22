/// <reference path='fourslash.ts'/>

//// interface Foo {
////     hello: () => void
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