/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js

////function f([|a|]) {
////    return a[0] + 1;
////}

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 2,
    newFileContent:
`/**
 * @param {number[]} a
 */
function f(a) {
    return a[0] + 1;
}`,
});
