/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { ONE: string; TWO: number; }
////     }
//// }
//// var x = <div /*1*/ autoComplete /*2*/ />;

verify.completions({ at: ["1", "2"], are: ["ONE", "TWO"] });
