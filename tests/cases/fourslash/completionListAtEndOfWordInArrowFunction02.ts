/// <reference path='fourslash.ts' />

////(d, defaultIsAnInvalidParameterName) => d/*1*/

verify.completions({
    marker: "1",
    // TODO: should not include 'default' keyword at an expression location
    includes: ["d", "defaultIsAnInvalidParameterName", "default"]
});
