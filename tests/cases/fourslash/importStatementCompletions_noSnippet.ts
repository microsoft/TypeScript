/// <reference path="fourslash.ts" />

// @Filename: /mod.ts
//// export const foo = 0;

// @Filename: /index0.ts
//// [|import f/**/|]

verify.completions({
  marker: "",
  exact: [{
    name: "foo",
    source: "./mod",
    insertText: `import { foo } from "./mod";`, // <-- no `$1` tab stop
    isSnippet: undefined, // <-- undefined
    replacementSpan: test.ranges()[0],
    sourceDisplay: "./mod",
  }],
  preferences: {
    includeCompletionsForImportStatements: true,
    includeInsertTextCompletions: true,
    includeCompletionsWithSnippetText: false, // <-- false
  }
});
