/// <reference path='fourslash.ts'/>

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