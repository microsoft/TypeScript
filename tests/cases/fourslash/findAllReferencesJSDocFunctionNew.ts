///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function ([|new|]: string, string): string} */
////var f;

const [a0] = test.ranges();
// should be: verify.referenceGroups([a0], [{ definition: "new", ranges: [a0] }]);
verify.referenceGroups([a0], undefined);
