/// <reference path="fourslash.ts" />

// @Filename: globals.d.ts
//// declare var foot: string;

// @Filename: index.ts
//// class Service {
////   foot!: number;
////   serve() {
////     foot/**/
////   }
//// }


verify.completions({
  marker: "",
  exact: [
    "arguments",
    completion.globalThisEntry,
    ...completion.globalsVars,
    {
      name: "foot",
      insertText: undefined,
      kind: "var",
      kindModifiers: "declare",
      sortText: completion.SortText.GlobalsOrKeywords,
      text: "var foot: string"
    },
    "Service",
    completion.undefinedVarEntry,
    {
      name: "foot",
      insertText: "this.foot",
      kind: "property",
      sortText: completion.SortText.SuggestedClassMembers,
      source: completion.CompletionSource.ThisProperty,
      text: "(property) Service.foot: number"
    },
    {
      name: "serve",
      insertText: "this.serve",
      kind: "method",
      sortText: completion.SortText.SuggestedClassMembers,
      source: completion.CompletionSource.ThisProperty
    },
    ...completion.insideMethodKeywords
  ],
  preferences: {
    includeInsertTextCompletions: true
  }
});
