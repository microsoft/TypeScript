/// <reference path='fourslash.ts' />
//// interface A {
////     bar: string
//// }
//// 
//// function Foo (a: () => A) { a() }
//// Foo(() => { bar: '1' })

verify.codeFixAvailable([
    { description: 'Wrap this block with parentheses' },
    { description: 'Remove unused label' },
]);
