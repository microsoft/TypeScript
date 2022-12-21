/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// /**/module.exports = {
//// 
//// }

goTo.marker();
verify.occurrencesAtPositionCount(1);