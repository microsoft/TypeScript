/// <reference path="fourslash.ts" />


// @Filename: /a.ts
////export function Test1() {}
////export function Test2() {}

// @Filename: /b.ts
////import { Test2 } from "./a";
////t/**/

verify.completions({
    marker: "",
    includes: [
        { name: "Test1", source: "/a", sourceDisplay: "./a", text: "function Test1(): void", kind: "function", hasAction: true },
        { name: "Test2", text: "(alias) function Test2(): void\nimport Test2", kind: "alias" },
    ],
    excludes: [{ name: "Test2", source: "/a" }],
    preferences: { includeCompletionsForModuleExports: true },
});

verify.applyCodeActionFromCompletion("", {
    name: "Test1",
    source: "/a",
    description: `Add 'Test1' to existing import declaration from "./a"`,
    newFileContent: `import { Test2, Test1 } from "./a";
t`,
});
