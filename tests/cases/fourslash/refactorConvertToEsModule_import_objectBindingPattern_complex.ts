/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const { x: { a, b } } = require("x");
////a; b;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`import x from "x";
const { x: { a, b } } = x;
a; b;`,
});
