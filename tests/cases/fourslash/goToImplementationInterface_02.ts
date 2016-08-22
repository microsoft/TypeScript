/// <reference path='fourslash.ts'/>

// Should go to definitions in object literals in return statements of functions with the type of the interface

//// interface Fo/*interface_definition*/o { hello: () => void }
////
//// function createFoo(): Foo {
////     return [|{
////         hello() {}
////     }|];
//// }
////
//// function createFooLike() {
////     return {
////         hello() {}
////     };
//// }

goTo.marker("interface_definition");
verify.allRangesAppearInImplementationList();