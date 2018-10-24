/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////const _break = 0;
////export { _break as break };

// @Filename: /b.ts
////br/**/

verify.completions({
    marker: "",
    excludes: { name: "break", source: "/a" },
    preferences: { includeCompletionsForModuleExports: true },
});
