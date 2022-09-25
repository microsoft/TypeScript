/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export default function foo() {}
////export const x = 0;

// @Filename: /b.ts
////import { x } from "./a";
////f/**/;

verify.completions({
    marker: "",
    includes: {
        name: "foo",
        source: "/a",
        sourceDisplay: "./a",
        text: "function foo(): void",
        kind: "function",
        kindModifiers: "export",
        hasAction: true,
        sortText: completion.SortText.AutoImportSuggestions
    },
    preferences: { includeCompletionsForModuleExports: true },
});

verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Update import from "./a"`,
    newFileContent: `import foo, { x } from "./a";
f;`,
});
