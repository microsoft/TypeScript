/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true
// @Filename: important.js


////function coll(callback /*, name1, name2, ... */) {
////    return callback(this);
////}

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 2,
    newFileContent:
`/**
 * @param {(arg0: any) => void} callback
 */
function coll(callback /*, name1, name2, ... */) {
    return callback(this);
}`,
});
