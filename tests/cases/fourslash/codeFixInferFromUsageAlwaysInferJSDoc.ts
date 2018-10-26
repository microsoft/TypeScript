/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true
// @Filename: important.js


////function coll(callback) {
////}

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 2,
    newFileContent:
`/**
 * @param {any} callback
 */
function coll(callback) {
}`,
});
