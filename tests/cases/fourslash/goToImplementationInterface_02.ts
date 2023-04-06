/// <reference path='fourslash.ts'/>

// Should go to definitions in object literals in return statements of functions with the type of the interface

//// interface Fo/*interface_definition*/o { hello: () => void }
////
//// let x: number = 9;
////
//// function createFoo(): Foo {
////     if (x === 2) {
////         return [|{
////             hello() {}
////         }|];
////     }
////     return [|{
////         hello() {}
////     }|];
//// }
////
//// let createFoo2 = (): Foo => [|({hello() {}})|];
////
//// function createFooLike() {
////     return {
////         hello() {}
////     };
//// }

verify.baselineGoToImplementation("interface_definition");