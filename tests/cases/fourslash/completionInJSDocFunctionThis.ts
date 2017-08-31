///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (this: string, string): string} */
////var f = function (s) { return this/**/; }

goTo.marker();
verify.completionListCount(115);
// "this" included as a keyword, not as a parameter
verify.completionListContains("this", "this", "", "keyword");

