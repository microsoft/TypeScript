/// <reference path="fourslash.ts" />

// @esModuleInterop: false

// @Filename: /mod.ts
//// const foo = 0;
//// export = foo;

// @Filename: /importExportEquals.ts
//// [|import f/**/|]

verify.completions({
  isNewIdentifierLocation: true,
  marker: "",
  exact: [{
    name: "foo",
    source: "./mod",
    insertText: `import foo$1 = require("./mod");`,
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
