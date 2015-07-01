/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { one; two; }
////     }
//// }
//// <div one={1} /**//>;

goTo.marker();
verify.completionListContains('two');
verify.not.completionListContains('one');
