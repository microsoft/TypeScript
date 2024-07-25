/// <reference path='fourslash.ts' />

//@Filename: file.tsx
// @jsx: preserve
// @noLib: true

//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
//// }
//// function SFC1(prop: { x: number }) {
////     return <div>hello </div>;
//// };

//// function SFC2(prop: { x: boolean }) {
////     return <h1>World </h1>;
//// }

//// /*1*/var /*2*/SFCComp = SFC1 || SFC2;
//// /*3*/</*4*/SFCComp x={ "hi" } />

verify.baselineFindAllReferences('1', '2', '3', '4');
