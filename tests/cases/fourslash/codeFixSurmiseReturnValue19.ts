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
//// var x = <Comp t={() => { bar: '1' }} />;

verify.codeFixAvailable([
    { description: 'Wrap this object literal with parentheses' },
    { description: `Infer type of 'props' from usage` },
    { description: 'Remove unused label' },
]);
