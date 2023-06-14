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
//// function /*pt1*/SFC1(prop: { x: number }) {
////     return <div>hello </div>;
//// };

//// function SFC2(prop: { x: boolean }) {
////     return <h1>World </h1>;
//// }

//// var /*def*/SFCComp = SFC1 || SFC2;
//// <[|SFC/*one*/Comp|] x />

verify.baselineGoToDefinition("one");
