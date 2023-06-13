/// <reference path='fourslash.ts'/>

// Should go to function literals that implement the interface within variable like declarations when invoked on an interface

//// interface Fo/*interface_definition*/o {
////     (a: number): void
//// }
////
//// var bar: Foo = [|(a) => {/**0*/}|];
////
//// function whatever(x: Foo = [|(a) => {/**1*/}|] ) {
//// }
////
//// class Bar {
////     x: Foo = [|(a) => {/**2*/}|]
////
////     constructor(public f: Foo = [|function(a) {}|] ) {}
//// }

verify.baselineGoToImplementation("interface_definition");