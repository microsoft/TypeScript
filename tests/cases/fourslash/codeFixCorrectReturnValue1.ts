/// <reference path='fourslash.ts' />

//// function Foo (): number {
////     1
//// }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
]);
