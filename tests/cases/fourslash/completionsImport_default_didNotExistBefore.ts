/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.ts
////export default function foo() {}

// @Filename: /b.ts
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
