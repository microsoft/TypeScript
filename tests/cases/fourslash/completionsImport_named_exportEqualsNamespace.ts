/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.d.ts
////declare namespace N {
////    export const foo = 0;
////}
////export = N;

// @Filename: /b.ts
////f/**/;

verify.completions({
    marker: "",
    includes: {
        name: "foo",
        source: "/a",
        sourceDisplay: "./a",
        text: "const N.foo: 0",
        kind: "const",
        kindModifiers: "export,declare",
        hasAction: true,
        sortText: completion.SortText.AutoImportSuggestions
    },
    preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Add import from "./a"`,
    newFileContent: `import { foo } from "./a";

f;`,
});
