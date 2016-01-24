/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
//// }
//// class MyComp { props: { ONE: string; TWO: number } }
//// var x = <MyComp /**//>;

goTo.marker();
verify.completionListContains('ONE');
verify.completionListContains('TWO');
