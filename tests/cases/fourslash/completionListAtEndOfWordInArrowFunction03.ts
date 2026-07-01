/// <reference path='fourslash.ts' />

////(d, defaultIsAnInvalidParameterName) => default/*1*/

verify.completions({
    marker: "1",
    includes: [
        "defaultIsAnInvalidParameterName",
    ],
    excludes: [
        "default",
    ],
});
