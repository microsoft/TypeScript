/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js

//// function f([|a, b, c, d, e = 0, ...d |]) {
//// }
//// f(1, "string", { a: 1 }, {shouldNotBeHere: 2}, {shouldNotBeHere: 2}, 3, "string");

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 3,
    newFileContent:
`/**
 * @param {number} a
 * @param {string} b
 * @param {{ a: number; }} c
 * @param {{ shouldNotBeHere: number; }} d
 * @param {(string | number)[]} d
 */
function f(a, b, c, d, e = 0, ...d ) {
}
f(1, "string", { a: 1 }, {shouldNotBeHere: 2}, {shouldNotBeHere: 2}, 3, "string");`,
});
