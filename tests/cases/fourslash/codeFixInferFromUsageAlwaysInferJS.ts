/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: false
// @Filename: important.js
////function coll(callback) {
////}
 verify.codeFix({
    description: "Infer parameter types from usage",
    index: 0,
    newFileContent:
`/**
 * @param {any} callback
 */
function coll(callback) {
}`,
});
