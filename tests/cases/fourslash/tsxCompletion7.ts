/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { ONE: string; TWO: number; }
////     }
//// }
//// let y = { ONE: '' };
//// var x = <div {...y} /**/ />;

goTo.marker();

verify.completionListContains("ONE");
verify.completionListContains("TWO");
verify.not.completionListAllowsNewIdentifier();
