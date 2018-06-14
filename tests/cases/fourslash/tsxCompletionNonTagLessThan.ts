/// <reference path='fourslash.ts'/>

// @Filename: /a.tsx
////var x: Array<numb/*a*/;
////[].map<numb/*b*/;
////1 < Infini/*c*/;

verify.completions({ marker: "a", includes: "number", excludes: "SVGNumber" })
for (const marker of ["a", "b"]) {
    goTo.marker(marker);
    verify.completionListContains("number");
    verify.not.completionListContains("SVGNumber");
};

goTo.marker("c");
verify.completionListContains("Infinity");
