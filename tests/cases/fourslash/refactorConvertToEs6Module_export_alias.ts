/// <reference path='fourslash.ts' />

// Test that we leave it alone if the name is a keyword.

// @allowJs: true

// @Filename: /a.js
////const exportsAlias = exports;
////exportsAlias.f = function() {};
/////*a*/module/*b*/.exports = exportsAlias;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `
export function f() { }
`,
});
