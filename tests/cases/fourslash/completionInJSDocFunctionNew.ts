
///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (new: string, string): string} */
////var f = function () { return new/**/; }

goTo.marker();
verify.completionListCount(114);
// "new" included as a keyword, not as a parameter
verify.completionListContains("new", "new", "", "keyword");
