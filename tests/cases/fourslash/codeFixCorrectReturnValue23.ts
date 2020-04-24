/// <reference path='fourslash.ts' />

//// class Foo {
////     bar: () => number = () => { 1 }
//// }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
    { description: 'Remove block body braces' }
]);
