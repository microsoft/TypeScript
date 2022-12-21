/// <reference path="fourslash.ts" />

// @Filename: /mod.ts
//// export const foo = 0;

// @Filename: /index0.ts
//// [|import f/**/|]

verify.completions({
  isNewIdentifierLocation: true,
  marker: "",
  exact: [{
    name: "foo",
    source: "./mod",
    insertText: `import { foo } from "./mod";`, // <-- no `$1` tab stop
    isSnippet: undefined, // <-- undefined
    replacementSpan: test.ranges()[0],
    sourceDisplay: "./mod",
  }, {
    name: "type",
    sortText: completion.SortText.GlobalsOrKeywords,
  }],
  preferences: {
    includeCompletionsForImportStatements: true,
    includeInsertTextCompletions: true,
    includeCompletionsWithSnippetText: false, // <-- false
  }
});
