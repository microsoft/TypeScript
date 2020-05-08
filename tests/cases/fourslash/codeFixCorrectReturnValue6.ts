/// <reference path='fourslash.ts' />

//// function Foo (): undefined {
////     undefined
//// }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
]);
