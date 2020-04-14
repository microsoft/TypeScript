/// <reference path='fourslash.ts' />

//// interface A {
////     a: () => number
//// }
//// 
//// let b: A = {
////     a: () => { 1 }
//// }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
    { description: 'Remove block body braces' },
]);
