/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.js
////import * as s from "something";
////fo/*b*/

verify.completions({
    marker: "b",
    includes: {
        name: "foo",
        source: "/a",
        sourceDisplay: "./a",
        text: "const foo: 0",
        kind: "const",
        kindModifiers: "export",
        hasAction: true,
        sortText: completion.SortText.AutoImportSuggestions
    },
    preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("b", {
    name: "foo",
    source: "/a",
    description: `Add import from "./a"`,
    newFileContent:
`import * as s from "something";
import { foo } from "./a";
fo`,
});
