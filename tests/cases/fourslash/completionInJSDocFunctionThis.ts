///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (this: string, string): string} */
////var f = function (s) { return this/**/; }

goTo.marker();
verify.completionListCount(118);
verify.completionListContains('this');

