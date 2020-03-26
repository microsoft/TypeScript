/// <reference path='fourslash.ts' />
//// interface A {
////     bar: string
//// }
//// 
//// const a: () => A = () => {
////     bar: '1'   
//// }

verify.codeFixAvailable([
    { description: 'Wrap the following body with parentheses which should be an object literal' },
    { description: 'Remove unused label' },
]);
