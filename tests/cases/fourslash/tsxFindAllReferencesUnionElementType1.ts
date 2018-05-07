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

//// var [|{| "isWriteAccess": true, "isDefinition": true |}SFCComp|] = SFC1 || SFC2;
//// <[|SFCComp|] x={ "hi" } />

verify.singleReferenceGroup(`var SFCComp: ((prop: {
    x: number;
}) => JSX.Element) | ((prop: {
    x: boolean;
}) => JSX.Element)`);
