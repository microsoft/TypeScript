/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////const foo = 1;
////fo/**/

goTo.marker("");
verify.completionListContains("foo", "const foo: 1", "", "const");
verify.not.completionListContains({ name: "foo", source: "/a" });
