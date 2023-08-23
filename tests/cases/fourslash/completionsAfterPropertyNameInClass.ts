/// <reference path="fourslash.ts" />

// @allowJs: true
// @filename: /a.js
////class C1 {
////    async #fo/*a*/
////}
////class C2 {
////    async fo/*b*/
////}

verify.baselineCompletions({
    includeInsertTextCompletions: true,
});
