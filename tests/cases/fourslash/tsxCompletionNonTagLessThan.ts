/// <reference path='fourslash.ts'/>

// @Filename: /a.tsx
////var x: Array<numb/*a*/;
////[].map<numb/*b*/;
////1 < Infini/*c*/;

verify.completions(
    { marker: ["a", "b"], includes: "number", excludes: "SVGNumber" },
    { marker: "c", includes: "Infinity" },
);
