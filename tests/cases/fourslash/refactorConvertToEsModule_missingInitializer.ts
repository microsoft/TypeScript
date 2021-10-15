/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////require("m");
////let x; x;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`import "m";
let x; x;`
});
