/// <reference path='fourslash.ts' />
//// interface A {
////     bar: string
//// }
//// 
//// const a: () => A = () => {
////     bar: '1'   
//// }

verify.codeFixAvailable([
    { description: 'Wrap this block with parentheses' },
    { description: 'Remove unused label' },
]);
