/// <reference path="fourslash.ts" />
// @module: es2015
// @verbatimModuleSyntax: true

// @Filename: /exports.ts
//// export interface SomeInterface {}
//// export class SomePig {}

// @Filename: /a.ts
//// import type { SomePig, SomeInterface } from "./exports.js";
//// new SomePig/**/

verify.completions({
  marker: "",
  includes: [{
    name: "SomePig",
    source: completion.CompletionSource.TypeOnlyAlias,
    hasAction: true,
  }]
});

verify.applyCodeActionFromCompletion("", {
  name: "SomePig",
  source: completion.CompletionSource.TypeOnlyAlias,
  description: `Remove 'type' from import declaration from "./exports.js"`,
  newFileContent:
`import { SomePig, type SomeInterface } from "./exports.js";
new SomePig`,
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});
