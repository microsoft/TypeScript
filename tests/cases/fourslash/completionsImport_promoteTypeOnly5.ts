/// <reference path="fourslash.ts" />
// @module: es2015

// @Filename: /exports.ts
//// export interface SomeInterface {}
//// export class SomePig {}

// @Filename: /a.ts
//// import { type SomePig as Babe } from "./exports.js";
//// new Babe/**/

verify.completions({
  marker: "",
  includes: [{
    name: "Babe",
    source: completion.CompletionSource.TypeOnlyAlias,
    hasAction: true,
  }]
});

verify.applyCodeActionFromCompletion("", {
  name: "Babe",
  source: completion.CompletionSource.TypeOnlyAlias,
  description: `Remove 'type' from import of 'Babe' from "./exports.js"`,
  newFileContent:
`import { SomePig as Babe } from "./exports.js";
new Babe`,
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});
