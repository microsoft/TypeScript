/// <reference path="fourslash.ts" />

// These options resemble the defaults for inferred projects with JS,
// except notably lacking --allowSyntheticDefaultImports. Probably nobody
// ever wants a configuration like this, but we maintain that this is
// correct and consistent behavior for these settings.

// @allowJs: true
// @target: es2020
// @checkJs: true
// @module: commonjs
// @noEmit: true

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
    insertText: `import * as React from "react";`,
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
