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
////    z;
////}

// TODO: GH#22492 Should be a able access `exports.z` inside `exports.f`

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`export const x = 0;
x;

const y = 1;
const _y = y;
export { _y as y };
_y;

export const z = 2;
export function f(z) {
    z;
}`,
});
