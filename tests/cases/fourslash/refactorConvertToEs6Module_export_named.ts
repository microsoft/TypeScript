/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////[|exports.f|] = function() {};
////exports.C = class {};
////exports.x = 0;
////exports.a1 = () => {};
////exports.a2 = () => 0;
////exports.a3 = x => { x; };
////exports.a4 = x => x;

const [r0, r1, r2] = test.ranges();
verify.getSuggestionDiagnostics([
    { message: "File is a CommonJS module; it may be converted to an ES6 module.", code: 80001, range: r0 },
]);

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`export function f() {}
export class C {}
export const x = 0;
export function a1() {}
export function a2() { return 0; }
export function a3(x) { x; }
export function a4(x) { return x; }`,
});
