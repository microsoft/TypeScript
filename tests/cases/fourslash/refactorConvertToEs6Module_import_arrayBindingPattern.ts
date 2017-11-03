/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const [x, y] = /*a*/require/*b*/("x");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `import _x from "x";
const [x, y] = _x;`,
});
