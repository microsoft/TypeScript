/// <reference path='fourslash.ts' />
//// interface A {
////     bar: string
//// }
//// 
//// const a: () => A = () => {
////     { bar: '1' }    
//// }

verify.codeFixAvailable([
    { description: 'Add a return statement' },
    { description: 'Remove block body braces' },
    { description: 'Replace braces with parentheses' },
    { description: 'Remove unused label' },
]);

interface A {
    bar: string
}
