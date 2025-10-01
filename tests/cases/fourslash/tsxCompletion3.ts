/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare namespace JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { one; two; }
////     }
//// }
//// <div one={1} /**//>;

verify.completions({ marker: "", exact: "two" });
