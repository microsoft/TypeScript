/// <reference path='fourslash.ts' />

////(d, defaultIsAnInvalidParameterName) => d/*1*/

verify.completions({
    marker: "1",
    includes: [
        "d",
        "defaultIsAnInvalidParameterName",
    ],
    excludes: ["default"],
});
