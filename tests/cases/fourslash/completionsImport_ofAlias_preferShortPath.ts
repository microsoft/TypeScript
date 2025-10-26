/// <reference path="fourslash.ts" />

// Test that the completion is for the shortest path, even if that's a re-export.

// @module: commonJs
// @noLib: true

// @Filename: /foo/index.ts
////export { foo } from "./lib/foo";

// @Filename: /foo/lib/foo.ts
////export const foo = 0;

// @Filename: /user.ts
////fo/**/

verify.completions({
    marker: "",
    exact: completion.globalsPlus([
        {
            name: "foo",
            source: "./foo",
            sourceDisplay: "./foo",
            text: "(alias) const foo: 0\nexport foo",
            kind: "alias",
            kindModifiers: "export",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
    ], { noLib: true }),
    preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "./foo",
    description: `Add import from "./foo"`,
    newFileContent: `import { foo } from "./foo";

fo`,
});
