///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function ([|[|{|"isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0|}new|]: string|], string): string} */
////var f;

const [a0Def, a0] = test.ranges();
verify.singleReferenceGroup("(parameter) new: string", [a0]);
