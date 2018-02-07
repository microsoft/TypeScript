/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////*a*/exports/*b*/.f = function g() { g(); }
////exports.h = function h() { h(); }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent:
`export const f = function g() { g(); };
export function h() { h(); }`
});
