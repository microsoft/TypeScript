/// <reference path='fourslash.ts' />

//// interface A {
////     a: () => number
//// }
//// 
//// function Foo (): A {
////     return {
////         a: () => { 1 }
////     }
//// }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
    { description: 'Remove block body braces' },
]);
