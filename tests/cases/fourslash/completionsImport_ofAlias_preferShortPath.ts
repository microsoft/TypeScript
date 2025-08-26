/// <reference path="fourslash.ts" />

// Test that the completion is for the shortest path, even if that's a re-export.

// @moduleResolution: node10
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
            source: "/foo/lib/foo",
            sourceDisplay: "./foo",
            text: "const foo: 0",
            kind: "const",
            kindModifiers: "export",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
    ], { noLib: true }),
    preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/foo/lib/foo",
    description: `Add import from "./foo"`,
    newFileContent: `import { foo } from "./foo";

fo`,
});
