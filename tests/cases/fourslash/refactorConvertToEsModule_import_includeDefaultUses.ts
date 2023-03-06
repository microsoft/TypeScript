/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const x = /*a*/require/*b*/("x");
////x();
////x.y;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`import x, { y } from "x";
x();
y;`,
});
