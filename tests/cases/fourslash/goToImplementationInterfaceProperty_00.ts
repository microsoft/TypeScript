/// <reference path='fourslash.ts'/>

// Should handle property assignments in object literals within variable like declarations

//// interface Foo {
////     hello: number
//// }
////
//// var bar: Foo = { [|hello|]: 5 };
////
////
//// function whatever(x: Foo = { [|hello|]: 5 * 9 }) {
////     x.he/*reference*/llo
//// }
////
//// class Bar {
////     x: Foo = { [|hello|]: 6 }
////
////     constructor(public f: Foo = { [|hello|]: 7 } ) {}
//// }

verify.baselineGoToImplementation("reference");