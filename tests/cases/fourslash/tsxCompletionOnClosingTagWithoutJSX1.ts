/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x1 = <div><//**/

verify.completions({ marker: "", exact: "div>" });
