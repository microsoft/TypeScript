/// <reference path='fourslash.ts' />

////(d, defaultIsAnInvalidParameterName) => default/*1*/

verify.completions({
    marker: "1",
    includes: [
        "defaultIsAnInvalidParameterName",
        // This should probably stop working in the future.
        { name: "default", text: "default", kind: "keyword" },
    ],
});
