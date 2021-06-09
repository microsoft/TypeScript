/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////export function Test1() {}
////export function Test2() {}

// @Filename: /b.ts
////import { Test2 } from "./a";
////t/**/

verify.completions({
    marker: "",
    exact: [
        {
            name: "Test2",
            text: "(alias) function Test2(): void\nimport Test2",
            kind: "alias",
            kindModifiers: "export"
        },
        completion.globalThisEntry,
        completion.undefinedVarEntry,
        {
            name: "Test1",
            source: "/a",
            sourceDisplay: "./a",
            text: "function Test1(): void",
            kind: "function",
            kindModifiers: "export",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        ...completion.statementKeywordsWithTypes,
    ],
    preferences: { includeCompletionsForModuleExports: true },
});

verify.applyCodeActionFromCompletion("", {
    name: "Test1",
    source: "/a",
    description: `Add 'Test1' to existing import declaration from "./a"`,
    newFileContent: `import { Test1, Test2 } from "./a";
t`,
});
