/// <reference path="fourslash.ts" />

// @Filename: /mod.ts
//// export const foo = 0;

// @Filename: /single.ts
//// import * as fs from 'fs';
//// [|import f/**/|]

verify.completions({
  isNewIdentifierLocation: true,
  marker: "",
  exact: [{
    name: "foo",
    source: "./mod",
    insertText: `import { foo$1 } from './mod';`, // <-- single quotes
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
