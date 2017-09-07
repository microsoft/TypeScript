///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function ([|{|"isWriteAccess": true, "isDefinition": true|}new|]: string, string): string} */
////var f;

verify.noReferences(test.ranges()[0]);
