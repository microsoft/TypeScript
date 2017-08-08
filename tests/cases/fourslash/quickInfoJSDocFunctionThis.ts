
///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (this: string, string): string} */
////var f/**/ = function (s) { return s; }

goTo.marker();
verify.quickInfoIs('var f: (this: string, arg1: string) => string');
