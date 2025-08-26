/// <reference path="fourslash.ts" />

// @module: esnext
// @moduleResolution: node10

// @Filename: /a/b/impl.ts
////export default function foo() {}

// @Filename: /a/index.ts
////export { default as foo } from "./b/impl";

// @Filename: /use.ts
////fo/**/

verify.completions({
    marker: "",
    exact: completion.globalsPlus([
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
    ]),
    preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a/b/impl",
    description: `Add import from "./a"`,
    newFileContent: `import { foo } from "./a";

fo`,
});
