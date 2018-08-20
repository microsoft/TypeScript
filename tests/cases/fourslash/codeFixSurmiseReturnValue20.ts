/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
//// }
//// interface A {
////     bar: string
//// }
//// class Comp { props: { t: () => number } }
//// var x = <Comp t={() => {
////     { bar: '1' }
//// }} />;

verify.codeFixAvailable([
    { description: 'Add a return statement' },
    { description: 'Remove block body braces' },
    { description: 'Replace braces with parentheses' },
    { description: 'Remove unused label' },
]);
