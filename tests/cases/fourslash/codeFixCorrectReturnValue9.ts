/// <reference path='fourslash.ts' />

//// const a: () => number = () => { 1 }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
    { description: 'Remove block body braces' }
]);
