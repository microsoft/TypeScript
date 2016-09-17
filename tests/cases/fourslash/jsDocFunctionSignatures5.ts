///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js

/////**
//// * Filters a path based on a regexp or glob pattern.
//// * @param {String} basePath The base path where the search will be performed.
//// * @param {String} pattern A string defining a regexp of a glob pattern.
//// * @param {String} type The search pattern type, can be a regexp or a glob.
//// * @param {Object} options A object containing options to the search.
//// * @return {Array} A list containing the filtered paths.
//// */
////function pathFilter(basePath, pattern, type, options){
//////...
////}
////pathFilter(/**/'foo', 'bar', 'baz', {});
goTo.marker();
verify.currentSignatureHelpDocCommentIs("Filters a path based on a regexp or glob pattern.");
