///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (this: string, string): string} */
////var f = function (s) { return this/**/; }

goTo.marker();
verify.completionListCount(119);
verify.completionListContains('this', undefined, undefined, undefined, undefined, undefined, { allowDuplicate: true }); // TODO: GH#20042
