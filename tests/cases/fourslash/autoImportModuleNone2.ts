/// <reference path="fourslash.ts" />

// @module: none
// @moduleResolution: node10
// @target: es2015

// @Filename: /node_modules/dep/index.d.ts
////export const x: number;

// @Filename: /index.ts
//// x/**/

verify.completions({
  marker: "",
  includes: [{
    name: "x",
    source: "dep",
    sourceDisplay: "dep",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  },
});

edit.replaceLine(0, "import { x } from 'dep'; x;");
verify.getSemanticDiagnostics([]);
