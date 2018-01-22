/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////*a*/module/*b*/.exports = {
////    x: 0,
////    f: function() {},
////    g: () => {},
////    h() {},
////    C: class {},
////};

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `export const x = 0;
export function f() { }
export function g() { }
export function h() { }
export class C {
}`,
});
