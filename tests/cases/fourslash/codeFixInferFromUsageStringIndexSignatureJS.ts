/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true
// @Filename: important.js

////function f([|a|]) {
////    return a['hi'];
////}

verify.codeFix({
    index: 2,
    description: "Infer parameter types from usage",
    newFileContent:
`/**
 * @param {{ [x: string]: any; }} a
 */
function f(a) {
    return a['hi'];
}`,
});
