/// <reference path="fourslash.ts" />
// @Filename: completionListClassThisJS.js
// @allowJs: true
/////** @typedef {number} CallbackContext */
////class Foo {
////    bar() {
////       this/**/
////    }
////    /** @param {function (this: CallbackContext): any} cb */
////    baz(cb) {
////    }
////}

verify.completions({ marker: "", isNewIdentifierLocation: false, includes: [{
    name: "this",
    // kind: "warning",
    kind: "keyword",
    sortText: completion.SortText.GlobalsOrKeywords,
    // sortText: completion.SortText.JavascriptIdentifiers,
}] });
