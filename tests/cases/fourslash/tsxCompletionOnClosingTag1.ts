﻿/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare namespace JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { ONE: string; TWO: number; }
////     }
//// }
//// var x1 = <div><//**/

verify.completions({ marker: "", exact: "div>" });
