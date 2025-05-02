

/// <reference path="fourslash.ts" />

//// type E = {}
//// type F = string
//// const i= { e: {} };
//// interface I { e: E, f?: F }
//// const k: I = {
////     ["e"]: i
////     /**/
//// }

verify.completions({
    marker: "",
    includes: [{
      name: "f",
      sortText: completion.SortText.OptionalMember,
      hasAction: true,
      source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    }],
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
});
  
verify.applyCodeActionFromCompletion("", {
    name: "f",
    description: `Add missing comma for object member completion 'f'.`,
    source: completion.CompletionSource.ObjectLiteralMemberWithComma,
    newFileContent:
    `type E = {}
type F = string
const i= { e: {} };
interface I { e: E, f?: F }
const k: I = {
    ["e"]: i,
    
}`,
    preferences: {
      allowIncompleteCompletions: true,
      includeInsertTextCompletions: true,
    },
});
