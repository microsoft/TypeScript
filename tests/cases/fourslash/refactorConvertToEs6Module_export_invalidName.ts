/// <reference path='fourslash.ts' />

// Test that we leave it alone if the name is a keyword.

// @allowJs: true

// @Filename: /a.js
/////*a*/exports/*b*/.class = 0;
////exports.async = 1;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `const _class = 0;
export { _class as class };
export const async = 1;`,
});
