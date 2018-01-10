/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////*a*/exports/*b*/.f = function() {}
////exports.C = class {}
////exports.x = 0;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `export function f() { }
export class C {
}
export const x = 0;`,
});
