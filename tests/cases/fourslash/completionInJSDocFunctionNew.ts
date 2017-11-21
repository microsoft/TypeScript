
///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (new: string, string): string} */
////var f = function () { return new/**/; }

goTo.marker();
verify.completionListCount(118);
verify.completionListContains('new', undefined, undefined, undefined, undefined, undefined, { allowDuplicate: true }); // TODO: GH#20042
