///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (this: string, string): string} */
////var f = function (s) { return /**/; }

goTo.marker();
verify.completionListCount(115);
verify.completionListContains('this');
