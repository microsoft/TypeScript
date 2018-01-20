/// <reference path='fourslash.ts' />

// Test that we leave it alone if the name is a keyword.

// @allowJs: true

// @Filename: /a.js
/////*a*/exports/*b*/.default = 0;
////exports.default;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `const _default = 0;
export { _default as default };
_default;`,
});
