/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export interface HasBar { bar: number }
////export function hasBar(x: unknown): x is HasBar { return x && typeof x.bar === "number" }
////export function foo() {}
////export type __String = string;

// @Filename: /b.ts
////import { __String, HasBar, hasBar } from "./a";
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
    newFileContent: `import { __String, foo, HasBar, hasBar } from "./a";
f;`,
});