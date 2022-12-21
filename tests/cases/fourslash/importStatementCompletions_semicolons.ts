/// <reference path="fourslash.ts" />

// @Filename: /mod.ts
//// export const foo = 0;

// @Filename: /noSemicolons.ts
//// import * as fs from "fs"
//// [|import f/**/|]

verify.completions({
  isNewIdentifierLocation: true,
  marker: "",
  exact: [{
    name: "foo",
    source: "./mod",
    insertText: `import { foo$1 } from "./mod"`, // <-- no semicolon
    isSnippet: true,
    replacementSpan: test.ranges()[0],
    sourceDisplay: "./mod",
  }, {
    name: "type",
    sortText: completion.SortText.GlobalsOrKeywords,
  }],
  preferences: {
    includeCompletionsForImportStatements: true,
    includeInsertTextCompletions: true,
    includeCompletionsWithSnippetText: true,
  }
});
