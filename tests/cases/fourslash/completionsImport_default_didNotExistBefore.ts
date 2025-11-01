/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.ts
////export default function foo() {}

// @Filename: /b.ts
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
    description: `Add import from "./a"`,
    newFileContent: `import foo from "./a";

f;`,
});
