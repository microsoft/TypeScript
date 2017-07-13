
///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (new: string, string): string} */
////var f = function (s) { return /**/; }

goTo.marker();
verify.completionListCount(115);
verify.completionListContains('new', 'new', '', 'keyword');
