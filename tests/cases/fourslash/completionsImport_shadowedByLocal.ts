/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////const foo = 1;
////fo/**/

verify.completions({
    marker: "",
    includes: "foo",
    excludes: { name: "foo", source: "/a" },
    preferences: { includeCompletionsForModuleExports: true },
})
