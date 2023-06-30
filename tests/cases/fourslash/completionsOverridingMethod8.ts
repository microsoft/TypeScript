/// <reference path="fourslash.ts" />

// @newline: LF

// @Filename: /types1.ts
//// export interface I { foo: string }

// @Filename: /types2.ts
//// import { I } from "./types1";
//// export interface Base { method(p: I): void }

// @Filename: /index.ts
//// import { Base } from "./types2";
//// export class C implements Base {
////   /**/
//// }

goTo.marker("");
verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  preferences: {
    includeCompletionsWithInsertText: true,
    includeCompletionsWithSnippetText: false,
    includeCompletionsWithClassMemberSnippets: true,
  },
  includes: [{
    name: "method",
    sortText: completion.SortText.LocationPriority,
    insertText: "method(p: I): void {\n}",
    hasAction: true,
    source: completion.CompletionSource.ClassMemberSnippet,
    filterText: "method",
  }],
});

verify.applyCodeActionFromCompletion("", {
  preferences: {
    includeCompletionsWithInsertText: true,
    includeCompletionsWithSnippetText: false,
    includeCompletionsWithClassMemberSnippets: true,
  },
  name: "method",
  source: completion.CompletionSource.ClassMemberSnippet,
  description: "Includes imports of types referenced by 'method'",
  newFileContent:
`import { I } from "./types1";
import { Base } from "./types2";
export class C implements Base {
  
}`
});
