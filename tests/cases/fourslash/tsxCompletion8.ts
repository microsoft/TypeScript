/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { ONE: string; TWO: number; }
////     }
//// }
//// var x = <div /*1*/ autoComplete /*2*/ />;


goTo.marker('1');
verify.completionListContains("ONE");
verify.not.completionListAllowsNewIdentifier();

goTo.marker('2');
verify.completionListContains("ONE");
verify.not.completionListAllowsNewIdentifier();
