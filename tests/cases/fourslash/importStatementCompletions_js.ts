/// <reference path="fourslash.ts" />

// These options resemble the defaults for inferred projects with JS

// @allowJs: true
// @target: es2020
// @checkJs: true
// @module: commonjs
// @noEmit: true
// @allowSyntheticDefaultImports: true

// @Filename: /node_modules/react/index.d.ts
//// declare namespace React {
////    export class Component {}
//// }
//// export = React;

// @Filename: /test.js
//// [|import R/**/|]

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [{
    name: "React",
    source: "react",
    insertText: `import React$1 from "react";`,
    isSnippet: true,
    replacementSpan: test.ranges()[0],
    sourceDisplay: "react",
  }],
  preferences: {
    includeCompletionsForImportStatements: true,
    includeInsertTextCompletions: true,
    includeCompletionsWithSnippetText: true,
  }
});
