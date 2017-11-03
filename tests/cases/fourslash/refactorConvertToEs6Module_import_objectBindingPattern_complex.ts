/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const { x: { a, b } } = /*a*/require/*b*/("x");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `import x from "x";
const { x: { a, b } } = x;`,
});
