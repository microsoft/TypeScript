/// <reference path="fourslash.ts" />
// @module: node18
// @allowImportingTsExtensions: true

// @Filename: /exports.ts
//// export interface SomeInterface {}
//// export class SomePig {}

// @Filename: /a.ts
//// import type { SomePig } from "./exports.ts";
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
  description: `Remove 'type' from import declaration from "./exports.ts"`,
  newFileContent:
`import { SomePig } from "./exports.ts";
new SomePig`,
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    includeInsertTextCompletions: true,
  },
});
