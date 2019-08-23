/// <reference path="fourslash.ts" />

// Tests that we use the name "foo".

// @module: esnext

// @Filename: /a.ts
////const foo = 0;
////export default foo;

// @Filename: /b.ts
////f/**/;

goTo.marker("");
verify.completions({
    marker: "",
    includes: {
        name: "foo",
        source: "/a",
        sourceDisplay: "./a",
        text: "(alias) const foo: 0\nexport default foo",
        kind: "alias",
        hasAction: true,
        sortText: completion.SortText.AutoImportSuggestions
    },
    preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import default 'foo' from module "./a"`,
    newFileContent: `import foo from "./a";

f;`,
});
