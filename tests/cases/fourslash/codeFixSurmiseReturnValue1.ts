/// <reference path='fourslash.ts' />

//// function Foo (): number {
////     1
//// }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
    { description: 'Remove block body braces' },
    { description: 'Replace braces with parentheses' },
]);
