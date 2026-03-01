/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: esnext
// @moduleResolution: bundler

// @Filename: /ts.d.ts
//// declare namespace ts {
////   interface SourceFile {
////       text: string;
////   }
////   function createSourceFile(): SourceFile;
//// }
//// export = ts;

// @Filename: /types.ts
//// export interface VFS {
////   getSourceFile(path: string): ts/**/
//// }

verify.completions({
  marker: "",
  includes: [{
    name: "ts",
    source: "./ts",
    sourceDisplay: "./ts",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  },
}).andApplyCodeAction({
    name: "ts",
    source: "./ts",
    description: `Add import from "./ts"`,
    newFileContent: `import type ts from "./ts";

export interface VFS {
  getSourceFile(path: string): ts
}`
});
