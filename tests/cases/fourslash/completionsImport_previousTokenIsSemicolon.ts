/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function foo() {}

// @Filename: /b.ts
////import * as a from 'a';
/////**/

goTo.marker("");
verify.completionListContains({ name: "foo", source: "/a" }, "function foo(): void", "", "function", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeExternalModuleExports: true,
    sourceDisplay: "./a",
});
