/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////const foo = 1;
////fo/**/

goTo.marker("");
const options = { includeExternalModuleExports: true, sourceDisplay: undefined };
verify.completionListContains("foo", "const foo: 1", "", "const", undefined, undefined, options);
verify.not.completionListContains({ name: "foo", source: "/a" }, undefined, undefined, undefined, undefined, undefined, options);
