/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////exports.x = 0;
////exports.x;
////
////const y = 1;
/////*a*/exports/*b*/.y = y;
////exports.y;
////
////exports.z = 2;
////function f(z) {
////    exports.z;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `export const x = 0;
x;

const y = 1;
const _y = y;
export { _y as y };
_y;

const _z = 2;
export { _z as z };
function f(z) {
    _z;
}`,
});
