/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////exports.x = 0;
////exports.x;
////
////const y = 1;
////exports.y = y;
////exports.y;
////
////exports.z = 2;
////exports.f = function(z) {
////    exports.z; z;
////}

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`export const x = 0;
x;

const y = 1;
const _y = y;
export { _y as y };
_y;

const _z = 2;
export { _z as z };
export function f(z) {
    _z; z;
}`,
});
