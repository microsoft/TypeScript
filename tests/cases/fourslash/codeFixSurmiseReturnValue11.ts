/// <reference path='fourslash.ts' />
//// interface A {
////     bar: string
//// }
//// 
//// function Foo (): A {
////     { bar: '123' }
//// }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
    { description: 'Remove block body braces' },
    { description: 'Replace braces with parentheses' },
    { description: 'Remove unused label' },
]);
