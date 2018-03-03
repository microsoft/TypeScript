
///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (new: string, string): string} */
////var f = function () { return new/**/; }

goTo.marker();
verify.completionListContains('new');
