/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const { x: { a, b } } = require("x");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`import x from "x";
const { x: { a, b } } = x;`,
});
