/// <reference path='fourslash.ts' />

// @allowJs: true

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

// TODO: GH#22492 Should be a able access `exports.z` inside `exports.f`

verify.codeFix({
    description: "Convert to ES6 module",
    // TODO: GH#22492
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
