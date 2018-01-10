/// <reference path='fourslash.ts' />

// TODO: Maybe we could transform this to `export function f() {}`.

// @allowJs: true

// @Filename: /a.js
////function f() {}
/////*a*/module/*b*/.exports = { f };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `function f() {}
export default { f };`,
});
