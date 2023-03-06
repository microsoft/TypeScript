/// <reference path="fourslash.ts" />
// @module: es2015

// @Filename: /exports.ts
//// export interface SomeInterface {}
//// export class SomePig {}

// @Filename: /a.ts
//// import type { SomeInterface, SomePig } from "./exports.js";
//// new SomePig/**/

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "SomePig",
    source: completion.CompletionSource.TypeOnlyAlias,
    hasAction: true,
  }]),
  preferences: { includeCompletionsForModuleExports: true },
});

verify.applyCodeActionFromCompletion("", {
  name: "SomePig",
  source: completion.CompletionSource.TypeOnlyAlias,
  description: `Remove 'type' from import declaration from "./exports.js"`,
  newFileContent:
`import { SomeInterface, SomePig } from "./exports.js";
new SomePig`,
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});
