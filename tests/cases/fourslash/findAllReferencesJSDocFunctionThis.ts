///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////** @type {function (this: string, string): string} */
////var f = function (s) { return [|this|] + s; }

const [a0] = test.ranges();
// should be: verify.referenceGroups([a0, a1], [{ definition: "this", ranges: [a0] }]);

// but is currently
verify.referenceGroups([], undefined);
