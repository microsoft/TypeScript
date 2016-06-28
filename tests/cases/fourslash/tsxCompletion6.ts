/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { ONE: string; TWO: number; }
////     }
//// }
//// var x = <div ONE='hello' /**/ />;

goTo.marker();

verify.completionListContains("TWO");
verify.not.completionListAllowsNewIdentifier();
