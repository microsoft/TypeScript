
///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (new: string, string): string} */
////var f = function () { return new/**/; }

verify.completions({ marker: "", includes: { name: "new", sortText: completion.SortText.GlobalsOrKeywords } });
