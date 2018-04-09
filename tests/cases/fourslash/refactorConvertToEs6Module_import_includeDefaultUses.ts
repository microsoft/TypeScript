/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const x = /*a*/require/*b*/("x");
////x();
////x.y;

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`import x, { y } from "x";
x();
y;`,
});
