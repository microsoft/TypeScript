///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (new: string, string): string} */
////var f/**/;

goTo.marker();
verify.quickInfoIs('var f: new (arg1: string) => string');
