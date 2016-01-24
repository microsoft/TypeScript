/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare namespace JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { one; two; }
////     }
//// }
//// let bag = { x: 100, y: 200 };
//// <div {.../**/

goTo.marker();
verify.completionListContains("bag");