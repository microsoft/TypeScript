/// <reference path='fourslash.ts' />

//// interface A {
////     foo: number
//// }

//// function Foo (): A {
////     ({ foo: 1 })
//// }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
]);
