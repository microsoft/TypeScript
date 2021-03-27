/// <reference path="fourslash.ts" />

// @esModuleInterop: false

// @Filename: /mod.ts
//// const foo = 0;
//// export = foo;

// @Filename: /importExportEquals.ts
//// [|import f/**/|]

verify.completions({
  marker: "",
  exact: [{
    name: "foo",
    source: "./mod",
    insertText: `import foo$1 = require("./mod");`,
    isSnippet: true,
    replacementSpan: test.ranges()[0],
    sourceDisplay: "./mod",
  }],
  preferences: {
    includeCompletionsForImportStatements: true,
    includeInsertTextCompletions: true,
    includeCompletionsWithSnippetText: true,
  }
});
