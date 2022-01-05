/// <reference path="fourslash.ts" />

// @module: esnext
// @noLib: true

// @Filename: /global.d.ts
// A local variable would prevent import completions (see `completionsImport_shadowedByLocal.ts`), but a global doesn't.
////declare var foo: number;

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////export const foo = 1;

// @Filename: /c.ts
////fo/**/

goTo.marker("");
verify.completions({
    marker: "",
    exact: completion.globalsPlus([
        {
            name: "foo",
            text: "var foo: number",
            kind: "var",
            kindModifiers: "declare",
            sortText: completion.SortText.GlobalsOrKeywords
        },
        {
            name: "foo",
            source: "/a",
            sourceDisplay: "./a",
            text: "const foo: 0",
            kind: "const",
            kindModifiers: "export",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        {
            name: "foo",
            source: "/b",
            sourceDisplay: "./b",
            text: "const foo: 1",
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
    source: "/b",
    description: `Import 'foo' from module "./b"`,
    newFileContent: `import { foo } from "./b";

fo`,
});
