///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: dummy.js
/////**
//// * Find an item
//// * @template T
//// * @param {T[]} l
//// * @param {T} x
//// * @returns {?T}  The names of the found item(s).
//// */
////function find(l, x) {
////}
////find(''/**/);

goTo.marker();
verify.currentSignatureHelpIs("find<T>(l: T[], x: T): T")
// There currently isn't a way to display the return tag comment
