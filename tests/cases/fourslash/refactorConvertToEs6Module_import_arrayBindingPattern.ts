/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const [x, y] = /*a*/require/*b*/("x");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent: `import _x from "x";
const [x, y] = _x;`,
});
