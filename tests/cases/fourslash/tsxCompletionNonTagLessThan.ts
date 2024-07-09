/// <reference path='fourslash.ts'/>

// @Filename: /a.tsx
////var x: Array<numb/*a*/;
////[].map<numb/*b*/;
////1 < Infini/*c*/;

verify.completions(
    {
    marker: ["a", "b"],
    includes: {
        name: "number",
        sortText: completion.SortText.GlobalsOrKeywords
    },
    excludes: "SVGNumber"
    },
    {
        marker: "c",
        includes: {
            name: "Infinity",
            sortText: completion.SortText.GlobalsOrKeywords
        }
    },
);
