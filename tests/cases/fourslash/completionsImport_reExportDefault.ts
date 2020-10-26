/// <reference path="fourslash.ts" />

// @module: esnext
// @moduleResolution: node

// @Filename: /a/b/impl.ts
////export default function foo() {}

// @Filename: /a/index.ts
////export { default as foo } from "./b/impl";

// @Filename: /use.ts
////fo/**/

verify.completions({
    marker: "",
    exact: [
        completion.globalThisEntry,
        ...completion.globalsVars,
        completion.undefinedVarEntry,
        {
            name: "foo",
            source: "/a/b/impl",
            sourceDisplay: "./a",
            text: "function foo(): void",
            kind: "function",
            kindModifiers: "export",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        {
            name: "foo",
            source: "/a/index",
            sourceDisplay: "./a",
            text: "(alias) function foo(): void\nexport foo",
            kind: "alias",
            kindModifiers: "export",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        ...completion.globalKeywords,
    ],
    preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a/b/impl",
    description: `Import 'foo' from module "./a"`,
    newFileContent: `import { foo } from "./a";

fo`,
});
