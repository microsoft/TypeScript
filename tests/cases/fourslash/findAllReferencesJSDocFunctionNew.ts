///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function ([|{|"isWriteAccess": true, "isDefinition": true|}new|]: string, string): string} */
////var f;

const [a0] = test.ranges();
verify.singleReferenceGroup("(parameter) new: string", [a0]);
