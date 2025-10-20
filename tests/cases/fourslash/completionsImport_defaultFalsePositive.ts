/// <reference path="fourslash.ts" />

// @Filename: /node_modules/foo/index.ts
////export default function f(): void;

// @Filename: /node_modules/bar/concat.d.ts
////export const concat = 0;

// @Filename: /a.ts
////export {};
////conca/**/

goTo.file("/a.ts");

verify.completions({
    marker: "",
    includes: {
        name: "concat",
        source: "bar/concat",
        sourceDisplay: "bar/concat",
        text: "const concat: 0",
        kind: "const",
        kindModifiers: "export,declare",
        hasAction: true,
        sortText: completion.SortText.AutoImportSuggestions
    },
    preferences: { includeCompletionsForModuleExports: true },
});

verify.applyCodeActionFromCompletion("", {
    name: "concat",
    source: "bar/concat",
    description: `Add import from "bar/concat"`,
    newFileContent:
`import { concat } from "bar/concat";

export {};
conca`,
});
