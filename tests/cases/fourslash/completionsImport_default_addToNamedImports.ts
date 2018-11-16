/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export default function foo() {}
////export const x = 0;

// @Filename: /b.ts
////import { x } from "./a";
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
    description: `Add default import 'foo' to existing import declaration from "./a"`,
    newFileContent: `import foo, { x } from "./a";
f;`,
});
